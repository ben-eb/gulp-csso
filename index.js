'use strict';

var csso        = require('csso'),
    gutil       = require('gulp-util'),
    transform   = require('stream').Transform,

    PLUGIN_NAME = 'gulp-csso';

module.exports = function (disableStructureMinimization) {
    var stream = new transform({objectMode: true});

    stream._transform = function (file, encoding, cb) {
        // Pass through if null
        if (file.isNull()) {
            stream.push(file);
            cb();
            return;
        }

        if (file.isStream()) {
            return cb(new gutil.PluginError(PLUGIN_NAME, 'Streaming not supported'));
        } else {
            var optimised = csso.minify(String(file.contents), {
                restructuring: !disableStructureMinimization
            });
            file.contents = new Buffer(optimised);
            stream.push(file);
            cb();
        }
    };

    return stream;
};
