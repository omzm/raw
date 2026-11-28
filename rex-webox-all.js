// Rex 模块：WeBox 多源合集
// 由 WeBox 源包（ddgksf2013.top/webox/index.json，9 个源）移植合并为单个文件。
// TMDB 详情页播放时，9 个源按片名并行匹配，线路汇总在播放资源里供选择。
var WidgetMetadata = {
  "id": "top.ddgksf2013.rex.weboxall",
  "title": "WeBox 多源合集",
  "version": "1.2.1",
  "requiredVersion": "0.0.1",
  "description": "WeBox 源包 6 个源（电影天堂/非凡/暴风/量子/欧乐/独播库）合并的纯播放源模块：在 TMDB 详情页按片名自动多源匹配，播放资源里汇总全部线路供选择。",
  "author": "ddgksf2013",
  "site": "https://ddgksf2013.top/webox/index.json",
  "modules": [
    {
      "id": "loadResource",
      "title": "WeBox 多源",
      "functionName": "loadResource",
      "type": "stream",
      "cacheDuration": 0,
      "params": []
    }
  ]
};

function makeMacCMS(cfg) {
var BASE = cfg.base;
var TITLE = cfg.title;

async function apiGet(extra) {
  var r = await Widget.http.request({ url: BASE, method: "GET", params: extra, timeout: 10 });
  return r.data;
}

function stripHtml(s) {
  return String(s || "")
    .replace(/<[^>]+>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, "\"")
    .trim();
}

function scoreOf(v) {
  var s = String(v.vod_score || "");
  return s && s !== "0.0" && s !== "0" ? s : undefined;
}

function toItem(v) {
  return {
    id: String(v.vod_id),
    type: "url",
    link: "vod:" + v.vod_id,
    title: v.vod_name || "",
    coverUrl: v.vod_pic || "",
    subtitle: v.vod_remarks || "",
    rating: scoreOf(v),
    releaseDate: v.vod_year || undefined,
    genreTitle: v.type_name || undefined
  };
}

async function loadList(params) {
  var page = Number(params.page) || 1;
  var q = { ac: "detail", pg: page };
  if (params.type) q.t = params.type;
  var data = await apiGet(q);
  if (!data || !Array.isArray(data.list)) throw new Error("电影天堂 接口返回异常");
  return data.list.map(toItem);
}

async function search(params) {
  var page = Number(params.page) || 1;
  var kw = String(params.keyword || "").trim();
  if (!kw) return [];
  var data = await apiGet({ ac: "detail", wd: kw, pg: page });
  if (!data || !Array.isArray(data.list)) return [];
  return data.list.map(toItem);
}

function parseLines(v) {
  var froms = String(v.vod_play_from || "").split("$$$");
  return String(v.vod_play_url || "").split("$$$").map(function (line, li) {
    var eps = String(line).split("#").map(function (ep, ei) {
      var i = ep.indexOf("$");
      return {
        name: i >= 0 ? ep.slice(0, i) : "第" + (ei + 1) + "集",
        url: i >= 0 ? ep.slice(i + 1) : ep
      };
    }).filter(function (e) { return !!e.url; });
    return { from: froms[li] || "线路" + (li + 1), episodes: eps };
  }).filter(function (l) { return l.episodes.length; });
}

async function loadDetail(link) {
  var m = /^vod:(\d+)$/.exec(String(link || ""));
  if (!m) throw new Error("无法识别的详情链接");
  var data = await apiGet({ ac: "detail", ids: m[1] });
  var v = data && data.list && data.list[0];
  if (!v) return [];
  var lines = parseLines(v);
  var main = null;
  lines.forEach(function (l) { if (!main || l.episodes.length > main.episodes.length) main = l; });
  var episodes = (main ? main.episodes : []).map(function (e, ei) {
    return {
      id: String(v.vod_id) + "-ep-" + ei,
      type: "url",
      title: e.name,
      episode: ei + 1,
      link: "vod:" + v.vod_id
    };
  });
  return {
    id: String(v.vod_id),
    type: "url",
    link: link,
    title: v.vod_name || "",
    coverUrl: v.vod_pic || "",
    subtitle: v.vod_remarks || "",
    description: stripHtml(v.vod_content || v.vod_blurb || ""),
    releaseDate: v.vod_year || undefined,
    rating: scoreOf(v),
    genreTitle: v.type_name || undefined,
    episodeItems: episodes
  };
}

// 某条影片在指定集数下的全部线路（优先只给可直链播放的 m3u8/mp4 线路）
function resourceForVod(v, epIdx) {
  var lines = parseLines(v);
  var all = [];
  lines.forEach(function (l) {
    var e = l.episodes[epIdx];
    if (!e) return;
    all.push({
      name: TITLE + " · " + l.from,
      url: e.url,
      description: (v.vod_name || "") + " · " + e.name + " · " + l.from
    });
  });
  var direct = all.filter(function (s) { return /\.(m3u8|mp4)(\?|#|$)/i.test(s.url); });
  return direct.length ? direct : all;
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

// TMDB 详情页模式：按片名在源站搜索，挑标题最贴合（季数对得上）的一条
async function findVod(name, season) {
  var data = await apiGet({ ac: "detail", wd: name, pg: 1 });
  var list = (data && data.list) || [];
  if (!list.length && baseTitle(name) !== name) {
    data = await apiGet({ ac: "detail", wd: baseTitle(name), pg: 1 });
    list = (data && data.list) || [];
  }
  var want = normTitle(name);
  var wantBase = normTitle(baseTitle(name));
  var effSeason = season > 0 ? season : seasonOf(name);
  var best = null;
  var bestScore = 0;
  list.forEach(function (v) {
    var sc = 0;
    if (normTitle(v.vod_name) === want && want) sc = 100;
    else if (wantBase && normTitle(baseTitle(v.vod_name)) === wantBase) sc = 80;
    if (!sc) return;
    var vs = seasonOf(v.vod_name);
    if (effSeason > 1) {
      if (vs !== effSeason) return;
      sc += 10;
    } else if (vs > 1) return;
    if (sc > bestScore) { bestScore = sc; best = v; }
  });
  return bestScore >= 40 ? best : null;
}

async function loadResource(params) {
  var epIdx = Number(params.episode) > 0 ? Number(params.episode) - 1 : -1;
  // 模式一：来自本模块自己的详情页（link/id 带 vod 编号）
  var vodId = "";
  var m = /vod:(\d+)/.exec(String(params.link || ""));
  if (m) vodId = m[1];
  if (!vodId) {
    var m2 = /^(\d+)(?:-|$)/.exec(String(params.id || ""));
    if (m2 && /vod:|-ep-/.test(String(params.link || "") + String(params.id || ""))) vodId = m2[1];
  }
  if (vodId) {
    if (epIdx < 0) {
      var m3 = /-ep-(\d+)$/.exec(String(params.id || ""));
      epIdx = m3 ? Number(m3[1]) : 0;
    }
    var data = await apiGet({ ac: "detail", ids: vodId });
    var v = data && data.list && data.list[0];
    if (!v) return [];
    return resourceForVod(v, epIdx);
  }
  // 模式二：TMDB 详情页（只有片名/季/集上下文，按片名搜索匹配）
  var name = String(params.seriesName || params.title || "").trim();
  if (!name) return [];
  if (epIdx < 0) epIdx = 0;
  var found = await findVod(name, Number(params.season) || 0);
  if (!found) return [];
  if (String(found.vod_play_url || "").trim()) return resourceForVod(found, epIdx);
  var full = await apiGet({ ac: "detail", ids: String(found.vod_id) });
  var fv = full && full.list && full.list[0];
  if (!fv) return [];
  return resourceForVod(fv, epIdx);
}
  return { loadList: loadList, search: search, loadDetail: loadDetail, loadResource: loadResource };
}

var oleImpl = (function () {
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

async function loadList(params) {
  var page = Number(params.page) || 1;
  var cat = params.cat || "1";
  var url = page <= 1
    ? BASE + "/index.php/vod/show/id/" + cat + ".html"
    : BASE + "/index.php/vod/show/id/" + cat + "/page/" + page + ".html";
  var $ = Widget.html.load(await fetchHtml(url));
  var items = parseCards($);
  if (!items.length && page <= 1) throw new Error("欧乐影院列表为空，站点可能已变更");
  return items;
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

async function loadDetail(link) {
  var url = String(link || "");
  if (!/olehdtv\.com/.test(url)) throw new Error("无法识别的详情链接");
  var $ = Widget.html.load(await fetchHtml(url));
  var thumb = $("a.vodlist_thumb").first();
  var title = thumb.attr("title") || $("title").text().split("_")[0].trim();
  var desc = $("li.desc").first().text().replace(/\s+/g, " ").replace(/.*?简介：/, "").replace(/详细\s*>?\s*$/, "").trim();
  var groups = parseGroups($);
  var main = null;
  groups.forEach(function (g) { if (!main || g.episodes.length > main.episodes.length) main = g; });
  var detailId = url.replace(/\D/g, "");
  var episodes = (main ? main.episodes : []).map(function (e, ei) {
    return {
      id: detailId + "-ep-" + ei,
      type: "url",
      title: e.name,
      episode: ei + 1,
      link: "play:" + absUrl(e.href)
    };
  });
  return {
    id: detailId,
    type: "url",
    link: url,
    title: title || "",
    coverUrl: thumb.attr("data-original") || "",
    description: desc,
    episodeItems: episodes
  };
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
  return { loadList: loadList, search: search, loadDetail: loadDetail, loadResource: loadResource };
})();

var dbkuImpl = (function () {
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

async function loadList(params) {
  var page = Number(params.page) || 1;
  var cat = params.cat || "1";
  var url = page <= 1
    ? BASE + "/vodtype/" + cat + ".html"
    : BASE + "/vodshow/" + cat + "--------" + page + "---.html";
  var $ = Widget.html.load(await fetchHtml(url));
  var items = parseCards($, "ul.myui-vodlist li");
  if (!items.length && page <= 1) throw new Error("独播库列表为空，站点可能已变更");
  return items;
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

async function loadDetail(link) {
  var url = String(link || "");
  var idm = /voddetail\/(\d+)\.html/.exec(url);
  if (!idm) throw new Error("无法识别的详情链接");
  var $ = Widget.html.load(await fetchHtml(url));
  var title = $(".myui-content__detail h1.title").text().trim() || $("title").text().split(" ")[0].trim();
  var poster = $(".myui-content__thumb .myui-vodlist__thumb img").attr("data-original")
    || $(".myui-content__thumb a").attr("data-original") || "";
  var metaDesc = $('meta[name="description"]').attr("content") || "";
  var desc = metaDesc.replace(/^.*?简介[:：]/, "").trim();
  if (desc === metaDesc) desc = "";
  var groups = parseGroups($);
  var main = null;
  groups.forEach(function (g) { if (!main || g.episodes.length > main.episodes.length) main = g; });
  var episodes = (main ? main.episodes : []).map(function (e, ei) {
    return {
      id: idm[1] + "-ep-" + ei,
      type: "url",
      title: e.name,
      episode: ei + 1,
      link: "play:" + absUrl(e.href)
    };
  });
  return {
    id: idm[1],
    type: "url",
    link: url,
    title: title,
    coverUrl: poster,
    description: desc,
    episodeItems: episodes
  };
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
  return { loadList: loadList, search: search, loadDetail: loadDetail, loadResource: loadResource };
})();

var ORDER = ["dytt", "ffzy", "bfzy", "lzi", "ole", "dbku"];
var IMPLS = {
  dytt: makeMacCMS({ title: "电影天堂", base: "https://caiji.dyttzyapi.com/api.php/provide/vod" }),
  ffzy: makeMacCMS({ title: "非凡资源", base: "https://cj.ffzyapi.com/api.php/provide/vod/from/ffm3u8" }),
  bfzy: makeMacCMS({ title: "暴风资源", base: "https://apibfzy.com/api.php/provide/vod" }),
  lzi: makeMacCMS({ title: "量子资源", base: "https://cj.lziapi.com/api.php/provide/vod" }),
  ole: oleImpl, dbku: dbkuImpl
};

async function safeAsync(fn) { try { return await fn(); } catch (e) { return []; } }

function tmdbArgs(slug, params) {
  var a = { seriesName: params.seriesName, title: params.title, season: params.season, episode: params.episode, type: params.type };
  return a;
}

// TMDB 详情页播放：6 个源按片名并行匹配，汇总全部线路；单个源失败不影响其他源。
async function loadResource(params) {
  var name = String(params.seriesName || params.title || "").trim();
  if (!name) return [];
  var parts = await Promise.all(ORDER.map(function (slug) {
    return safeAsync(function () { return IMPLS[slug].loadResource(tmdbArgs(slug, params)); });
  }));
  var out = [];
  parts.forEach(function (p) { out = out.concat(p || []); });
  return out;
}
