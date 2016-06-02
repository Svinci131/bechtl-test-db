// 'use strict'


const cheerio = require("cheerio");
const getData = require("../getData");

var obj = {};

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
				return el[0].attribs.href;
				// console.log(el[0].attribs);
			});
	return links;
}

function getCharacters (body) {
	var charObj = {}
	var $ = cheerio.load(body),
			nodes = $(".character>div>a"),
			actorNodes = $("[itemprop='actor']>a")
			characters = [].map.call(nodes, function(el, i){
				el = $(el);
				var charName = el.html();
				charObj[i] = { charName: charName };
				return el.html();
			}),
			actors = [].map.call(actorNodes, function(el, i) {
				var actorLink = el.attribs.href;
				el = $(el);
				var actorName = $(el.find("span")).html()
				if (charObj[i]) {
					charObj[i].actor = { name: actorName,
				 				 	 link: actorLink };
				}
				else {
					charObj[i] = { charName: null };
					charObj[i].actor = { name: actorName,
				 				 	 link: actorLink };
				}
			})
	// console.log(charObj)
	return charObj;
}
 
var movieUrlRoot = "http://www.imdb.com/";

getData("http://www.imdb.com/title/tt3499096/", getCharacters)
.then(characters => {
	// console.log(characters);
});