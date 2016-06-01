var db = require('./_db');
var Actress = require("./actresses");
var Movie = require("./movies");
var Roles = require("./roles");

module.exports = {
	CharName: Roles.char_name, 
	CastInfo: Roles.cast_info,
	Movie: Movie, 
	Actress: Actress
};



