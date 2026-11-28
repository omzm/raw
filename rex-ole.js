// Rex 模块：欧乐影院
// 由 WeBox 源包（ddgksf2013）的 iPlayr 规则移植，解析 olehdtv.com 的公开页面。
// 播放走 loadResource：按集汇总全部线路，在详情页「播放资源」里切换。

var WidgetMetadata = {
  "id": "top.ddgksf2013.rex.ole",
  "title": "欧乐影院",
  "version": "1.3.1",
  "requiredVersion": "0.0.1",
  "description": "欧乐影院 纯播放源：在 TMDB 详情页按片名自动匹配出源，播放资源里可选线路。",
  "author": "ddgksf2013",
  "site": "https://ddgksf2013.top/webox/index.json",
  "modules": [
    {
      "id": "loadResource",
      "title": "欧乐影院",
      "functionName": "loadResource",
      "type": "stream",
      "cacheDuration": 0,
      "params": []
    }
  ]
};

var BASE = "https://www.olehdtv.com";
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

function parseCards($) {
  var items = [];
  $("ul.vodlist li").each(function (i, li) {
    var $li = $(li);
    var a = $li.find("a.vodlist_thumb").first();
    var href = a.attr("href") || "";
    var title = a.attr("title") || $li.find(".vodlist_title a").text().trim();
    if (!href || !title) return;
    var idm = /id\/(\d+)\.html/.exec(href);
    var score = $li.find("span.text_right").first().text().trim();
    var dates = $li.find(".voddate");
    var remark = dates.length ? dates.eq(dates.length - 1).text().trim() : "";
    items.push({
      id: idm ? idm[1] : href,
      type: "url",
      link: absUrl(href),
      title: title,
      coverUrl: a.attr("data-original") || "",
      subtitle: remark,
      rating: /^\d+(\.\d+)?$/.test(score) ? score : undefined
    });
  });
  return items;
}

function parseGroups($) {
  var names = [];
  $(".play_source_tab a").each(function (i, a) {
    var nm = ($(a).attr("alt") || $(a).text()).replace(/[\uE000-\uF8FF]/g, "").replace(/\s+/g, " ").trim();
    if (nm) names.push(nm);
  });
  var groups = [];
  var seenAll = {};
  $(".play_list_box ul.content_playlist").each(function (gi, ul) {
    var eps = [];
    var seen = {};
    $(ul).find("li a").each(function (ei, a) {
      var href = $(a).attr("href") || "";
      if (!href || seen[href] || seenAll[href]) return;
      seen[href] = 1;
      seenAll[href] = 1;
      eps.push({ name: $(a).text().replace(/\s+/g, " ").trim() || "第" + (ei + 1) + "集", href: href });
    });
    if (eps.length) groups.push({ name: names[groups.length] || "线路" + (groups.length + 1), episodes: eps });
  });
  return groups;
}

async function resolvePlay(playUrl) {
  var html = await fetchHtml(playUrl);
  var m = /"url":"(https?:[^"]+)"/.exec(html);
  if (!m) throw new Error("未能从播放页解析出地址");
  return m[1].replace(/\\\//g, "/");
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
  var title = $("a.vodlist_thumb").first().attr("title") || "";
  var groups = parseGroups($);
  var resolved = await Promise.all(groups.map(async function (g, gi) {
    var ep = g.episodes[epIdx];
    if (!ep) return null;
    try {
      var playUrl = absUrl(ep.href);
      var media = await resolvePlay(playUrl);
      return {
        name: "欧乐影院 · " + g.name,
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
    return [{ name: "欧乐影院", url: fallback }];
  }
  return out;
}

async function search(params) {
  var page = Number(params.page) || 1;
  var kw = String(params.keyword || "").trim();
  if (!kw) return [];
  var enc = encodeURIComponent(kw);
  var url = page <= 1
    ? BASE + "/index.php/vod/search.html?wd=" + enc + "&submit="
    : BASE + "/index.php/vod/search/page/" + page + "/wd/" + enc + ".html";
  var $ = Widget.html.load(await fetchHtml(url));
  return parseCards($);
}

// 解析详情页的播放线路：[{ name, episodes: [{ name, href }] }]，已按播放地址去重。
async function loadResource(params) {
  var epIdx = Number(params.episode) > 0 ? Number(params.episode) - 1 : -1;
  var link = String(params.link || "");
  // 模式一：来自本模块自己的详情页
  if (link.startsWith("play:")) {
    var tapped = link.slice(5);
    var idm = /play(?:_vip)?\/id\/(\d+)\/sid\/\d+\/nid\/(\d+)\.html/.exec(tapped);
    if (!idm) {
      var single = await resolvePlay(tapped);
      return [{ name: "欧乐影院", url: single }];
    }
    if (epIdx < 0) epIdx = Number(idm[2]) > 0 ? Number(idm[2]) - 1 : 0;
    return sourcesFromDetail(BASE + "/index.php/vod/detail/id/" + idm[1] + ".html", epIdx, tapped);
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
