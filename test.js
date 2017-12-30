'use strict';

var csso    = require('./'),
    test    = require('tape'),
    Stream  = require('stream'),
    Vinyl   = require('vinyl'),
    fs      = require('fs'),

    basestyle  = 'h1 { color: yellow; } \n h1 { font-size: 2em; }',
    optimalmin = 'h1{color:#ff0;font-size:2em}',
    nonoptimal = 'h1{color:#ff0}h1{font-size:2em}',
    sourceMapCss      = readSourceMapTestFile('css'),
    sourceMapCssMin   = readSourceMapTestFile('min.css'),
    sourceMap         = readSourceMapTestFile('map'),
    sourceMapInitial  = readSourceMapTestFile('initial.map'),
    sourceMapContinue = readSourceMapTestFile('continue.map');

function readSourceMapTestFile(ext) {
    return fs.readFileSync(__dirname + '/test/source-map.' + ext, 'utf8').trimRight();
}

function fixture (contents) {
    return new Vinyl({
        contents: contents,
        cwd: __dirname,
        base: __dirname,
        path: __dirname + '/test.css'
    });
}

function sourceMapFixture (contents, sourceMap) {
    var file = new Vinyl({
        contents: new Buffer(contents),
        cwd: __dirname,
        base: __dirname,
        path: __dirname + '/test.css',
    });
    file.sourceMap = sourceMap;
    return file;
}

test('should minify css with csso, performing structural optimisation', function (t) {
    t.plan(1);

    var stream = csso();

    stream.on('data', function (file) {
        t.equal(String(file.contents), optimalmin);
    });

    stream.write(fixture(new Buffer(basestyle)));
});

test('should minify css with csso, performing structural optimisation when options is `false` (backward compatibility)', function (t) {
    t.plan(1);

    var stream = csso(false);

    stream.on('data', function (file) {
        t.equal(String(file.contents), optimalmin);
    });

    stream.write(fixture(new Buffer(basestyle)));
});

test('should minify css with csso, with no structural optimisation', function (t) {
    t.plan(1);

    var stream = csso({ restructure: false });

    stream.on('data', function (file) {
        t.equal(String(file.contents), nonoptimal);
    });

    stream.write(fixture(new Buffer(basestyle)));
});

test('should minify css with csso, with no structural optimisation when options is `true` (backward compatibility)', function (t) {
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

    var file = fixture(new Stream.Readable());

    var write = function () {
        stream.write(file);
        file.contents.write(basestyle);
        file.contents.end();
    };

    t.throws(write, 'should not support streaming contents');
});

// source maps
test('should generate source map when sourceMap is true', function (t) {
    t.plan(2);

    var stream = csso({ sourceMap: true });

    stream.on('data', function (file) {
        t.equal(String(file.contents), sourceMapCssMin);
        t.deepEqual(file.sourceMap, JSON.parse(sourceMapInitial));
    });

    stream.write(sourceMapFixture(
        sourceMapCss
    ));
});

test('should generate source map when file has source map', function (t) {
    t.plan(2);

    var stream = csso();

    stream.on('data', function (file) {
        t.equal(String(file.contents), sourceMapCssMin);
        t.deepEqual(file.sourceMap, JSON.parse(sourceMapContinue));
    });

    stream.write(sourceMapFixture(
        sourceMapCss,
        sourceMap
    ));
});

test('should not generate source map when sourceMap setting is false', function (t) {
    t.plan(2);

    var stream = csso({ sourceMap: false });

    stream.on('data', function (file) {
        t.equal(String(file.contents), sourceMapCssMin);
        t.equal(file.sourceMap, null);
    });

    stream.write(sourceMapFixture(
        sourceMapCss,
        sourceMap
    ));
});
