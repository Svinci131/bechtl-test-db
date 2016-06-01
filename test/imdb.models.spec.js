// 'use strict';
const chalk = require('chalk');
const red = chalk.red;	
const imdbModel = require("../models/IMDB-DB");
const Actress = imdbModel.Actress;
const Movie = imdbModel.Movie;
const CharName = imdbModel.CharName;
const CastInfo = imdbModel.CastInfo;
const expect = require('chai').expect;

//user searches for movie
describe('basic movie search', function () {
  it('movies has class method that gets all movie titles', function (done) {
  	Movie.narrowedSearch()
		.then(function(results){
			console.log(chalk.blue(results));
		  	expect(results[0]).to.have.property('title');
		  	done();
	 	}).catch(function(err){
	  		// console.log(red(err));
	  		done();
	  	});
 	});
   it('movies has class method that gets an array of matches for a specific title from narrowed results', function (done) {
  	Movie.searchResults("Up")
		.then(function(array){
			console.log(chalk.blue(array));
		  	expect(array).to.have.length.of.at.least(1);
		  	done();
	 	}).catch(function(err){
	  		console.log(red(err));
	  		done();
	  	});
 	});
    it('searchResults gets results with and wo subliners', function (done) {
  	Movie.searchResults("The Lord of the Rings: The Fellowship of the Ring")
		.then(function(array){
		  	expect(array).to.be.an('array');
		  	//console.log(chalk.green(array));
		  	expect(array).to.have.length.of.at.least(2);
		  	done();
	 	}).catch(function(err){
	 		//console.log(red(err));
	 		done();
	  	});
 	});
 	it('handles erros and loads message', function (done) {
  	Movie.searchResults("Tfdsafdsa")
		.then(function(array){
			console.log(chalk.blue(array));
			done();
	 	}).catch(function(err){
	 		expect(err).to.equal("no results found");
	 		//console.log(red(err));
	  		done();
	  	});
 	});
	 	
});


// describe("sampleSearch", function() {

// 	describe("get movie id", function() {
// 		//243892
// 		it('it finds the id for Mary Poppins"', function (done) {
// 			Movie.findAll({
// 				where: {title: "Mary Poppins", 
// 						kind_id: 1}
// 			})
// 			.then(function(result){
// 				// console.log(result);
// 				done();
// 			})
// 			.catch(function(err){
// 				done();
// 			});
// 		});
// 	});

// 	describe('person to roles to movies', function () {
// 		//243892 and finds a list of the role ids and actor ids from that movie (we only have actress data, so golden)
// 		it('it takes a person and finds all the movies they have been in "', function (done) {
// 			var JulieAndrewsRoles;

// 			CastInfo.findAll({
// 				where: {
// 						//julie andrews id
// 						person_id: 33373
// 				}
// 			}).then(function(roles){
// 				return roles.map(function(role){
// 					return  Movie.findOne ({
// 						where: { id: role.movie_id }
// 					});

// 				});
// 			})
// 			.then (function(arrayOfSearches){

// 				Promise.all(arrayOfSearches)
// 				.then(function(arrayOfJAMovies){
// 					// console.log(arrayOfJAMovies);
// 					arrayOfJAMovies.forEach(function(jAMovie){
// 						//console.log("here", jAMovie.title);
// 					});
// 				});
// 				done();
// 			}).catch(function(err){
// 				console.log(err);
// 				done();
// 			});
// 		});
// 	});



// 	xdescribe('find all the actors in a movie', function () {
// 		//243892 and finds a list of the role ids and actor ids from that movie (we only have actress data, so golden)
// 		it('movie to roles to person"', function (done) {
// 			var actressesByMovieId;
// 			CastInfo.findAll ({
// 				where: { movie_id: 243892 }
// 			})
// 			.then(function(roles){
// 				return roles.map(function(role) {
// 					console.log(role.person_id);
// 					return  Actress.findOne ({
// 						where: { id: role.person_id }
// 					});
// 					// console.log("female charecters in Mary Poppins:", char.)
// 				});
// 			})
// 			.then(function(arrayOfSearches){
// 				Promise.all(arrayOfSearches)
// 				.then(function(arrayOfActressIds){
// 					arrayOfActressIds.forEach(function(actress){
// 					 console.log("actresses", actress.name, actress.id);
// 					});
// 				});
// 				done();
// 			}).catch(function(err){
// 				console.log(err);
// 				done();
// 			});
// 		});
// 	});


// 	describe('movie to role to CharName', function() {
// 		it('movie to role to CharName', function (done) {
// 			var actressesByMovieId;
// 			CastInfo.findAll ({
// 				//movie id 
// 				where: { movie_id: 243892 }
// 			})
// 			.then(function(roles){
// 				return roles.map(function(role) {
// 					console.log("actress id:", role.person_id, "role id", role.id, "person_role_id", role.person_role_id);
// 					return  CharName.findOne ({
// 						where: { id: role.id}
// 					});
// 					// console.log("female charecters in Mary Poppins:", char.)
// 				});
// 			})
// 			.then(function(arrayOfSearches){
// 				Promise.all(arrayOfSearches)
// 				.then(function(arrayOfRoleIds){
// 					arrayOfRoleIds.forEach(function(character){
// 					//console.log("characters", character.id, character.name);
// 					});
// 				});
// 				done();
// 			}).catch(function(err){
// 				console.log(err);
// 				done();
// 			});
// 		});
// 	});
// });

//roles
// id: 50543, name: 'Julie Andrews'


//actress info Julie Andrews 
// 33373	Andrews, Julie	I		f	A5362	J4536		fa24729b869181bead6e3d18ac9af0fc
// 33374	Andrews, Julie	IV		f	A5362	J4536		b0232ec2ab8bc8271b86d4b4bcd9708a
// 33375	Andrews, Julie D.			f	A5362	J4353		28502729873cf0fdabd21c7d043eddeawhere: {
			// 	$and: [ {name_pcode_cf: "A5362"}, 
			// 			{name_pcode_nf: "J4536"} ]
			// }