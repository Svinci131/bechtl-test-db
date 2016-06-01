var Sequelize = require ("Sequelize");
var db = require('./_db');


var char_name = db.define(
	"char_name", {
	id: {
		type: Sequelize.INTEGER, 
		primaryKey: true
	}, 
	name: { 
		type: Sequelize.STRING
	}
	}, {
		timestamps: false,
		paranoid: true,
		freezeTableName: true,
		underscored: true,
		tableName: 'char_name'
	}); 



var cast_info = db.define(
	"cast_info", 
	{
		id: {
			type: Sequelize.INTEGER, 
			primaryKey: true
		}, 
		person_id: { type: Sequelize.INTEGER }, 
		movie_id: { type: Sequelize.INTEGER }, 
	}, 
	{
		timestamps: false,
		paranoid: true,
		freezeTableName: true,
		underscored: true,
		tableName: 'cast_info'
});

// name_pcode_cf
// name_pcode_nf
// surname_pcode

module.exports = {
	char_name: char_name, 
	cast_info: cast_info
};