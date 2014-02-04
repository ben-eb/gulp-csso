# [gulp](https://github.com/wearefractal/gulp)-csso [![Build Status](https://travis-ci.org/ben-eb/gulp-csso.png?branch=master)](https://travis-ci.org/ben-eb/gulp-csso) [![NPM version](https://badge.fury.io/js/gulp-csso.png)](http://badge.fury.io/js/gulp-csso) [![Dependency Status](https://gemnasium.com/ben-eb/gulp-csso.png)](https://gemnasium.com/ben-eb/gulp-csso)

> Minify CSS with [CSSO](https://npmjs.org/package/csso).

*If you have any difficulties with the output of this plugin, please use the [CSSO tracker](https://github.com/css/csso/issues).*

## Installation

Install via [npm](https://npmjs.org/package/gulp-csso):

```
npm install gulp-csso --save-dev
```

## Example

```js
var gulp = require('gulp');
var csso = require('gulp-csso');

gulp.task('default', function() {
    return gulp.src('./main.css')
        .pipe(csso())
        .pipe(gulp.dest('./out'));
});
```

## API

### csso(false) *or* csso()

The default is to use structure minimization for maximum compression. See [the CSSO description](http://bem.info/tools/optimizers/csso/description/) for more information.

### csso(true)

Pass true instead if you want to disable this feature.
