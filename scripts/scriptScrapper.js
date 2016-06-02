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
const checkIMSDB = require("./getData")
console.log(Line)

function foo() {
	console.log (test);
}
///(string, arr, arr) => boolean
function checkScript (title, list, list2) {
	var url = rootURl+title+".html",
		movie = new Movie(title, [list, list2]);

	movie.cast.setNameVariations();

	return checkIMSDB (url)
	.then(function(text) {
		movie.cast.findDelimiter(text);
		var	lines = text.split(movie.cast.delimiter); 
	
		return lines;

	})
	//check for names: or other deliminators
	.then(lines => {
		var doubleSplit = []; 
		if (movie.cast.delimiter !== "\n") {
			lines.forEach((line, i) => 
			{
				var index = line.lastIndexOf("\n"); 
				var text = line.slice(0,index);
				var name = line.slice(index+1, line.lenth);

				doubleSplit.push(text);
				doubleSplit.push(name);

			});

			return doubleSplit 
		}
		else {
			return lines
		} 
	})
	.then(lines => {
		var line;

		for (let i = 0; i < lines.length; i++) {
			line = lines[i];
			//if female character
			if (movie.cast.isFemaleName(line)) {
				var firstLine = new Line(line, lines[i+1], i);
				var nextLine = movie.cast.getNextSpeaker(firstLine, lines);

				if (movie.cast.isFemaleName(nextLine.speaker)) {
					if (!movie.isAboutMan(firstLine.line) && !movie.isAboutMan(nextLine.line)) {
						// console.log("first", firstLine);
						// console.log("next", nextLine, movie.cast.isFemaleName(nextLine.speaker));
						var conversation = new Conversation (firstLine, nextLine);
						movie.passes = true; 
						movie.femaleConversations.push(conversation);
					} 
				}
				break; 
			}
		}
		if (!movie.passes) {
			movie.passes = false;
		}
		console.log(movie.title, movie.passes);	
		return movie.passes;
	})
	.catch(err => {
		console.log(red(err));
	});
}

module.exports = checkScript;



//heavenly_creatures
//http://www.imsdb.com/heavenly_creatures
	//download and read 
	//http://www.imsdb.com/scripts/Heavenly-Creatures.html




//https://sfy.ru/?script=hackers