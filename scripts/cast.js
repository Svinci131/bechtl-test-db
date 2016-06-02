'use strict'

const charSet = require('./charecterSets');
const utils = require('./utils');
const Line = require('./line').Line;


class Cast  {

	constructor (maleList, femaleList) {
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
