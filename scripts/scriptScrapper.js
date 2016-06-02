'use strict' 
// const request = require("superagent");
const chalk = require('chalk');
const red = chalk.red;	
const green = chalk.green;	
const rootURl = "http://www.imsdb.com/scripts/";
// const utils = require('./utils');
const Line = require('./line').Line;
const Conversation = require('./line').Conversation;
const Movie = require("./movie");




///(string, arr, arr) => boolean
function checkScript (title, list, list2) {
	var url = rootURl+title+".html",
		movie = new Movie(title, [list, list2]);
		movie.cast.setNameVariations();
	var femaleCharCount = movie.cast.femaleChars.originalNameList.length;
	//if less than two female chars return false
	if (femaleCharCount < 2) {
		return new Promise((res, rej) => {
			movie.passing = false;
			res(movie.passing);
		});
	}
	//else check script
	return movie.checkPassing(url);
}

module.exports = checkScript;



//heavenly_creatures
//http://www.imsdb.com/heavenly_creatures
	//download and read 
	//http://www.imsdb.com/scripts/Heavenly-Creatures.html




//https://sfy.ru/?script=hackers