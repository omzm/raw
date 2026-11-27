// PingMe 参数抓取（Surge 专用极简版）
// 命中 queryBalanceAndBonus 时，把签到需要的参数存入 $persistentStore，
// 键名 pingme_capture_v3，与 fmz200 的 PingMeSignin.js 约定一致；
// 存储结构与原抓包脚本相同：{ url, paramsRaw, headers }。
// Surge 配置示例：
// PingMe获取签到参数 = type=http-request,pattern=^https:\/\/api\.pingmeapp\.net\/app\/queryBalanceAndBonus,script-path=https://raw.githubusercontent.com/omzm/raw/main/PingMe-Capture-Surge.js,timeout=30

const url = $request.url || "";
const headers = $request.headers || {};

function parseRawQuery(u) {
  const query = (u.split("?")[1] || "").split("#")[0];
  const rawMap = {};
  query.split("&").forEach(function (pair) {
    if (!pair) return;
    const idx = pair.indexOf("=");
    if (idx < 0) return;
    rawMap[pair.slice(0, idx)] = pair.slice(idx + 1);
  });
  return rawMap;
}

if (url.includes("/app/queryBalanceAndBonus")) {
  const capture = { url: url, paramsRaw: parseRawQuery(url), headers: headers };
  $persistentStore.write(JSON.stringify(capture), "pingme_capture_v3");
  $notification.post("PingMe 获取成功✅", "", "参数已保存，可以禁用此抓包脚本了");
  console.log("PingMe capture saved: " + url);
}

$done({});
