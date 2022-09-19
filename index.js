const puppeteer = require("puppeteer");
const download = require("image-downloader");

(async() => {
	const brower = await puppeteer.launch({product:"firefox", dumpio: true});
	const page = await brower.newPage();
	await page.goto("");
	await new Promise(item => setTimeout(item, 10000))
	const articles = await page.evaluate(() => {
		let titleLinks = document.querySelectorAll("._aagv > img");
		titleLinks = [...titleLinks];
		let src_list = titleLinks.map(item => item.getAttribute("src"));
		return src_list
	});
	console.log(articles);
	await Promise.all(articles.map(url => download.image({
		url: url,
		dest: __dirname + "/downloaded"
	})));
	await brower.close();
})();
