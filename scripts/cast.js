'use strict'

const charSet = require('./charecterSets');
const utils = require('./utils');
const Line = require('./line').Line;


class Cast  {

	constructor (maleList, femaleList) {
		this.delimiter; 
		this.maleChars = new charSet ("male", maleList);
		this.femaleChars = new charSet ("female", femaleList);
		this.all = this.maleChars.originalNameList.concat(this.femaleChars.originalNameList);
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
	setNameVariations () {
		this.maleChars.setNames();
		this.femaleChars.setNames();
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
			// return delimiter
			this.delimiter = delimiter;
		}
		else {
			this.delimiter = "\n"
		}
		
	}


	getNextSpeaker (prevLine, arr) {
		var nextSpeaker,
			nextLine, 
			nextLineIndex = prevLine.index+2;
		
		while (!nextSpeaker || nextSpeaker === prevLine.speaker) {
		

			if (arr[nextLineIndex]) {

				nextLine = arr[nextLineIndex]; 

				if (this.isName(nextLine.toLowerCase().trim())) {
					nextSpeaker = nextLine;
				}
			}

			nextLineIndex++;
		}
		var nextLine = new Line(nextSpeaker, arr[nextLineIndex], nextLineIndex);
		return nextLine;
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

module.exports = Cast;
