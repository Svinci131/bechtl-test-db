const cheerio = require("cheerio");

function selectPre (body) {
	var $ = cheerio.load(body),
		   	text = $("pre").text();
	return text;
}


module.exports = selectPre