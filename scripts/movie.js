'use strict'

var Cast = require("./cast");
var maleWords = require("./words").maleWords;

class Movie {
	constructor (title, castlist) {
		this.title = title, 
		this.cast = new Cast(castlist[0], castlist[1]);
		this.passes;
		this.femaleConversations = [];
	}
	//(string) => boolean
	isAboutMan (line) {
		var isMaleName = this.cast.getMaleChars();
		var talkingAboutAMan = false; 

		line = line.split(" ");
		for (var i = line.length-1; i >= 0; i--) {
			var word = line[i].toLowerCase();
			if (maleWords[word] || isMaleName[word]) {
				talkingAboutAMan = true; 
			}
		}
		return talkingAboutAMan;
	}
}

module.exports = Movie;