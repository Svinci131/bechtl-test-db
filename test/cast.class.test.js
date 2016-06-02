'use strict'
const chai = require('chai')
const spies = require('chai-spies');

chai.use(spies);

const should = chai.should();
const expect = chai.expect;
const Movie = require ('../scripts/scriptScrapper/movie');
const aladdin = new Movie ("Aladdin", [["PEDDLar", 'prince','SULTAN', "jafar", "aladdin"], ["Jasmine"]]);
const avengers = new Movie ("Avengers,-The-(2012)", [["AGENT PHIL COULSON", "NICK FURY", "LOKI"], ["AGENT MARIA HILL", "NATASHA"]]);

describe('isName', function () {
	beforeEach(function() {
        aladdin.cast.setNameVariations();
    });
	it('returns true if its a male chars name', function () {
		expect(aladdin.cast.isName('SULTAN')).to.be.true;
	});
	it('returns false if its a female chars name', function () {
		expect(aladdin.cast.isName('Jasmine')).to.be.true;
	});
	it('returns false if its neither', function () {
		expect(aladdin.cast.isName('fdsafdsa')).to.be.false;
	});
});

describe('isFemaleName', function () {
	beforeEach(function() {
        avengers.cast.setNameVariations();
    });
	it('returns false if its a male chars name', function () {
		expect(avengers.cast.isFemaleName('Loki')).to.be.false;
	});
	it('returns false if its a female chars name', function () {
		expect(avengers.cast.isFemaleName("AGENT MARIA HILL")).to.be.true;
	});
	it('returns false if its neither', function () {
		expect(avengers.cast.isFemaleName('fdsafdsa')).to.be.false;
	});
});


