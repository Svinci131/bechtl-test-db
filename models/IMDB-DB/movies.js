var Sequelize = require ("Sequelize");
var db = require('./_db');

var Movie = db.define("title", {
	id: {
		type: Sequelize.INTEGER, 
		primaryKey: true
	}, 
	title: {
		type: Sequelize.STRING
	}, 
	kind_id: {
		type: Sequelize.INTEGER,
	}, 
	production_year: {
		type: Sequelize.INTEGER,
		allowNull: true
	}
	}, {
		timestamps: false,
		paranoid: true,
		freezeTableName: true,
		underscored: true,
		tableName: 'title', 
		classMethods: {
			narrowedSearch: function () {
				return Movie.findAll(
					{
					attributes: ['title', 'id', 'production_year'],
					where: {
						kind_id: 1, 
						id: {$lt: 10}
					}
				}); 
			},
			searchResults: function (title) {
				start = title.split(":")[0];
				return Movie.findAll(
					{
					attributes: ['title', 'id', 'production_year'],
					where: {
						kind_id: 1, 
						$or: [
							{title: title}, 
							{title: start}
						]
					}
				})
				.then(function(results){
					return new Promise(function(resolve, reject) {
						var array = results.map(function(item){
						return item.title+", "+item.production_year;
						});

						if (array.length === 0) resolve(array);
						else reject("no results found");
					});
				});
			}
		}
	});

module.exports = Movie;
