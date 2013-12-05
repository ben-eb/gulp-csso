var es = require('event-stream');
var csso = require('csso');

module.exports = function(){
    'use strict';
    // Use csso(true) to turn structure minimization off.
    var optimise = (arguments.length > 0) ? arguments[0] : false;
    return es.map(function(file, cb) {
        file.contents = csso.justDoIt(String(file.contents), optimise);
        cb(null, file);
    });
};
