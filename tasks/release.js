'use strict';

var git = require('gulp-git');
var ghPages = require('gulp-gh-pages');

// Task: release
// add tag then publish to npm and push to git
module.exports = function(gulp, config) {
  gulp.task('publish:tag', function(done) {
    var pkg = require('./package.json');
    var v = 'v' + pkg.version;
    var message = 'Release ' + v;

    git.tag(v, message, function(err) {
      if (err) {
        throw err;
      }

      git.push('origin', config.release.branch || 'master', function(err) {
        if (err) {
          throw err;
        }
        done();
      });
    });
  });

  gulp.task('publish:npm', function(done) {
    require('child_process')
      .spawn('npm', ['publish'], {stdio: 'inherit'})
      .on('close', done);
  });

  var releaseTasks = ['publish:tag', 'publish:npm'];

  if (config.example) {
    gulp.task('publish:examples', ['build:examples'], function() {
      return gulp.src(config.example.dist + '/**/*')
        .pipe(ghPages());
    });

    releaseTasks.push('publish:examples');
  }

  gulp.task('release', releaseTasks);
};
