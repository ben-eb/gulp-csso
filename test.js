/* jshint node: true */
/* global describe, it */

'use strict';

var expect     = require('chai').expect,
    gutil      = require('gulp-util'),
    csso       = require('./index'),
    Stream     = require('stream'),
    es         = require('event-stream'),
    basestyle  = 'h1 { color: yellow; } \n h1 { font-size: 2em; }',
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

    it('should minify css with csso, with no structural optimisation', function(cb) {
        var stream = csso(true);

        stream.on('data', function(data) {
            expect(String(data.contents)).to.equal(nonoptimal);
            cb();
        });

        stream.write(new gutil.File({
            contents: new Buffer(basestyle)
        }));
    });

    it('in stream mode must emit an error', function(cb) {
        var stream = csso();
        var fakeFile = new gutil.File({
            contents: new Stream()
        });

        var doWrite = function() {
            stream.write(fakeFile);
            fakeFile.contents.write(basestyle);
            fakeFile.contents.end();
        };

        expect(doWrite).to.throw(/Streaming not supported/);
        cb();
    });

    it('should let null files pass through', function(cb) {
        var stream = csso(),
            n = 0;
        stream.pipe(es.through(function(file) {
            expect(file.path).to.equal('bibabelula.md');
            expect(file.contents).to.equal(null);
            n++;
        }, function() {
            expect(n).to.equal(1);
            cb();
        }));
        stream.write(new gutil.File({
            path: 'bibabelula.md',
            contents: null
        }));
        stream.end();
    });
});
