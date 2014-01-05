/* jshint node: true */
/* global describe, it */

'use strict';

var expect = require('chai').expect,
    gutil  = require('gulp-util'),
    csso   = require('./index');

var basestyle  = 'h1 { color: yellow; } \n h1 { font-size: 2em; }',
    optimalmin = 'h1{color:#ff0;font-size:2em}',
    nonoptimal = 'h1{color:#ff0}h1{font-size:2em}';

describe('gulp-csso', function() {
    it('should minify css with csso, performing structural optimisation', function (cb) {
        var stream = csso();

        stream.on('data', function(data) {
            expect(String(data.contents)).to.equal(optimalmin);
            cb();
        });

        stream.write(new gutil.File({
            contents: new Buffer(basestyle)
        }));
    });
    it('should minify css with csso, with no structural optimisation', function (cb) {
        var stream = csso(true);

        stream.on('data', function(data) {
            expect(String(data.contents)).to.equal(nonoptimal);
            cb();
        });

        stream.write(new gutil.File({
            contents: new Buffer(basestyle)
        }));
    });
});
