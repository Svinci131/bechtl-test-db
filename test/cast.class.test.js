'use strict'
const chai = require('chai')
const spies = require('chai-spies');

chai.use(spies);

const should = chai.should();
const expect = chai.expect;
const Movie = require ('../scripts/movie');
const aladdin = new Movie ("Aladdin", [["PEDDLar", 'prince','SULTAN', "jafar", "aladdin"], ["Jasmine"]]);



describe('isName', function () {

	it('returns true if its a male chars name', function () {
		aladdin.cast.setNameVariations();
		console.log("here", aladdin.cast.isName('SULTAN'));
		expect(aladdin.cast.isName('SULTAN')).to.be.true;
	});
	it('returns false if its a female chars name', function () {
		aladdin.cast.setNameVariations();
		expect(aladdin.cast.isName('Jasmine')).to.be.true;
	});
	it('returns false if its neither', function () {
		aladdin.cast.setNameVariations();
		expect(aladdin.cast.isName('fdsafdsa')).to.be.false;
	});
});