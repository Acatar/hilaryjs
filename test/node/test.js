/*jslint node: true*/
/*globals describe, it*/
var Hilary  = require('../../index.js'),
    scope = new Hilary(),
    spec = {
        describe: describe,
        it: it,
        expect: require('chai').expect
    };

require('./hilaryIoCFixture').test(Hilary, spec);
