const rTKey = require("../secret/rottenTomatoesApi");
const request = require("superagent");
const chalk = require('chalk');
const red = chalk.red;	
const green = chalk.green;	
const links = "http://api.rottentomatoes.com/api/public/v1.0.json?apikey="+rTKey;
const movies = "http://api.rottentomatoes.com/api/public/v1.0/movies.json?apikey="+rTKey;
var title = "Toy+Story+3"
const movie = "http://api.rottentomatoes.com/api/public/v1.0/movies.json?q=Toy+Story+3";


request
.get(movie)
.end(function(err, res){
	if (err) {
		
	}
	else {
		var url = JSON.parse(res.text);
		console.log(res)
		//get(url);
	}



});
function get (url) {
	request
	.get(url)
	.end(function(err, res){
		if (err) {
			throw err
		}
		else {
			console.log(res);
		}
});
}


// https://api.rottentomatoes.com/api/public/v1.0/lists.json?apikey=8buwhx6a89epesh9se5xw33e
// //http://api.rottentomatoes.com/api/public/v1.0/movies.json?apikey=8buwhx6a89epesh9se5xw33e

// //