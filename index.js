/* jshint node:true */

'use strict';

var map  = require('event-stream').map,
    csso = require('csso');

module.exports = function() {
    // Use csso(true) to turn structure minimization off.
    var optimise = (arguments.length > 0) ? arguments[0] : false;
    return map(function(file, cb) {
        file.contents = new Buffer(csso.justDoIt(String(file.contents), optimise));
        cb(null, file);
    });
};
