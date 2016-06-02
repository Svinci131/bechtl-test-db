var Sequelize = require ("Sequelize");
var db = require('./_db');

var Character = db.define("movie", {
	name: {
		type: Sequelize.STRING
	}, 
	gender: {
		type: Sequelize.STRING,
	}
});

module.exports = Character; 