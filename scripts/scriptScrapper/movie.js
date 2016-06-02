'use strict'

var Cast = require("./cast");
var maleWords = require("./words").maleWords;
const checkIMSDB = require("../getData");
const selectPre = require("./selectPre");

class Movie {
	constructor (title, castlist) {
		this.title = title, 
		this.cast = new Cast(castlist[0], castlist[1]);
		this.delimiter;
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
	findDelimiter (text) {
		var name,
			holder = [],
			delimiter;

		for (let i = 0; i <= 500; i++) {
			name = holder.join("").toLowerCase();
			holder.push(text[i]);
			
			if (text[i] === '\n') {
				holder = [];
			}

			if (this.cast.isName(name)) {
				delimiter = text[i];
				break;
			}
		}

		if (delimiter !== " ") {
			// return delimiter
			this.delimiter = delimiter;
		}
		else {
			this.delimiter = "\n"
		}
		
	}
	//(string) => boolean 
	checkPassing (url) {
		
		return checkIMSDB (url, selectPre)
		.then(function(text) {
			this.findDelimiter(text);
			var	lines = text.split(this.cast.delimiter); 
			return lines;
		})
		//check for names: or other deliminators
		.then(lines => {
			var doubleSplit = []; 
			if (this.delimiter !== "\n") {
				lines.forEach((line, i) => {
					var index = line.lastIndexOf("\n"); 
					var text = line.slice(0,index);
					var name = line.slice(index+1, line.lenth);

					doubleSplit.push(text);
					doubleSplit.push(name);

				});

				return doubleSplit;
			}
			else {
				return lines;
			} 
		})
		.then(lines => {
			var line;

			for (let i = 0; i < lines.length; i++) {
				line = lines[i];
				//if female character
				if (this.cast.isFemaleName(line)) {
					var firstLine = new Line(line, lines[i+1], i);
					var nextLine = this.cast.getNextSpeaker(firstLine, lines);

					if (this.cast.isFemaleName(nextLine.speaker)) {
						if (!this.isAboutMan(firstLine.line) && !this.isAboutMan(nextLine.line)) {
							// console.log("first", firstLine);
							// console.log("next", nextLine, this.cast.isFemaleName(nextLine.speaker));
							var conversation = new Conversation (firstLine, nextLine);
							this.passes = true; 
							this.femaleConversations.push(conversation);
						} 
					}
					break; 
				}
			}
			if (!this.passes) {
				this.passes = false;
			}
			console.log(this.title, this.passes);	
			return this.passes;
		})
		.catch(err => {
			console.log(red(err));
		});
	}
}

module.exports = Movie;