'use strict'
const chai = require('chai')
const spies = require('chai-spies');

chai.use(spies);

const should = chai.should();
const expect = chai.expect;

const checkScript = require ('../scripts/scriptScrapper');
const heavenly_creatures = checkScript ("Heavenly-Creatures", ["Dr. Henry Hulme", "Herbert Rieper", "Bill Perry"], ["JULIET HULME", "PAULINE RIEPER", "HONORA"])
const aladdin = checkScript ("Aladdin", ["PEDDLar", 'prince','SULTAN', "jafar", "aladdin"], ["Jasmine"]);
const avengers = checkScript("Avengers,-The-(2012)", ["AGENT PHIL COULSON", "NICK FURY", "LOKI"], ["AGENT MARIA HILL", "NATASHA"]);





describe('checkScript', function () {
	it('returns a false for movies with only one female charecter', function () {
		aladdin.then(bool => {
			expect(bool).to.equal(false);
		});
	});
	it ("return true for movies that pass", function (){
		heavenly_creatures.then(bool => {
			expect(bool).to.equal(false);
		});
	});
	it ("returns false for movies with mult female characters that never speak to eachother", function (){
		avengers.then(bool => {
			expect(bool).to.equal(false);
		});
	});
});

//download
//Read script 
//check delete; 




// console.log(checkSubject("I like your books"));
// console.log(checkSubject("I like Herbert"));
// console.log(checkSubject("How is your brother"));

//  findNameDelimiter (text) {
// //PEDDLER:    Oh I come from a land
//     From a faraway place
//     Where the caravan camels roam
//     Where they cut off your ear /Where it's flat and immense
//     If they do

// //PAULINE
// Mummy!