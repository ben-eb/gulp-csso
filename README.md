# [gulp](https://github.com/wearefractal/gulp)-csso [![Build Status](https://travis-ci.org/ben-eb/gulp-csso.png?branch=master)](https://travis-ci.org/ben-eb/gulp-csso) [![NPM version](https://badge.fury.io/js/gulp-csso.png)](http://badge.fury.io/js/gulp-csso) [![Dependency Status](https://gemnasium.com/ben-eb/gulp-csso.png)](https://gemnasium.com/ben-eb/gulp-csso)

> Minify CSS with [CSSO](https://npmjs.org/package/csso).

## Installation

Install via [npm](https://npmjs.org/package/gulp-csso):

```
npm install gulp-csso --save-dev
```

## Example

```
var gulp = require('gulp');
var csso = require('gulp-csso');

gulp.task('default', function() {
    gulp.src('./main.css')
        .pipe(csso())
        .pipe(gulp.dest('./out'));
});
```

Optionally, pass `true` to the task (`pipe(csso(true))`) to turn structure minimization off.
