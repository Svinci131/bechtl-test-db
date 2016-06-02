'use strict'

class Line {
	constructor(speaker, line, index) {
		this.name = speaker; 
		this.line = line;
		this.index = index;
	}
	getNextSpeaker (movie, arr) {
		var nextSpeaker,
			nextLine, 
			nextLineIndex = this.index+2;
			
		while (!nextSpeaker || nextSpeaker === this.name) {
			nextLine = arr[nextLineIndex]; 
		
			if (movie.isName(nextLine)) {
				// console.log(nextLine, movie.isName(nextLine))
				nextSpeaker = nextLine;
			}
			nextLineIndex++
		}

	}
}

module.exports = Line;

//Name, Line, index (text);

// //(string) => boolean || obj
// function checkNextSpeaker (lastSpeaker, text) {
// 	var nextSpeaker,
// 		currLine, 
// 		i = index+1,
// 		longest = longestCharName();


// 	while (!nextSpeaker || nextSpeaker === lastSpeaker) {
// 		currLine = arr[i]; 
		
// 		if (isName(currLine)) {
// 			nextSpeaker = currLine;
// 		}
// 		// if (0 < currLine.length && currLine.length <= longest.length) {
// 		// 	nextSpeaker = currLine;
// 		// 	currLine = arr[i+1];			
// 		// }
// 		i++;
// 	}

// 	console.log(nextSpeaker);

// 	if (!isFemaleName(nextSpeaker)) {
// 		return false; 
// 	}

// 	else {
// 		return {
// 			nextSpeaker: nextSpeaker,
// 			index: i+1,
// 			line: currLine
// 		}
// 	}
// 	// console.log("next",i, nextSpeaker, arr[i] );
// }