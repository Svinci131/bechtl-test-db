'use strict' 

function removePrefixes (string) {
	return string.replace(/Dr.|Mr.| Sir | Lord | Agent | Judge/, ""); 
}

//(string) => boolean
function isCap (string) { 
	if (string.length === '') return false;
	var regexp = /[A-Z]/g;
	string = string.trim();
	var matches_array = string.match(regexp) || [];
	return matches_array.length === string.length;
}

function getLongest (arr) {
	return arr.sort(function (a, b) { return b.length - a.length; })[0];
}

module.exports = {
	removePrefixes: removePrefixes, 
	isCap: isCap, 
	getLongest: getLongest
}