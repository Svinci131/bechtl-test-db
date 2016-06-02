// 'use strict'


const cheerio = require("cheerio");
const getData = require("../getData");


// function getYearUrls (start, end) {
// 	const urlListRoot = "http://www.imdb.com/search/title?sort=moviemeter,asc&start=";
// 	var url = "urlListRoot+1&title_type=feature&year="+year+","+year;

// 	for (var i = end; i>=start; i--) {
// 		request
// 	}	

// }
var url = "http://www.imdb.com/search/title?sort=moviemeter,asc&start=51&title_type=feature&year=2016,2016";



function getMovieLinks (body) {
	var $ = cheerio.load(body),
		   	nodes = $(".title>a"),
			links = [].map.call(nodes, function(el){
				el = $(el);
				// var a = el.find("a");
				return el[0].attribs;
				// console.log(el[0].attribs);
			});
	return links;
}


getData(url, getMovieLinks)
.then(links => {
	console.log(links)
});

