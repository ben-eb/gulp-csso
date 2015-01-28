/* jshint node:true */

'use strict';

var csso            = require('csso'),
    gutil           = require('gulp-util'),
    transform       = require('stream').Transform,

    PLUGIN_NAME     = 'gulp-csso';

module.exports = function (optimise) {
    var stream = new transform({ objectMode: true });

    stream._transform = function(file, unused, done) {
        // Pass through if null
        if (file.isNull()) {
            stream.push(file);
            done();
            return;
        }

        if (file.isStream()) {
            return done(new gutil.PluginError(PLUGIN_NAME, "Streaming not supported"));
        } else {
            var optimised = csso.justDoIt(String(file.contents), optimise);
            file.contents = new Buffer(optimised);
            stream.push(file);
            done();
        }
    };

    return stream;
};
