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


class Cast  {

	constructor (maleList, femaleList) {
		this.delimiter; 
		this.maleChars = new charSet ("male", maleList);
		this.femaleChars = new charSet ("female", femaleList);
		this.all = this.maleChars.originalNameList.concat(this.femaleChars.originalNameList);
		this.lines = []; 
	}
	longest () {

		utils.longest(this.all);

	}
	getFemaleChars () {

		return this.femaleChars.completeNameList;

	}
	getMaleChars () {

		return this.maleChars.completeNameList; 

	}
	isName (string, filter) {
		var femaleNames = this.getFemaleChars(),  
			  maleNames = this.getMaleChars(); 

		if (femaleNames[string] || maleNames[string]) {
			return true; 
		}
		else {
			return false;
		}
	}
	//(string) => string
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

			if (this.isName(name)) {
				delimiter = text[i];
				break;
			}
		}

		if (delimiter !== " ") {
			this.delimiter = delimiter;
		}

		
	}

	setNameVariations () {
		this.maleChars.setNames();
		this.femaleChars.setNames();
	}

	//(string) => boolean
	isFemaleName (line) {
		var firstWord = line.split(this.delimiter)[0].toLowerCase();

		var femaleNames = this.getFemaleChars();
		var status = false;


		if (femaleNames[firstWord]) {
			status = true;
		}
		return status;
	}
}



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

//(string) => boolean || obj
function checkNextSpeaker (lastSpeaker, index, arr) {
	var nextSpeaker,
		currLine, 
		i = index+1,
		longest = longestCharName();


	while (!nextSpeaker || nextSpeaker === lastSpeaker) {
		currLine = arr[i]; 
		
		if (0 < currLine.length && currLine.length <= longest.length) {
			nextSpeaker = currLine;
			currLine = arr[i+1];			
		}
		i++;
	}

	if (!isFemaleName(nextSpeaker)) {
		return false; 
	}

	else {
		return {
			nextSpeaker: nextSpeaker,
			index: i+1,
			line: currLine
		}
	}
	// console.log("next",i, nextSpeaker, arr[i] );
}


///(string) => boolean
function checkScript (title, list, list2) {
	var url = rootURl+title+".html",
		Movie = new Cast(list, list2);

	Movie.setNameVariations();

	checkIMSDB (url)
	.then(function(text) {
		Movie.findDelimiter(text);
		var	lines = text.split("\n"); 
		return lines;

	}).then(lines => {
		var line;
	
		for (let i = 0; i < lines.length; i++) {
			line = lines[i];
			
			if (Movie.isFemaleName(line)) {
					console.log(green(line));
		// 		var firstSpeaker = new Line(line, lines[i+1], i);
		// 		//console.log(firstSpeaker);
				break; 
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


// var heavenly_creatures = checkScript ("Heavenly-Creatures", ["Dr. Henry Hulme", "Herbert Rieper", "Bill Perry"], ["JULIET HULME", "PAULINE RIEPER", "HONORA"])
var aladin = checkScript ("Aladdin", ["PEDDLar", "jafar", "aladdin"], ["Jasmine"]);

//console.log(heavenly_creatures);
console.log(aladin);

//heavenly_creatures
//http://www.imsdb.com/heavenly_creatures
	//download and read 
	//http://www.imsdb.com/scripts/Heavenly-Creatures.html




//https://sfy.ru/?script=hackers