'use strict' 
// const request = require("superagent");
const chalk = require('chalk');
const red = chalk.red;	
const green = chalk.green;	
const request = require("request");
const cheerio = require("cheerio");
const rootURl = "http://www.imsdb.com/scripts/";
const charSet = require('./charecterSets');
const utils = require('./utils');
const Line = require('./line');
const Cast = require("./cast");



//(string) => boolean
function checkSubject (line) {
	var maleWords = {
				"he": true,
				"his": true,
				"him": true,
				"his": true,
				"Son": true,
				"brother": true,
				"boyfriend": true,
				"husband": true,
				"father": true
			};	

	var isMaleName = maleChars.completeNameList;
	var talkingAboutAMan = false; 
	line = line.split(" ");


	for (i = line.length-1; i >= 0; i--) {
		var word = line[i].toLowerCase();
		if (maleWords[word] || isMaleName[word]) {
			talkingAboutAMan = true; 
		}
	}
	return talkingAboutAMan;
}





///(string) => boolean
function checkScript (title, list, list2) {
	var url = rootURl+title+".html",
		Movie = new Cast(list, list2);

	Movie.setNameVariations();

	checkIMSDB (url)
	.then(function(text) {
		Movie.findDelimiter(text);
		var	lines = text.split(Movie.delimiter); 
	
		return lines;

	})
	//check for names: or other deliminators
	.then(lines => {
		var doubleSplit = []; 
		if (Movie.delimiter !== "\n") {
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
		var passing = false;

		for (let i = 0; i < lines.length; i++) {
			line = lines[i];
			//if female character
			if (Movie.isFemaleName(line)) {
				var firstLine = new Line(line, lines[i+1], i);
				var nextLine = Movie.getNextSpeaker(firstLine, lines);

				if (Movie.isFemaleName(nextLine.speaker)) {
					console.log("first", firstLine);
					console.log("next", nextLine, Movie.isFemaleName(nextLine.speaker));
				}
				break; 
				//console.log(lines[156]);
			
			}
		}
		
	})
	.catch(err => {
		console.log(red(err));
	});
	
	// .then(function(lines){
	  		// var line, 
	  		     //passes = false;

		// 	for (let i = 0; i < lines.length; i++) {
		// 		line = lines[i];
		// 		if (Movie.isFemaleName (line)){
		// 			var prevSpeaker = lines[i];
		// 			var currLine = lines[i+1]; 
		// 			var talkingToFemale = checkNextSpeaker(prevSpeaker, i+2, lines);
		// 			//console.log("first", i, prevSpeaker, currLine);
		// 			if (talkingToFemale) {
		// 				// console.log("next", talkingToFemale.index, talkingToFemale.nextSpeaker, talkingToFemale.line);
		// 				if (checkSubject(currLine) && checkSubject(talkingToFemale.line)) {
		// 					femaleConversations[i] = {
		// 						between: [prevSpeaker, talkingToFemale.nextSpeaker],
		// 						text: lines.slice(i, talkingToFemale.index)
		// 					};
		// 					passes = true; 
		// 					break;
		// 				}
						
						
		// 			}
					
		// 		}
		// 	}
		// 	console.log(title, passes);
		// 	// console.log(femaleConversations); 
		// });
}

//(url) => promise
function checkIMSDB (url) {
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
}


var heavenly_creatures = checkScript ("Heavenly-Creatures", ["Dr. Henry Hulme", "Herbert Rieper", "Bill Perry"], ["JULIET HULME", "PAULINE RIEPER", "HONORA"])
var aladin = checkScript ("Aladdin", ["PEDDLar", 'prince','SULTAN', "jafar", "aladdin"], ["Jasmine"]);
console.log(heavenly_creatures);
console.log(aladin);

//heavenly_creatures
//http://www.imsdb.com/heavenly_creatures
	//download and read 
	//http://www.imsdb.com/scripts/Heavenly-Creatures.html




//https://sfy.ru/?script=hackers