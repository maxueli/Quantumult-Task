/*
此文件为Node.js专用。其他用户请忽略
 */
//此处填写京东账号cookie。
let CookieJDs = [
  "pt_key=AAJjc0emADA1l1W6mHcMxMQBZpmZ1tfL6YwgVZVHz7pE6Xw04vh0aU05XF77bgqAE5-OrsZj9F4;pt_pin=jd_65e30e42b9e21;pt_token=jn1t8cr4;pwdt_id=jd_65e30e42b9e21;sfstoken=tk01mabf61c01a8sMysxN2crU280mcbkTN4YG/Nfl30TlKscZJyGKbX+ton4Z1dMLbkk9EdUtIH0cev2bcI8NL6NntfK;",
];
// 判断环境变量里面是否有京东ck
if (process.env.JD_COOKIE) {
  if (process.env.JD_COOKIE.indexOf("&") > -1) {
    CookieJDs = process.env.JD_COOKIE.split("&");
  } else if (process.env.JD_COOKIE.indexOf("\n") > -1) {
    CookieJDs = process.env.JD_COOKIE.split("\n");
  } else {
    CookieJDs = [process.env.JD_COOKIE];
  }
}
if (JSON.stringify(process.env).indexOf("GITHUB") > -1) {
  console.log(
    `请勿使用github action运行此脚本,无论你是从你自己的私库还是其他哪里拉取的源代码，都会导致我被封号\n`
  );
  !(async () => {
    await require("./sendNotify").sendNotify(
      "提醒",
      `请勿使用github action、滥用github资源会封我仓库以及账号`
    );
    await process.exit(0);
  })();
}
CookieJDs = [...new Set(CookieJDs.filter((item) => !!item))];
console.log(
  `\n====================共${CookieJDs.length}个京东账号Cookie=========\n`
);
console.log(
  `==================脚本执行- 北京时间(UTC+8)：${new Date(
    new Date().getTime() +
      new Date().getTimezoneOffset() * 60 * 1000 +
      8 * 60 * 60 * 1000
  ).toLocaleString()}=====================\n`
);
if (process.env.JD_DEBUG && process.env.JD_DEBUG === "false")
  console.log = () => {};
for (let i = 0; i < CookieJDs.length; i++) {
  if (
    !CookieJDs[i].match(/pt_pin=(.+?);/) ||
    !CookieJDs[i].match(/pt_key=(.+?);/)
  )
    console.log(
      `\n提示:京东cookie 【${CookieJDs[i]}】填写不规范,可能会影响部分脚本正常使用。正确格式为: pt_key=xxx;pt_pin=xxx;（分号;不可少）\n`
    );
  const index = i + 1 === 1 ? "" : i + 1;
  exports["CookieJD" + index] = CookieJDs[i].trim();
}
