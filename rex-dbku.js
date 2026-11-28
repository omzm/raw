// Rex 模块：独播库
// 由 WeBox 源包（ddgksf2013）的 iPlayr 规则移植，解析 dbku.tv 的公开页面。
// 播放走 loadResource：按集汇总全部线路，在详情页「播放资源」里切换。

var WidgetMetadata = {
  "id": "top.ddgksf2013.rex.dbku",
  "title": "独播库",
  "version": "1.3.1",
  "requiredVersion": "0.0.1",
  "description": "独播库 纯播放源：在 TMDB 详情页按片名自动匹配出源，播放资源里可选线路。",
  "author": "ddgksf2013",
  "site": "https://ddgksf2013.top/webox/index.json",
  "modules": [
    {
      "id": "loadResource",
      "title": "独播库",
      "functionName": "loadResource",
      "type": "stream",
      "cacheDuration": 0,
      "params": []
    }
  ]
};

var BASE = "https://www.dbku.tv";
var UA = "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1";

function absUrl(href) {
  href = String(href || "");
  if (!href) return "";
  if (/^https?:\/\//i.test(href)) return href;
  if (href.startsWith("//")) return "https:" + href;
  return BASE + (href.startsWith("/") ? href : "/" + href);
}

async function fetchHtml(url) {
  var r = await Widget.http.request({ url: url, method: "GET", headers: { "User-Agent": UA, Referer: BASE + "/" }, timeout: 10 });
  return String(r.data || "");
}

function b64decodeToString(b64) {
  var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
  var clean = String(b64).replace(/[^A-Za-z0-9+/=]/g, "");
  var bytes = [];
  for (var i = 0; i < clean.length; i += 4) {
    var a = chars.indexOf(clean[i]);
    var b = chars.indexOf(clean[i + 1]);
    var c = clean[i + 2] === "=" ? 0 : chars.indexOf(clean[i + 2]);
    var d = clean[i + 3] === "=" ? 0 : chars.indexOf(clean[i + 3]);
    var n = (a << 18) | (b << 12) | (c << 6) | d;
    bytes.push((n >> 16) & 255);
    if (clean[i + 2] !== "=") bytes.push((n >> 8) & 255);
    if (clean[i + 3] !== "=") bytes.push(n & 255);
  }
  var esc = "";
  bytes.forEach(function (x) { esc += "%" + ("0" + x.toString(16)).slice(-2); });
  try { return decodeURIComponent(esc); } catch (e) {
    return bytes.map(function (x) { return String.fromCharCode(x); }).join("");
  }
}

function parseCards($, listSel) {
  var items = [];
  $(listSel).each(function (i, li) {
    var $li = $(li);
    var a = $li.find("a.myui-vodlist__thumb").first();
    var href = a.attr("href") || $li.find("h4 a").attr("href") || "";
    var title = a.attr("title") || $li.find("h4 a").text().trim();
    if (!href || !title) return;
    var idm = /voddetail\/(\d+)\.html/.exec(href);
    var tag = $li.find("span.tag").first().text().trim();
    var ratingM = /^(\d+(\.\d+)?)/.exec(tag);
    items.push({
      id: idm ? idm[1] : href,
      type: "url",
      link: absUrl(href),
      title: title,
      coverUrl: a.attr("data-original") || "",
      subtitle: $li.find(".pic-text").first().text().trim(),
      rating: ratingM ? ratingM[1] : undefined
    });
  });
  return items;
}

function parseGroups($) {
  var tabNames = [];
  $('a[data-toggle="tab"]').each(function (i, a) { tabNames.push($(a).text().replace(/\s+/g, " ").trim()); });
  var uls = $(".tab-pane ul.myui-content__list");
  if (!uls.length) uls = $("ul.myui-content__list");
  var groups = [];
  uls.each(function (gi, ul) {
    var eps = [];
    var seen = {};
    $(ul).find("li a").each(function (ei, a) {
      var href = $(a).attr("href") || "";
      if (!/\/vodplay\//.test(href) || seen[href]) return;
      seen[href] = 1;
      eps.push({ name: $(a).text().replace(/\s+/g, " ").trim() || "第" + (ei + 1) + "集", href: href });
    });
    if (eps.length) groups.push({ name: tabNames[groups.length] || "线路" + (groups.length + 1), episodes: eps });
  });
  return groups;
}

async function resolvePlay(playUrl) {
  var html = await fetchHtml(playUrl);
  var seg = html.slice(html.indexOf("player_data"));
  var m = /"url":"([^"]+)"/.exec(seg);
  if (!m) throw new Error("未能从播放页解析出地址");
  var raw = m[1];
  if (/^https?:\/\//i.test(raw)) return raw.replace(/\\\//g, "/");
  var decoded = b64decodeToString(raw);
  try { decoded = decodeURIComponent(decoded); } catch (e) { /* 已解码 */ }
  if (!/^https?:\/\//i.test(decoded)) throw new Error("播放地址解码失败");
  return decoded;
}

function normTitle(s) {
  return String(s || "").replace(/[\s·•:：\-—_【】\[\]《》()（）!！?？.。,，]/g, "").toLowerCase();
}

function baseTitle(s) {
  return String(s || "").replace(/第[一二三四五六七八九十两\d]+季/g, "").replace(/season\s*\d+/gi, "").trim();
}

var CN_NUM = { "一": 1, "二": 2, "两": 2, "三": 3, "四": 4, "五": 5, "六": 6, "七": 7, "八": 8, "九": 9, "十": 10 };

function seasonOf(s) {
  var m = /第([一二三四五六七八九十两\d]+)季/.exec(String(s || ""));
  if (!m) return 0;
  if (/^\d+$/.test(m[1])) return Number(m[1]);
  if (m[1].length === 2 && m[1][0] === "十") return 10 + (CN_NUM[m[1][1]] || 0);
  return CN_NUM[m[1]] || 0;
}

// TMDB 详情页模式：从搜索结果卡片里挑标题最贴合（季数对得上）的一条
function pickBestCard(items, name, season) {
  var want = normTitle(name);
  var wantBase = normTitle(baseTitle(name));
  var effSeason = season > 0 ? season : seasonOf(name);
  var best = null;
  var bestScore = 0;
  (items || []).forEach(function (it) {
    var sc = 0;
    if (normTitle(it.title) === want && want) sc = 100;
    else if (wantBase && normTitle(baseTitle(it.title)) === wantBase) sc = 80;
    if (!sc) return;
    var vs = seasonOf(it.title);
    if (effSeason > 1) {
      if (vs !== effSeason) return;
      sc += 10;
    } else if (vs > 1) return;
    if (sc > bestScore) { bestScore = sc; best = it; }
  });
  return bestScore >= 40 ? best : null;
}

// 拉详情页，按集汇总全部线路并逐条解析出真实地址（点中的线路排第一）
async function sourcesFromDetail(detailUrl, epIdx, tapped) {
  var $ = Widget.html.load(await fetchHtml(detailUrl));
  var title = $(".myui-content__detail h1.title").text().trim();
  var groups = parseGroups($);
  var resolved = await Promise.all(groups.map(async function (g) {
    var ep = g.episodes[epIdx];
    if (!ep) return null;
    try {
      var playUrl = absUrl(ep.href);
      var media = await resolvePlay(playUrl);
      return {
        name: "独播库 · " + g.name,
        url: media,
        description: (title ? title + " · " : "") + ep.name + " · " + g.name,
        _tapped: tapped && playUrl === tapped ? 0 : 1
      };
    } catch (e) { return null; }
  }));
  var out = resolved.filter(function (x) { return !!x; })
    .sort(function (a, b) { return a._tapped - b._tapped; });
  out.forEach(function (x) { delete x._tapped; });
  if (!out.length && tapped) {
    var fallback = await resolvePlay(tapped);
    return [{ name: "独播库", url: fallback }];
  }
  return out;
}

async function search(params) {
  var kw = String(params.keyword || "").trim();
  if (!kw) return [];
  if ((Number(params.page) || 1) > 1) return [];
  var url = BASE + "/vodsearch/-------------.html?wd=" + encodeURIComponent(kw);
  var $ = Widget.html.load(await fetchHtml(url));
  return parseCards($, "ul.myui-vodlist__media li");
}

// 解析详情页的播放线路：[{ name, episodes: [{ name, href }] }]
async function loadResource(params) {
  var epIdx = Number(params.episode) > 0 ? Number(params.episode) - 1 : -1;
  var link = String(params.link || "");
  // 模式一：来自本模块自己的详情页
  if (link.startsWith("play:")) {
    var tapped = link.slice(5);
    var pm = /vodplay\/(\d+)-(\d+)-(\d+)\.html/.exec(tapped);
    if (!pm) {
      var single = await resolvePlay(tapped);
      return [{ name: "独播库", url: single }];
    }
    if (epIdx < 0) epIdx = Number(pm[3]) > 0 ? Number(pm[3]) - 1 : 0;
    return sourcesFromDetail(BASE + "/voddetail/" + pm[1] + ".html", epIdx, tapped);
  }
  // 模式二：TMDB 详情页（按片名搜索匹配）
  var name = String(params.seriesName || params.title || "").trim();
  if (!name) return [];
  if (epIdx < 0) epIdx = 0;
  var items = await search({ keyword: name, page: 1 });
  var best = pickBestCard(items, name, Number(params.season) || 0);
  if (!best) return [];
  return sourcesFromDetail(best.link, epIdx, "");
}
