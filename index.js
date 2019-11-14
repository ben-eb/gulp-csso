'use strict';

const csso = require('csso');
const PluginError = require('plugin-error');
const { Transform } = require('stream');
const applySourceMap = require('vinyl-sourcemaps-apply');

module.exports = function (options) {
    const stream = new Transform({ objectMode: true });

    stream._transform = function (file, encoding, cb) {
        if (file.isNull()) {
            return cb(null, file);
        }

        if (file.isStream()) {
            return cb(new PluginError('gulp-csso', 'Streaming not supported'));
        }

        if (options === undefined || typeof options === 'boolean') {
            // for backward capability
            options = {
                restructure: !options
            };
        }

        const inputFile = file.relative;
        const source = String(file.contents);
        const cssoOptions = Object.assign({
            sourceMap: Boolean(file.sourceMap),
            restructure: true,
            debug: false
        }, options, { filename: inputFile }); // filename can't be overridden

        try {
            const result = csso.minify(source, cssoOptions);

            if (result.map) {
                applySourceMap(file, result.map.toJSON());
            } else {
                file.sourceMap = null;
            }

            file.contents = new Buffer(result.css);
            cb(null, file);
        } catch(error) {
            cb(new PluginError('gulp-csso', error));
        }
    };

    return stream;
};
