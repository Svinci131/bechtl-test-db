const request = require("request");
const cheerio = require("cheerio");


module.exports = function (url) {
	return new Promise (function (resolve, reject) {
		request(url, function (error, response, body) {
		  if (!error) {
		    var $ = cheerio.load(body),
		    	text = $("pre").text();
		    	resolve(text);
		  }
		  else {
		  	reject(error);
		  }
		  
		});
	});
};


