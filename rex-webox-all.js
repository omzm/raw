// Rex 模块：WeBox 多源合集
// 由 WeBox 源包（ddgksf2013.top/webox/index.json，9 个源）移植合并为单个文件。
// TMDB 详情页播放时，9 个源按片名并行匹配，线路汇总在播放资源里供选择。
var WidgetMetadata = {
  "id": "top.ddgksf2013.rex.weboxall",
  "title": "WeBox 多源合集",
  "version": "1.0.0",
  "requiredVersion": "0.0.1",
  "description": "WeBox 源包 9 个源的 Rex 合集版（电影天堂/非凡/无水印/暴风/量子/欧乐/独播库/libvio/厂长）：一个文件导入，各源可单独浏览搜索；在 TMDB 详情页按片名自动多源匹配，播放资源里汇总全部线路供选择。",
  "author": "ddgksf2013",
  "site": "https://ddgksf2013.top/webox/index.json",
  "globalParams": [
    {
      "name": "libvio_site",
      "title": "libvio 站点地址",
      "type": "input",
      "placeholders": [
        {
          "title": "默认",
          "value": "https://www.libvio.lat"
        }
      ]
    },
    {
      "name": "cz_site",
      "title": "厂长站点地址（留空自动发现）",
      "type": "input",
      "placeholders": [
        {
          "title": "自动发现",
          "value": ""
        }
      ]
    }
  ],
  "modules": [
    {
      "id": "list-dytt",
      "title": "电影天堂 · 分类",
      "functionName": "loadListDytt",
      "params": [
        {
          "name": "type",
          "title": "分类",
          "type": "enumeration",
          "enumOptions": [
            {
              "title": "最新更新",
              "value": ""
            },
            {
              "title": "电影片",
              "value": "1"
            },
            {
              "title": "连续剧",
              "value": "2"
            },
            {
              "title": "综艺片",
              "value": "3"
            },
            {
              "title": "动漫片",
              "value": "4"
            },
            {
              "title": "动作片",
              "value": "6"
            },
            {
              "title": "喜剧片",
              "value": "7"
            },
            {
              "title": "爱情片",
              "value": "8"
            },
            {
              "title": "科幻片",
              "value": "9"
            },
            {
              "title": "恐怖片",
              "value": "10"
            },
            {
              "title": "剧情片",
              "value": "11"
            },
            {
              "title": "战争片",
              "value": "12"
            },
            {
              "title": "国产剧",
              "value": "13"
            },
            {
              "title": "香港剧",
              "value": "14"
            },
            {
              "title": "韩国剧",
              "value": "15"
            },
            {
              "title": "欧美剧",
              "value": "16"
            },
            {
              "title": "记录片",
              "value": "20"
            },
            {
              "title": "台湾剧",
              "value": "21"
            },
            {
              "title": "日本剧",
              "value": "22"
            },
            {
              "title": "海外剧",
              "value": "23"
            },
            {
              "title": "泰国剧",
              "value": "24"
            },
            {
              "title": "大陆综艺",
              "value": "25"
            },
            {
              "title": "港台综艺",
              "value": "26"
            },
            {
              "title": "日韩综艺",
              "value": "27"
            },
            {
              "title": "欧美综艺",
              "value": "28"
            },
            {
              "title": "国产动漫",
              "value": "29"
            },
            {
              "title": "日韩动漫",
              "value": "30"
            },
            {
              "title": "欧美动漫",
              "value": "31"
            },
            {
              "title": "港台动漫",
              "value": "32"
            },
            {
              "title": "海外动漫",
              "value": "33"
            },
            {
              "title": "伦理片",
              "value": "34"
            },
            {
              "title": "短剧",
              "value": "36"
            },
            {
              "title": "动画片",
              "value": "37"
            }
          ]
        },
        {
          "name": "page",
          "title": "页码",
          "type": "page"
        }
      ]
    },
    {
      "id": "list-ffzy",
      "title": "非凡资源 · 分类",
      "functionName": "loadListFfzy",
      "params": [
        {
          "name": "type",
          "title": "分类",
          "type": "enumeration",
          "enumOptions": [
            {
              "title": "最新更新",
              "value": ""
            },
            {
              "title": "电影片",
              "value": "1"
            },
            {
              "title": "连续剧",
              "value": "2"
            },
            {
              "title": "综艺片",
              "value": "3"
            },
            {
              "title": "动漫片",
              "value": "4"
            },
            {
              "title": "动作片",
              "value": "6"
            },
            {
              "title": "喜剧片",
              "value": "7"
            },
            {
              "title": "爱情片",
              "value": "8"
            },
            {
              "title": "科幻片",
              "value": "9"
            },
            {
              "title": "恐怖片",
              "value": "10"
            },
            {
              "title": "剧情片",
              "value": "11"
            },
            {
              "title": "战争片",
              "value": "12"
            },
            {
              "title": "国产剧",
              "value": "13"
            },
            {
              "title": "香港剧",
              "value": "14"
            },
            {
              "title": "韩国剧",
              "value": "15"
            },
            {
              "title": "欧美剧",
              "value": "16"
            },
            {
              "title": "记录片",
              "value": "20"
            },
            {
              "title": "台湾剧",
              "value": "21"
            },
            {
              "title": "日本剧",
              "value": "22"
            },
            {
              "title": "海外剧",
              "value": "23"
            },
            {
              "title": "泰国剧",
              "value": "24"
            },
            {
              "title": "大陆综艺",
              "value": "25"
            },
            {
              "title": "港台综艺",
              "value": "26"
            },
            {
              "title": "日韩综艺",
              "value": "27"
            },
            {
              "title": "欧美综艺",
              "value": "28"
            },
            {
              "title": "国产动漫",
              "value": "29"
            },
            {
              "title": "日韩动漫",
              "value": "30"
            },
            {
              "title": "欧美动漫",
              "value": "31"
            },
            {
              "title": "港台动漫",
              "value": "32"
            },
            {
              "title": "海外动漫",
              "value": "33"
            },
            {
              "title": "伦理片",
              "value": "34"
            },
            {
              "title": "短剧",
              "value": "36"
            }
          ]
        },
        {
          "name": "page",
          "title": "页码",
          "type": "page"
        }
      ]
    },
    {
      "id": "list-wsy",
      "title": "无水印资源 · 分类",
      "functionName": "loadListWsy",
      "params": [
        {
          "name": "type",
          "title": "分类",
          "type": "enumeration",
          "enumOptions": [
            {
              "title": "最新更新",
              "value": ""
            },
            {
              "title": "电影",
              "value": "1"
            },
            {
              "title": "电视剧",
              "value": "2"
            },
            {
              "title": "综艺",
              "value": "3"
            },
            {
              "title": "动漫",
              "value": "4"
            },
            {
              "title": "动作片",
              "value": "6"
            },
            {
              "title": "喜剧片",
              "value": "7"
            },
            {
              "title": "爱情片",
              "value": "8"
            },
            {
              "title": "科幻片",
              "value": "9"
            },
            {
              "title": "恐怖片",
              "value": "10"
            },
            {
              "title": "剧情片",
              "value": "11"
            },
            {
              "title": "战争片",
              "value": "12"
            },
            {
              "title": "国产剧",
              "value": "13"
            },
            {
              "title": "欧美剧",
              "value": "14"
            },
            {
              "title": "韩剧",
              "value": "15"
            },
            {
              "title": "日剧",
              "value": "16"
            },
            {
              "title": "港剧",
              "value": "17"
            },
            {
              "title": "台剧",
              "value": "18"
            },
            {
              "title": "泰剧",
              "value": "19"
            },
            {
              "title": "纪录片",
              "value": "20"
            },
            {
              "title": "海外剧",
              "value": "23"
            },
            {
              "title": "大陆综艺",
              "value": "25"
            },
            {
              "title": "日韩综艺",
              "value": "26"
            },
            {
              "title": "港台综艺",
              "value": "27"
            },
            {
              "title": "欧美综艺",
              "value": "28"
            },
            {
              "title": "国产动漫",
              "value": "29"
            },
            {
              "title": "日韩动漫",
              "value": "30"
            },
            {
              "title": "欧美动漫",
              "value": "31"
            },
            {
              "title": "动画片",
              "value": "39"
            },
            {
              "title": "港台动漫",
              "value": "44"
            },
            {
              "title": "海外动漫",
              "value": "45"
            },
            {
              "title": "演唱会",
              "value": "47"
            },
            {
              "title": "体育赛事",
              "value": "48"
            },
            {
              "title": "篮球",
              "value": "49"
            },
            {
              "title": "足球",
              "value": "50"
            },
            {
              "title": "预告片",
              "value": "51"
            },
            {
              "title": "斯诺克",
              "value": "52"
            },
            {
              "title": "影视解说",
              "value": "53"
            },
            {
              "title": "爽文短剧",
              "value": "54"
            },
            {
              "title": "伦理",
              "value": "55"
            },
            {
              "title": "港台三级",
              "value": "56"
            },
            {
              "title": "韩国伦理",
              "value": "57"
            },
            {
              "title": "西方伦理",
              "value": "58"
            },
            {
              "title": "日本伦理",
              "value": "59"
            },
            {
              "title": "两性课堂",
              "value": "60"
            },
            {
              "title": "写真热舞",
              "value": "61"
            },
            {
              "title": "4K电影",
              "value": "62"
            },
            {
              "title": "有声动漫",
              "value": "63"
            },
            {
              "title": "女频恋爱",
              "value": "64"
            },
            {
              "title": "反转爽剧",
              "value": "65"
            },
            {
              "title": "古装仙侠",
              "value": "66"
            },
            {
              "title": "年代穿越",
              "value": "67"
            },
            {
              "title": "脑洞悬疑",
              "value": "68"
            },
            {
              "title": "现代都市",
              "value": "69"
            },
            {
              "title": "邵氏电影",
              "value": "70"
            },
            {
              "title": "Netflix电影",
              "value": "71"
            },
            {
              "title": "Netflix自制剧",
              "value": "72"
            },
            {
              "title": "擦边短剧",
              "value": "73"
            },
            {
              "title": "预告解说",
              "value": "74"
            },
            {
              "title": "科普学习",
              "value": "75"
            },
            {
              "title": "漫剧",
              "value": "76"
            }
          ]
        },
        {
          "name": "page",
          "title": "页码",
          "type": "page"
        }
      ]
    },
    {
      "id": "list-bfzy",
      "title": "暴风资源 · 分类",
      "functionName": "loadListBfzy",
      "params": [
        {
          "name": "type",
          "title": "分类",
          "type": "enumeration",
          "enumOptions": [
            {
              "title": "最新更新",
              "value": ""
            },
            {
              "title": "电影片",
              "value": "20"
            },
            {
              "title": "动作片",
              "value": "21"
            },
            {
              "title": "喜剧片",
              "value": "22"
            },
            {
              "title": "恐怖片",
              "value": "23"
            },
            {
              "title": "科幻片",
              "value": "24"
            },
            {
              "title": "爱情片",
              "value": "25"
            },
            {
              "title": "剧情片",
              "value": "26"
            },
            {
              "title": "战争片",
              "value": "27"
            },
            {
              "title": "纪录片",
              "value": "28"
            },
            {
              "title": "理论片",
              "value": "29"
            },
            {
              "title": "连续剧",
              "value": "30"
            },
            {
              "title": "国产剧",
              "value": "31"
            },
            {
              "title": "欧美剧",
              "value": "32"
            },
            {
              "title": "香港剧",
              "value": "33"
            },
            {
              "title": "韩国剧",
              "value": "34"
            },
            {
              "title": "台湾剧",
              "value": "35"
            },
            {
              "title": "日本剧",
              "value": "36"
            },
            {
              "title": "海外剧",
              "value": "37"
            },
            {
              "title": "泰国剧",
              "value": "38"
            },
            {
              "title": "动漫片",
              "value": "39"
            },
            {
              "title": "国产动漫",
              "value": "40"
            },
            {
              "title": "日韩动漫",
              "value": "41"
            },
            {
              "title": "欧美动漫",
              "value": "42"
            },
            {
              "title": "港台动漫",
              "value": "43"
            },
            {
              "title": "海外动漫",
              "value": "44"
            },
            {
              "title": "综艺片",
              "value": "45"
            },
            {
              "title": "大陆综艺",
              "value": "46"
            },
            {
              "title": "港台综艺",
              "value": "47"
            },
            {
              "title": "日韩综艺",
              "value": "48"
            },
            {
              "title": "欧美综艺",
              "value": "49"
            },
            {
              "title": "动画片",
              "value": "50"
            },
            {
              "title": "电影解说",
              "value": "51"
            },
            {
              "title": "预告片",
              "value": "52"
            },
            {
              "title": "体育赛事",
              "value": "53"
            },
            {
              "title": "足球",
              "value": "54"
            },
            {
              "title": "篮球",
              "value": "55"
            },
            {
              "title": "网球",
              "value": "56"
            },
            {
              "title": "斯诺克",
              "value": "57"
            },
            {
              "title": "短剧大全",
              "value": "58"
            },
            {
              "title": "重生民国",
              "value": "59"
            },
            {
              "title": "穿越年代",
              "value": "60"
            },
            {
              "title": "现代言情",
              "value": "61"
            },
            {
              "title": "反转爽文",
              "value": "62"
            },
            {
              "title": "女恋总裁",
              "value": "63"
            },
            {
              "title": "闪婚离婚",
              "value": "64"
            },
            {
              "title": "都市脑洞",
              "value": "65"
            },
            {
              "title": "古装仙侠",
              "value": "66"
            },
            {
              "title": "福利",
              "value": "67"
            },
            {
              "title": "AI漫剧",
              "value": "68"
            }
          ]
        },
        {
          "name": "page",
          "title": "页码",
          "type": "page"
        }
      ]
    },
    {
      "id": "list-lzi",
      "title": "量子资源 · 分类",
      "functionName": "loadListLzi",
      "params": [
        {
          "name": "type",
          "title": "分类",
          "type": "enumeration",
          "enumOptions": [
            {
              "title": "最新更新",
              "value": ""
            },
            {
              "title": "电影片",
              "value": "1"
            },
            {
              "title": "连续剧",
              "value": "2"
            },
            {
              "title": "综艺片",
              "value": "3"
            },
            {
              "title": "动漫片",
              "value": "4"
            },
            {
              "title": "动作片",
              "value": "6"
            },
            {
              "title": "喜剧片",
              "value": "7"
            },
            {
              "title": "爱情片",
              "value": "8"
            },
            {
              "title": "科幻片",
              "value": "9"
            },
            {
              "title": "恐怖片",
              "value": "10"
            },
            {
              "title": "剧情片",
              "value": "11"
            },
            {
              "title": "战争片",
              "value": "12"
            },
            {
              "title": "国产剧",
              "value": "13"
            },
            {
              "title": "香港剧",
              "value": "14"
            },
            {
              "title": "韩国剧",
              "value": "15"
            },
            {
              "title": "欧美剧",
              "value": "16"
            },
            {
              "title": "记录片",
              "value": "20"
            },
            {
              "title": "台湾剧",
              "value": "21"
            },
            {
              "title": "日本剧",
              "value": "22"
            },
            {
              "title": "海外剧",
              "value": "23"
            },
            {
              "title": "泰国剧",
              "value": "24"
            },
            {
              "title": "大陆综艺",
              "value": "25"
            },
            {
              "title": "港台综艺",
              "value": "26"
            },
            {
              "title": "日韩综艺",
              "value": "27"
            },
            {
              "title": "欧美综艺",
              "value": "28"
            },
            {
              "title": "国产动漫",
              "value": "29"
            },
            {
              "title": "日韩动漫",
              "value": "30"
            },
            {
              "title": "欧美动漫",
              "value": "31"
            },
            {
              "title": "港台动漫",
              "value": "32"
            },
            {
              "title": "海外动漫",
              "value": "33"
            },
            {
              "title": "伦理片",
              "value": "34"
            },
            {
              "title": "电影解说",
              "value": "35"
            },
            {
              "title": "体育",
              "value": "36"
            },
            {
              "title": "足球",
              "value": "37"
            },
            {
              "title": "篮球",
              "value": "38"
            },
            {
              "title": "网球",
              "value": "39"
            },
            {
              "title": "斯诺克",
              "value": "40"
            },
            {
              "title": "预告片",
              "value": "45"
            },
            {
              "title": "短剧",
              "value": "46"
            },
            {
              "title": "动画片",
              "value": "49"
            },
            {
              "title": "AI漫剧",
              "value": "52"
            }
          ]
        },
        {
          "name": "page",
          "title": "页码",
          "type": "page"
        }
      ]
    },
    {
      "id": "list-ole",
      "title": "欧乐影院",
      "functionName": "loadListOle",
      "params": [
        {
          "name": "cat",
          "title": "分类",
          "type": "enumeration",
          "enumOptions": [
            {
              "title": "电影",
              "value": "1"
            },
            {
              "title": "连续剧",
              "value": "2"
            },
            {
              "title": "综艺",
              "value": "3"
            },
            {
              "title": "动漫",
              "value": "4"
            }
          ]
        },
        {
          "name": "page",
          "title": "页码",
          "type": "page"
        }
      ]
    },
    {
      "id": "list-dbku",
      "title": "独播库",
      "functionName": "loadListDbku",
      "params": [
        {
          "name": "cat",
          "title": "分类",
          "type": "enumeration",
          "enumOptions": [
            {
              "title": "电影",
              "value": "1"
            },
            {
              "title": "剧集",
              "value": "2"
            },
            {
              "title": "综艺",
              "value": "3"
            },
            {
              "title": "动漫",
              "value": "4"
            }
          ]
        },
        {
          "name": "page",
          "title": "页码",
          "type": "page"
        }
      ]
    },
    {
      "id": "list-libvio",
      "title": "libvio",
      "functionName": "loadListLibvio",
      "params": [
        {
          "name": "cat",
          "title": "分类",
          "type": "enumeration",
          "enumOptions": [
            {
              "title": "电影",
              "value": "1"
            },
            {
              "title": "剧集",
              "value": "2"
            },
            {
              "title": "日韩剧",
              "value": "15"
            },
            {
              "title": "欧美剧",
              "value": "16"
            },
            {
              "title": "动漫",
              "value": "4"
            }
          ]
        },
        {
          "name": "page",
          "title": "页码",
          "type": "page"
        }
      ]
    },
    {
      "id": "list-cz",
      "title": "厂长",
      "functionName": "loadListCz",
      "params": [
        {
          "name": "cat",
          "title": "分类",
          "type": "enumeration",
          "enumOptions": [
            {
              "title": "最新更新",
              "value": "movie_bt"
            },
            {
              "title": "国产剧",
              "value": "gcj"
            },
            {
              "title": "美剧",
              "value": "meijutt"
            },
            {
              "title": "韩剧",
              "value": "hanjutv"
            },
            {
              "title": "日剧",
              "value": "riju"
            },
            {
              "title": "海外剧",
              "value": "haiwaijuqita"
            },
            {
              "title": "番剧",
              "value": "fanju"
            },
            {
              "title": "剧场版",
              "value": "dongmanjuchangban"
            },
            {
              "title": "最新电影",
              "value": "zuixindianying"
            },
            {
              "title": "豆瓣Top250",
              "value": "dbtop250"
            },
            {
              "title": "高分影视",
              "value": "gaofenyingshi"
            },
            {
              "title": "华语电影",
              "value": "huayudianying"
            },
            {
              "title": "欧美电影",
              "value": "oumeidianying"
            },
            {
              "title": "日本电影",
              "value": "ribendianying"
            },
            {
              "title": "韩国电影",
              "value": "hanguodianying"
            },
            {
              "title": "印度电影",
              "value": "yindudianying"
            },
            {
              "title": "俄罗斯电影",
              "value": "eluosidianying"
            },
            {
              "title": "加拿大电影",
              "value": "jianadadianying"
            }
          ]
        },
        {
          "name": "page",
          "title": "页码",
          "type": "page"
        }
      ]
    },
    {
      "id": "loadResource",
      "title": "多源播放",
      "functionName": "loadResource",
      "type": "stream",
      "cacheDuration": 0
    }
  ],
  "search": {
    "id": "search",
    "title": "多源搜索",
    "functionName": "search",
    "params": [
      {
        "name": "page",
        "title": "页码",
        "type": "page"
      }
    ]
  }
};

