module.exports = async function (url) {
  const puppeteer = require("puppeteer");
  const fs = require("fs");
  const path = require("path");
  const https = require("https");
  var stream = require("stream");
  const compressing = require("compressing");
  var isover = false;

  var dir = "./image";

  function sleep(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }

  async function main() {
    if (fs.existsSync(dir)) {
      fs.rmdir(dir, { recursive: true }, (err) => {
        if (err) {
          console.log(err);
        }
        console.log(`${dir} is deleted!`);
      });
    }
    console.log("*-*-*-*-*-*-*-爬蟲開始*-*-*-*-*-*-*-");

    const browser = await puppeteer.launch({
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: "networkidle2" });
    await page.addScriptTag({
      url: "https://code.jquery.com/jquery-3.2.1.min.js",
    });

    try {
      await page.focus("[name=yes]");
      (await page.$("[name=yes]")).click();
      await page.waitForNetworkIdle();
    } catch {
      console.log("not 18x");
    }

    var dataList = await page.evaluate(() => {
      const $ = window.$;
      let result = [];

      //let liList = $("#main-content > a:contains('.jpg')");
      let liList = $("a:contains('jpg')");

      liList.each(function (index, element) {
        var newsItem = {
          newsUrl: $(element).prop("href"),
        };
        result.push(newsItem);
      });
      return result;
    });
    console.table(dataList);

    await sleep(1000);

    // 20220912 關閉page先
    await page.close();

    await browser.close();

    console.log("*-*-*-*-*-*-*-爬蟲結束*-*-*-*-*-*-*-");
    //

    fs.mkdir(dir, { recursive: true }, (err) => {
      if (err) throw err;
    });
    //
    console.log("-*-*-*-*-*-*-*載圖程序開始-*-*-*-*-*-*-*");
    for (const key in dataList) {
      var a = dataList[key].newsUrl;
      var req = https.request(a, (res) => {
        res.pipe(fs.createWriteStream(dir + "/" + path.basename(a)));
      });
      req.end();
      await sleep(1000);
      console.log(a + ": 已經下載完成(～￣▽￣)～");
    }
    await sleep(3000);
    console.log("-*-*-*-*-*-*-*載圖程序結束-*-*-*-*-*-*-*");
    console.log("-*-*-*-*-*-*-*壓縮程序開始-*-*-*-*-*-*-*");
    compressing.zip
      .compressDir(dir, "demo.zip")
      .then((isover = true))
      .catch();

    console.log("-*-*-*-*-*-*-*壓縮程序結束-*-*-*-*-*-*-*");
  }

  // 等待main結束
  await main();
  console.log(isover);
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      isover ? resolve("istrue") : reject("error");
    }, 2000);
  });
};
