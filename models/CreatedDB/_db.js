var Sequelize = require ("Sequelize");
var db = new Sequelize('postgres://localhost:5432/svmoviedb', {
    dialect: 'postgres', 
    logging: false
});

module.exports = db; 