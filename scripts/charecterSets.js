'use strict' 


const utils = require('./utils');


class charSet {
	constructor(gender, list) {
		this.gender = gender;
		this.originalNameList = list;
		this.completeNameList = {};
	}
	//add all variations of male names to object
	setNames () {
		this.originalNameList.forEach(function(name){
			var LowerCase = name.toLowerCase().replace(/['"]+/g, '');
			var sansPrefix = utils.removePrefixes(name).replace(/['"]+/g, '').trim();
			var firstName = sansPrefix.split(" ")[0].toLowerCase();
				var arr = sansPrefix.split(" ");
			var lastName = arr[arr.length-1].toLowerCase();
			
			this.completeNameList[LowerCase] = true;
			this.completeNameList[firstName] = true;
			this.completeNameList[lastName] = true;

			if (sansPrefix) {
				this.completeNameList[sansPrefix] = true; 
			}
		}, this);
	}
}


module.exports = charSet;
