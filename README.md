# gulp-csso

Run [https://npmjs.org/package/csso](csso) with Gulp, the streaming build system.

## Installation

Install via npm:

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
