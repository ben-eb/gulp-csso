'use strict';
var expect = require('chai').expect;
var gutil = require('gulp-util');
var csso = require('./index');

it('should minify css with csso', function (cb) {
    var stream = csso();

    stream.on('data', function(data) {
       expect(String(data.contents)).to.equal('h1{color:#ff0;font-size:2em}');
       cb();
    });

    stream.write(new gutil.File({
        contents: ' h1 { \
            color: yellow \
        } \
        h1 { \
            font-size: 2em \
        }'
    }));
});
