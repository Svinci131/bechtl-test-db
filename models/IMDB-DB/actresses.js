var Sequelize = require ("Sequelize");
var db = require('./_db');

var Actress = db.define(
	"name", {
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
		tableName: 'name'
	}); 


module.exports = Actress; 
// name_pcode_cf
// name_pcode_nf
// surname_pcode