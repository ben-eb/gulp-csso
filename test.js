'use strict';

var csso    = require('.'),
    test    = require('tape'),
    Stream  = require('stream'),
    gutil   = require('gulp-util'),

    basestyle  = 'h1 { color: yellow; } \n h1 { font-size: 2em; }',
    optimalmin = 'h1{color:#ff0;font-size:2em}',
    nonoptimal = 'h1{color:#ff0}h1{font-size:2em}';

function fixture (contents) {
    return new gutil.File({
        contents: contents,
        cwd: __dirname,
        base: __dirname,
        path: __dirname + '/fixture.svg'
    });
}

test('should minify css with csso, performing structural optimisation', function (t) {
    t.plan(1);

    var stream = csso();

    stream.on('data', function (file) {
        t.equal(String(file.contents), optimalmin);
    });

    stream.write(fixture(new Buffer(basestyle)));
});

test('should minify css with csso, with no structural optimisation', function (t) {
    t.plan(1);

    var stream = csso(true);

    stream.on('data', function (file) {
        t.equal(String(file.contents), nonoptimal);
    });

    stream.write(fixture(new Buffer(basestyle)));
});

test('should let null files pass through', function (t) {
    t.plan(1);

    var stream = csso();

    stream.on('data', function (data) {
        t.equal(data.contents, null, 'should not transform null in any way');
    });

    var file = fixture(null);

    stream.write(file);
});

test('should throw an error in stream mode', function (t) {
    t.plan(1);

    var stream = csso();

    var file = fixture(new Stream());

    var write = function () {
        stream.write(file);
        file.contents.write(basestyle);
        file.contents.end();
    };

    t.throws(write, 'should not support streaming contents');
});
