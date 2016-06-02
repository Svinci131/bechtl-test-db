var Sequelize = require ("Sequelize");
var db = require('./_db');

var Movie = db.define("movie", {
	title: {
		type: Sequelize.STRING
	}, 
	script: {
		type: Sequelize.TEXT,
		allowNull: true
	}, 
	year: {
		type: Sequelize.INTEGER,
	},
	passes_bechtl_test:{
		type: Sequelize.BOOLEAN,
		allowNull: true
	}

});

module.exports = movie; 