function makeMacCMS(cfg) {
var BASE = cfg.base;
var TITLE = cfg.title;

async function apiGet(extra) {
  var r = await Widget.http.get(BASE, { params: extra });
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
  var r = await Widget.http.get(url, { headers: { "User-Agent": UA, Referer: BASE + "/" } });
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
  var r = await Widget.http.get(url, { headers: { "User-Agent": UA, Referer: BASE + "/" } });
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

var libvioImpl = (function () {
var DEFAULT_SITE = "https://www.libvio.lat";
var UA = "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1";

function siteOf(params) {
  var s = String((params && params.libvio_site) || DEFAULT_SITE).trim().replace(/\/+$/, "");
  return /^https?:\/\//i.test(s) ? s : DEFAULT_SITE;
}

function absUrl(site, href) {
  href = String(href || "");
  if (!href) return "";
  if (/^https?:\/\//i.test(href)) return href;
  if (href.startsWith("//")) return "https:" + href;
  return site + (href.startsWith("/") ? href : "/" + href);
}

function originOf(url) {
  var m = /^(https?:\/\/[^/]+)/i.exec(String(url || ""));
  return m ? m[1] : DEFAULT_SITE;
}

async function fetchHtml(url) {
  var r = await Widget.http.get(url, { headers: { "User-Agent": UA, Referer: originOf(url) + "/" } });
  return String(r.data || "");
}

function parseCards($, site) {
  var items = [];
  $("ul.stui-vodlist li, .stui-vodlist li").each(function (i, li) {
    var $li = $(li);
    var ha = $li.find("h4 a").first();
    var href = ha.attr("href") || "";
    var title = ha.text().trim() || ha.attr("title") || "";
    if (!href || !title) return;
    var thumb = $li.find("a.stui-vodlist__thumb").first();
    var poster = thumb.attr("data-original") || $li.find("img").attr("data-original") || $li.find("img").attr("src") || "";
    items.push({
      id: href,
      type: "url",
      link: absUrl(site, href),
      title: title,
      coverUrl: absUrl(site, poster),
      subtitle: $li.find("span.pic-text").first().text().trim()
    });
  });
  return items;
}

async function loadList(params) {
  var site = siteOf(params);
  var page = Number(params.page) || 1;
  var cat = params.cat || "1";
  var url = page <= 1
    ? site + "/type/" + cat + ".html"
    : site + "/type/" + cat + "-" + page + ".html";
  var $ = Widget.html.load(await fetchHtml(url));
  var items = parseCards($, site);
  if (!items.length && page <= 1) throw new Error("libvio 列表为空，站点域名可能已轮换，请在模块参数里更新站点地址");
  return items;
}

async function search(params) {
  var site = siteOf(params);
  var page = Number(params.page) || 1;
  var kw = String(params.keyword || "").trim();
  if (!kw) return [];
  var enc = encodeURIComponent(kw);
  var url = page <= 1
    ? site + "/search/-------------.html?wd=" + enc + "&submit="
    : site + "/search/" + enc + "----------" + page + "---.html";
  var $ = Widget.html.load(await fetchHtml(url));
  return parseCards($, site);
}

// 解析详情页的播放线路：[{ name, episodes: [{ name, href }] }]
function parseGroups($) {
  var tabNames = [];
  $(".stui-content__tab li, .stui-content__tab a").each(function (i, el) {
    var t = $(el).text().replace(/\s+/g, " ").trim();
    if (t) tabNames.push(t);
  });
  var groups = [];
  $("ul.stui-content__playlist").each(function (gi, ul) {
    var eps = [];
    var seen = {};
    $(ul).find("li a").each(function (ei, a) {
      var href = $(a).attr("href") || "";
      if (!href || seen[href]) return;
      seen[href] = 1;
      eps.push({ name: $(a).text().replace(/\s+/g, " ").trim() || "第" + (ei + 1) + "集", href: href });
    });
    if (eps.length) groups.push({ name: tabNames[groups.length] || "线路" + (groups.length + 1), episodes: eps });
  });
  return groups;
}

async function loadDetail(link) {
  var url = String(link || "");
  if (!/^https?:\/\//i.test(url)) throw new Error("无法识别的详情链接");
  var site = originOf(url);
  var $ = Widget.html.load(await fetchHtml(url));
  var title = $(".stui-content__detail .title").first().text().trim()
    || $("h1").first().text().trim()
    || $("title").text().split("_")[0].trim();
  var poster = $("a.stui-vodlist__thumb").first().attr("data-original")
    || $(".stui-content__thumb img").attr("data-original") || "";
  var desc = $(".stui-content__detail .desc").first().text().replace(/\s+/g, " ").trim()
    || ($('meta[name="description"]').attr("content") || "");
  var groups = parseGroups($);
  var main = null;
  groups.forEach(function (g) { if (!main || g.episodes.length > main.episodes.length) main = g; });
  var episodes = (main ? main.episodes : []).map(function (e, ei) {
    return {
      id: url + "#ep-" + ei,
      type: "url",
      title: e.name,
      episode: ei + 1,
      link: "play:" + absUrl(site, e.href) + "|" + url
    };
  });
  return {
    id: url,
    type: "url",
    link: url,
    title: title,
    coverUrl: absUrl(site, poster),
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
  var site = originOf(detailUrl);
  var $ = Widget.html.load(await fetchHtml(detailUrl));
  var title = $(".stui-content__detail .title").first().text().trim() || $("h1").first().text().trim();
  var groups = parseGroups($);
  var resolved = await Promise.all(groups.map(async function (g) {
    var ep = g.episodes[epIdx];
    if (!ep) return null;
    try {
      var playUrl = absUrl(site, ep.href);
      var media = await resolvePlay(playUrl);
      return {
        name: "libvio · " + g.name,
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
    return [{ name: "libvio", url: fallback }];
  }
  return out;
}

async function loadResource(params) {
  var epIdx = Number(params.episode) > 0 ? Number(params.episode) - 1 : -1;
  var link = String(params.link || "");
  // 模式一：来自本模块自己的详情页
  if (link.startsWith("play:")) {
    var parts = link.slice(5).split("|");
    var tapped = parts[0];
    var detailUrl = parts[1] || "";
    if (epIdx < 0) epIdx = 0;
    if (!detailUrl) {
      var single = await resolvePlay(tapped);
      return [{ name: "libvio", url: single }];
    }
    return sourcesFromDetail(detailUrl, epIdx, tapped);
  }
  // 模式二：TMDB 详情页（按片名搜索匹配）
  var name = String(params.seriesName || params.title || "").trim();
  if (!name) return [];
  if (epIdx < 0) epIdx = 0;
  var items = await search({ keyword: name, page: 1, libvio_site: params.libvio_site });
  var best = pickBestCard(items, name, Number(params.season) || 0);
  if (!best) return [];
  return sourcesFromDetail(best.link, epIdx, "");
}
  return { loadList: loadList, search: search, loadDetail: loadDetail, loadResource: loadResource };
})();

var czImpl = (function () {
var DEFAULT_SITE = "https://www.4kcz.com";
var NAVIGATION = "https://cz01.vip/";
var SITE_FAMILY = /^https:\/\/(?:www\.)?(?:4kcz|cz4k|czzy)\d*\.[a-z]+$/i;
var UA = "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1";

function clean(s) { return String(s || "").replace(/\s+/g, " ").trim(); }

function originOf(url) {
  var m = /^(https?:\/\/[^/]+)/i.exec(String(url || ""));
  return m ? m[1] : "";
}

function absUrl(raw, base) {
  raw = String(raw || "").trim();
  if (!raw || raw.startsWith("#") || /^(javascript|data):/i.test(raw)) return "";
  if (/^https?:\/\//i.test(raw)) return raw;
  if (raw.startsWith("//")) return "https:" + raw;
  var origin = originOf(base);
  if (!origin) return "";
  if (raw.startsWith("/")) return origin + raw;
  var path = String(base || "").split(/[?#]/)[0];
  var dir = path.slice(0, path.lastIndexOf("/") + 1);
  return dir + raw;
}

function localPath(url, site) {
  if (!url) return "";
  var o = originOf(url);
  if (o !== site && !(SITE_FAMILY.test(site) && SITE_FAMILY.test(o))) return "";
  var m = /^https?:\/\/[^/]+(\/[^#]*)/i.exec(url);
  return m ? (m[1] === "/" ? "" : m[1]) : "";
}

async function fetchText(url, referer, params) {
  var headers = { "User-Agent": UA, Accept: "text/html,application/xhtml+xml,*/*;q=0.8" };
  if (referer) headers.Referer = referer;
  var r = await Widget.http.get(url, { headers: headers, params: params });
  var text = String(r.data || "");
  if (/\/.safeline\/|id=["']slg-(?:box|title)["']|SafeLineChallenge|id=["']challenge-form/.test(text)) {
    throw new Error("厂长站点触发了 SafeLine 人机验证，Rex 无法像 WeBox 那样用浏览器会话通过，请稍后重试");
  }
  return { text: text, url: url };
}

async function siteOrigin(params) {
  var manual = String((params && params.cz_site) || "").trim();
  if (manual) {
    if (!/^https:\/\//i.test(manual)) throw new Error("请填写完整的厂长 HTTPS 站点地址");
    return originOf(manual);
  }
  var cached = null;
  try { cached = Widget.storage.get("cz_site"); } catch (e) { cached = null; }
  if (cached && cached.origin && cached.expires > Date.now()) return cached.origin;
  var origin = DEFAULT_SITE;
  var found = false;
  try {
    var page = await fetchText(NAVIGATION, "");
    var $ = Widget.html.load(page.text);
    var anchors = $("a[href]").toArray();
    for (var i = 0; i < anchors.length; i++) {
      var u = absUrl($(anchors[i]).attr("href"), NAVIGATION);
      var o = originOf(u || "");
      if (o && SITE_FAMILY.test(o)) { origin = o; found = true; break; }
    }
  } catch (e) { /* 发现失败时用默认站点 */ }
  try { Widget.storage.set("cz_site", { origin: origin, expires: Date.now() + (found ? 600000 : 60000) }); } catch (e) {}
  return origin;
}

function parseCards($, pageUrl, site) {
  var items = [];
  var seen = {};
  $(".bt_img li, li:has(h3.dytit > a[href])").each(function (i, li) {
    var $li = $(li);
    var a = $li.find("h3 a[href]").first();
    var title = clean(a.text());
    var target = absUrl(a.attr("href"), pageUrl);
    var id = localPath(target, site);
    if (!title || !id || seen[id]) return;
    seen[id] = 1;
    var img = $li.find("img").first();
    var poster = absUrl(img.attr("data-original") || img.attr("data-src") || img.attr("src"), pageUrl);
    items.push({
      id: id,
      type: "url",
      link: target,
      title: title.slice(0, 240),
      coverUrl: poster || "",
      subtitle: clean($li.find(".jidi span, .qb, .furk").first().text()).slice(0, 200)
    });
  });
  return items;
}

async function loadList(params) {
  var page = Number(params.page) || 1;
  var cat = params.cat || "movie_bt";
  var site = await siteOrigin(params);
  var url = site + "/" + cat + (page > 1 ? "/page/" + page : "");
  var res = await fetchText(url, site + "/");
  var $ = Widget.html.load(res.text);
  var items = parseCards($, url, site);
  if (!items.length && page <= 1) throw new Error("厂长栏目页没有返回可识别的影片列表");
  return items;
}

async function search(params) {
  var kw = String(params.keyword || "").trim();
  if (!kw) return [];
  var page = Number(params.page) || 1;
  var site = await siteOrigin(params);
  var res = await fetchText(site + "/nimasile", site + "/", { q: kw, f: "_all", p: String(page) });
  var $ = Widget.html.load(res.text);
  var items = parseCards($, site + "/nimasile", site);
  if (!items.length && /没有找到|没有搜索结果|未找到相关|无搜索结果/.test($("body").text())) return [];
  return items;
}

// 解析详情页的播放线路：[{ name, episodes: [{ name, target, id }] }]
function parseGroups($, pageUrl, site) {
  var tabs = $(".mi_paly_box .ypxingq_t").toArray();
  var groups = [];
  $(".paly_list_btn").each(function (gi, row) {
    var lineName = clean($(tabs[gi]).text()) || (gi ? "播放线路 " + (gi + 1) : "厂长播放");
    var eps = [];
    var seen = {};
    $(row).find("a[href]").each(function (ei, a) {
      var target = absUrl($(a).attr("href"), pageUrl);
      var id = localPath(target, site);
      if (!id || id === localPath(pageUrl, site) || seen[id]) return;
      seen[id] = 1;
      eps.push({ name: clean($(a).text()) || "第" + (ei + 1) + "集", target: target, id: id });
    });
    if (eps.length) groups.push({ name: lineName, episodes: eps });
  });
  return groups;
}

async function loadDetail(link) {
  var url = String(link || "");
  if (!/^https?:\/\//i.test(url)) throw new Error("无法识别的详情链接");
  var site = originOf(url);
  var res = await fetchText(url, site + "/");
  var $ = Widget.html.load(res.text);
  var title = clean($("h1").first().text());
  if (!title) throw new Error("厂长详情页缺少影片标题");
  var summary = clean($(".yp_context").first().text()).slice(0, 2000);
  var img = $(".dyimg img").first();
  var poster = absUrl(img.attr("data-original") || img.attr("data-src") || img.attr("src"), url);
  var groups = parseGroups($, url, site);
  var main = null;
  groups.forEach(function (g) { if (!main || g.episodes.length > main.episodes.length) main = g; });
  var episodes = (main ? main.episodes : []).map(function (e, ei) {
    return {
      id: e.id,
      type: "url",
      title: e.name,
      episode: ei + 1,
      link: "czplay:" + e.target + "|" + url
    };
  });
  return {
    id: localPath(url, site) || url,
    type: "url",
    link: url,
    title: title.slice(0, 240),
    coverUrl: poster || "",
    description: summary,
    episodeItems: episodes
  };
}

function mediaCandidate(raw, base, referer) {
  var u = absUrl(raw, base);
  if (!u) return null;
  var path = u.split(/[?#]/)[0];
  if (!/\.(m3u8|mp4)$/i.test(path)) return null;
  return { url: u, referer: referer };
}

async function findMedia(url, referer, seen, depth) {
  if (seen[url] || Object.keys(seen).length >= 5) return null;
  seen[url] = 1;
  var res = await fetchText(url, referer);
  var $ = Widget.html.load(res.text);
  var direct = mediaCandidate(url, url, referer);
  if (direct) return direct;
  var vids = $("video[src], video[data-src], video source[src], video source[data-src]").toArray();
  for (var i = 0; i < vids.length; i++) {
    var m1 = mediaCandidate($(vids[i]).attr("src") || $(vids[i]).attr("data-src"), url, url);
    if (m1) return m1;
  }
  var scripts = $("script:not([src])").toArray();
  for (var s = 0; s < scripts.length; s++) {
    var text = $(scripts[s]).html() || "";
    var lit = /(?:var|let|const)\s+\w+\s*=\s*["']([^"']+\.(?:m3u8|mp4)(?:\?[^"']*)?)["']/i.exec(text)
      || /\.url\s*=\s*["']([^"']+\.(?:m3u8|mp4)(?:\?[^"']*)?)["']/i.exec(text)
      || /["'](https?:[^"'<>\s]+\.(?:m3u8|mp4)(?:\?[^"'<>\s]*)?)["']/i.exec(text);
    if (lit) {
      var val = lit[1].replace(/\\\//g, "/").replace(/&amp;/gi, "&");
      var m2 = mediaCandidate(val, url, url);
      if (m2) return m2;
    }
  }
  if (depth >= 2) return null;
  var frames = $("iframe[src], iframe[data-src]").toArray();
  for (var f = 0; f < frames.length; f++) {
    if (Object.keys(seen).length >= 5) break;
    var target = absUrl($(frames[f]).attr("src") || $(frames[f]).attr("data-src"), url);
    if (!target) continue;
    var dm = mediaCandidate(target, url, url);
    if (dm) return dm;
    try {
      var nested = await findMedia(target, url, seen, depth + 1);
      if (nested) return nested;
    } catch (e) { /* 继续尝试其他 iframe */ }
  }
  return null;
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

// 拉详情页，按集汇总全部线路并逐条嗅探出媒体地址（点中的线路排第一）
async function sourcesFromDetail(detailUrl, epIdx, tapped) {
  var site = originOf(detailUrl);
  var res = await fetchText(detailUrl, site + "/");
  var $ = Widget.html.load(res.text);
  var title = clean($("h1").first().text());
  var groups = parseGroups($, detailUrl, site).slice(0, 4);
  if (epIdx < 0) {
    groups.forEach(function (g) {
      g.episodes.forEach(function (e, ei) { if (e.target === tapped) epIdx = ei; });
    });
    if (epIdx < 0) epIdx = 0;
  }
  var resolved = await Promise.all(groups.map(async function (g) {
    var ep = g.episodes[epIdx];
    if (!ep) return null;
    try {
      var media = await findMedia(ep.target, detailUrl, {}, 0);
      if (!media) return null;
      var out = {
        name: "厂长 · " + g.name,
        url: media.url,
        description: (title ? title + " · " : "") + ep.name + " · " + g.name,
        _tapped: tapped && ep.target === tapped ? 0 : 1
      };
      if (media.referer) out.customHeaders = { Referer: media.referer };
      return out;
    } catch (e) { return null; }
  }));
  var outList = resolved.filter(function (x) { return !!x; })
    .sort(function (a, b) { return a._tapped - b._tapped; });
  outList.forEach(function (x) { delete x._tapped; });
  return outList;
}

async function loadResource(params) {
  var epIdx = Number(params.episode) > 0 ? Number(params.episode) - 1 : -1;
  var link = String(params.link || "");
  // 模式一：来自本模块自己的详情页
  if (link.startsWith("czplay:")) {
    var parts = link.slice(7).split("|");
    var tapped = parts[0];
    var detailUrl = parts[1] || "";
    if (!detailUrl) {
      var only = await findMedia(tapped, tapped, {}, 0);
      if (!only) throw new Error("厂长播放页没有返回可识别的媒体地址");
      var single = { name: "厂长播放", url: only.url };
      if (only.referer) single.customHeaders = { Referer: only.referer };
      return [single];
    }
    var fromDetail = await sourcesFromDetail(detailUrl, epIdx, tapped);
    if (!fromDetail.length) throw new Error("厂长播放页没有返回可识别的媒体地址");
    return fromDetail;
  }
  // 模式二：TMDB 详情页（按片名搜索匹配）
  var name = String(params.seriesName || params.title || "").trim();
  if (name) {
    if (epIdx < 0) epIdx = 0;
    var items = await search({ keyword: name, page: 1, cz_site: params.cz_site });
    var best = pickBestCard(items, name, Number(params.season) || 0);
    if (!best) return [];
    return sourcesFromDetail(best.link, epIdx, "");
  }
  if (!/^https?:\/\//i.test(link)) return [];
  var media = await findMedia(link, link, {}, 0);
  if (!media) throw new Error("厂长播放页没有返回可识别的媒体地址");
  var out = { name: "厂长播放", url: media.url };
  if (media.referer) out.customHeaders = { Referer: media.referer };
  return [out];
}
  return { loadList: loadList, search: search, loadDetail: loadDetail, loadResource: loadResource };
})();

var MC_SLUGS = { dytt: 1, ffzy: 1, wsy: 1, bfzy: 1, lzi: 1 };
var TITLES = { dytt: "电影天堂", ffzy: "非凡资源", wsy: "无水印资源", bfzy: "暴风资源", lzi: "量子资源", ole: "欧乐影院", dbku: "独播库", libvio: "libvio", cz: "厂长" };
var ORDER = ["dytt", "ffzy", "wsy", "bfzy", "lzi", "ole", "dbku", "libvio", "cz"];
var IMPLS = {
  dytt: makeMacCMS({ title: "电影天堂", base: "https://caiji.dyttzyapi.com/api.php/provide/vod" }),
  ffzy: makeMacCMS({ title: "非凡资源", base: "https://cj.ffzyapi.com/api.php/provide/vod/from/ffm3u8" }),
  wsy: makeMacCMS({ title: "无水印资源", base: "https://api.wsyzy.net/api.php/provide/vod" }),
  bfzy: makeMacCMS({ title: "暴风资源", base: "https://apibfzy.com/api.php/provide/vod" }),
  lzi: makeMacCMS({ title: "量子资源", base: "https://cj.lziapi.com/api.php/provide/vod" }),
  ole: oleImpl, dbku: dbkuImpl, libvio: libvioImpl, cz: czImpl
};

async function safeAsync(fn) { try { return await fn(); } catch (e) { return []; } }

function retagItem(slug, it) {
  var c = {};
  for (var k in it) c[k] = it[k];
  c.id = slug + ":" + it.id;
  var raw = String(it.link || "");
  if (MC_SLUGS[slug]) raw = raw.replace(/^vod:/, "");
  c.link = slug + "::" + raw;
  return c;
}

function retagSearchItem(slug, it) {
  var c = retagItem(slug, it);
  c.subtitle = TITLES[slug] + (it.subtitle ? " · " + it.subtitle : "");
  return c;
}

async function listWith(slug, params) {
  var items = await IMPLS[slug].loadList(params);
  return (items || []).map(function (it) { return retagItem(slug, it); });
}

async function loadListDytt(params) { return listWith("dytt", params); }
async function loadListFfzy(params) { return listWith("ffzy", params); }
async function loadListWsy(params) { return listWith("wsy", params); }
async function loadListBfzy(params) { return listWith("bfzy", params); }
async function loadListLzi(params) { return listWith("lzi", params); }
async function loadListOle(params) { return listWith("ole", params); }
async function loadListDbku(params) { return listWith("dbku", params); }
async function loadListLibvio(params) { return listWith("libvio", params); }
async function loadListCz(params) { return listWith("cz", params); }

function searchArgs(slug, params) {
  var a = { keyword: params.keyword, page: params.page };
  if (slug === "libvio") a.libvio_site = params.libvio_site;
  if (slug === "cz") a.cz_site = params.cz_site;
  return a;
}

async function search(params) {
  var kw = String(params.keyword || "").trim();
  if (!kw) return [];
  var parts = await Promise.all(ORDER.map(function (slug) {
    return safeAsync(function () { return IMPLS[slug].search(searchArgs(slug, params)); })
      .then(function (items) { return (items || []).map(function (it) { return retagSearchItem(slug, it); }); });
  }));
  var out = [];
  parts.forEach(function (p) { out = out.concat(p); });
  return out;
}

function retagEpLink(slug, link) {
  link = String(link || "");
  if (MC_SLUGS[slug]) return slug + "::" + link.replace(/^vod:/, "");
  if (slug === "ole" || slug === "dbku") return slug + "play::" + link.replace(/^play:/, "");
  if (slug === "libvio") return "libvioplay::" + link.replace(/^play:/, "");
  return link;
}

async function loadDetail(link) {
  var m = /^([a-z]+)::([\s\S]+)$/.exec(String(link || ""));
  if (!m || !IMPLS[m[1]]) throw new Error("无法识别的详情链接");
  var slug = m[1];
  var rest = m[2];
  var d = MC_SLUGS[slug] ? await IMPLS[slug].loadDetail("vod:" + rest) : await IMPLS[slug].loadDetail(rest);
  if (!d || Array.isArray(d)) return d;
  d.id = slug + ":" + d.id;
  d.link = link;
  (d.episodeItems || []).forEach(function (ep) { ep.link = retagEpLink(slug, ep.link); });
  return d;
}

function tmdbArgs(slug, params) {
  var a = { seriesName: params.seriesName, title: params.title, season: params.season, episode: params.episode, type: params.type };
  if (slug === "libvio") a.libvio_site = params.libvio_site;
  if (slug === "cz") a.cz_site = params.cz_site;
  return a;
}

async function loadResource(params) {
  var link = String(params.link || "");
  var mm = /^([a-z]+)::([\s\S]+)$/.exec(link);
  if (mm && MC_SLUGS[mm[1]]) {
    return IMPLS[mm[1]].loadResource({ link: "vod:" + mm[2], episode: params.episode, id: params.id });
  }
  var pm = /^(ole|dbku|libvio)play::([\s\S]+)$/.exec(link);
  if (pm) {
    return IMPLS[pm[1]].loadResource({ link: "play:" + pm[2], episode: params.episode });
  }
  if (link.indexOf("czplay:") === 0) return czImpl.loadResource(params);
  var name = String(params.seriesName || params.title || "").trim();
  if (!name) return [];
  var parts = await Promise.all(ORDER.map(function (slug) {
    return safeAsync(function () { return IMPLS[slug].loadResource(tmdbArgs(slug, params)); });
  }));
  var out = [];
  parts.forEach(function (p) { out = out.concat(p || []); });
  return out;
}
