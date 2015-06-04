'use strict';

var uglify = require('gulp-uglify');
var rename = require('gulp-rename');

// Task: uglify
module.exports = function(gulp, config) {
  gulp.task('uglify', function() {
    return gulp.src(config.uglify.src)
      .pipe(uglify(config.uglify.options))
      .pipe(rename({suffix: '.min'}))
      .pipe(gulp.dest(config.uglify.dist));
  });
};
