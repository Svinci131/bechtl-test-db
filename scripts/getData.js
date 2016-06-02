const request = require("request");
const cheerio = require("cheerio");


module.exports = function (url, cb) {
	return new Promise (function (resolve, reject) {
		request(url, function (error, response, body) {
		  if (!error) {
		  	var text = cb(body);
		    resolve(text);
		  }
		  else {
		  	reject(error);
		  }
		  
		});
	});
};
