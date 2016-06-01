var Sequelize = require ("Sequelize");
var db = new Sequelize('postgres://localhost:5432/imdb', {
    dialect: 'postgres', 
    logging: false
});

module.exports = db; 


// var Sequelize = require('sequelize');

// var config = {
//   "username": "samanthavinci",
//   "password": "",
//   "database": "tripplanner",
//   "host": "127.0.0.1",
//   "dialect": "postgres",
//   "logging": false
// }

// var db = new Sequelize(config.database, config.username, config.password, config);

// module.exports = db;