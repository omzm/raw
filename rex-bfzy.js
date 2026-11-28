// Rex 模块：暴风资源（苹果CMS 采集源）
// 由 WeBox 源包（ddgksf2013）移植，接口为源站公开的 MacCMS API。
// 播放走 loadResource 双模式：在本模块详情页按集出全部线路；
// 在 TMDB 详情页按片名自动搜索匹配，同样出全部线路供选择播放。

var WidgetMetadata = {
  "id": "top.ddgksf2013.rex.bfzy",
  "title": "暴风资源",
  "version": "1.4.1",
  "requiredVersion": "0.0.1",
  "description": "暴风资源 纯播放源：在 TMDB 详情页按片名自动匹配出源，播放资源里可选线路。",
  "author": "ddgksf2013",
  "site": "https://ddgksf2013.top/webox/index.json",
  "modules": [
    {
      "id": "loadResource",
      "title": "暴风资源",
      "functionName": "loadResource",
      "type": "stream",
      "cacheDuration": 0,
      "params": []
    }
  ]
};

var BASE = "https://apibfzy.com/api.php/provide/vod";
var TITLE = "暴风资源";

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


function epStripDate(s) {
  return String(s || "").replace(/^\s*\d{4}[-./]\d{1,2}[-./]\d{1,2}\s*/, "").replace(/^\s*\d{8}\s*/, "").trim();
}
function epParseKey(name) {
  var s = epStripDate(name);
  var m = /第\s*(\d+)\s*期\s*([上下中])?/.exec(s) || /第\s*(\d+)\s*[集话話]\s*([上下中])?/.exec(s);
  return m ? { num: Number(m[1]), part: m[2] || "" } : null;
}
function epIsBare(name) {
  return /^第\s*\d+\s*(期|集|话|話)\s*[上下中]?$/.test(epStripDate(name));
}
var EP_JUNK = /纯享|加更|花絮|彩蛋|特辑|回顾|先导|预告|片花|解说/;
var EP_HARD_JUNK = /加更|花絮|彩蛋|特辑|回顾|先导|预告|解说/;
// 综艺对位：先按 TMDB 集名（第N期上/下）精确匹配，再按播出日期，再只数正片按序取，最后原始顺序兜底
function pickEpisode(episodes, epIdx, episodeName, airDate) {
  if (!episodes || !episodes.length) return null;
  var i, k;
  var want = epParseKey(episodeName);
  if (want) {
    for (i = 0; i < episodes.length; i++) { k = epParseKey(episodes[i].name); if (k && k.num === want.num && k.part === want.part && epIsBare(episodes[i].name)) return episodes[i]; }
    for (i = 0; i < episodes.length; i++) { k = epParseKey(episodes[i].name); if (k && k.num === want.num && k.part === want.part && !EP_HARD_JUNK.test(episodes[i].name)) return episodes[i]; }
    for (i = 0; i < episodes.length; i++) { k = epParseKey(episodes[i].name); if (k && k.num === want.num && k.part === want.part) return episodes[i]; }
  }
  var d = String(airDate || "").replace(/-/g, "");
  if (/^\d{8}$/.test(d)) {
    var dated = episodes.filter(function (x) { return String(x.name || "").indexOf(d) === 0; });
    if (want && want.part) { for (i = 0; i < dated.length; i++) { if (epStripDate(dated[i].name) === want.part) return dated[i]; } }
    var bareDated = dated.filter(function (x) { return epIsBare(x.name); });
    if (bareDated.length === 1) return bareDated[0];
    if (want) { for (i = 0; i < dated.length; i++) { k = epParseKey(dated[i].name); if (k && k.num === want.num && k.part === want.part && !EP_HARD_JUNK.test(dated[i].name)) return dated[i]; } }
  }
  var main = episodes.filter(function (x) {
    if (EP_JUNK.test(x.name)) return false;
    if (epIsBare(x.name)) return true;
    var sd = epStripDate(x.name);
    if (sd === "上" || sd === "下" || sd === "中") return true;
    return !!epParseKey(x.name);
  });
  if (!main.length) main = episodes.filter(function (x) { return /^\d{8}/.test(String(x.name || "")) && !EP_JUNK.test(x.name); });
  if (epIdx >= 0 && main.length > epIdx) return main[epIdx];
  return episodes[epIdx] || null;
}

function resourceForVod(v, epIdx, episodeName, airDate) {
  var lines = parseLines(v);
  var all = [];
  lines.forEach(function (l) {
    var e = pickEpisode(l.episodes, epIdx, episodeName, airDate);
    if (!e) return;
    all.push({
      name: TITLE,
      url: e.url,
      description: (v.vod_name || "") + " · " + e.name
    });
  });
  var direct = all.filter(function (s) { return /\.(m3u8|mp4)(\?|#|$)/i.test(s.url); });
  var picked = direct.length ? direct : all;
  if (picked.length > 1) picked.forEach(function (s, i) { s.name = TITLE + " · 线路" + (i + 1); });
  return picked;
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
  if (String(found.vod_play_url || "").trim()) return resourceForVod(found, epIdx, params.episodeName, params.airDate);
  var full = await apiGet({ ac: "detail", ids: String(found.vod_id) });
  var fv = full && full.list && full.list[0];
  if (!fv) return [];
  return resourceForVod(fv, epIdx, params.episodeName, params.airDate);
}
