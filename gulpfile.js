/* File: gulpfile.js */

// grab our gulp packages
const gulp = require('gulp');
const bs = require('browser-sync').create();
const bsync = require('browser-sync').create();
const path = require('path');
const karma = require('karma').Server;
const browserify = require('gulp-browserify');
const rename = require('gulp-rename');

const reload = bs.reload;

gulp.task('scripts', () => {
  gulp.src('jasmine/spec/inverted-index-test.js')
    .pipe(browserify())
    .pipe(rename('bundle.js'))
    .pipe(gulp.dest('jasmine/build'));
});

gulp.task('browser-sync', () => {
  bsync.init({
    server: {
      baseDir: 'src',
      index: 'index.html'
    },
    port: 8080

  });
});

gulp.task('karma', ['scripts'], (done) => {
  karma.start({
    configFile: path.resolve('karma.conf.js'),
    singleRun: true
  }, () => {
    done();
  });
});

gulp.task('watch', ['browser-sync'], () => {
  gulp.watch('*.js', ['reload']);
  gulp.watch('css/*.css', ['reload']);
  gulp.watch('*.html').on('change', reload);
  gulp.watch('jasmine/spec/inverted-index-test.js');
});

// create a default task and just log a message
gulp.task('default', ['browser-sync', 'scripts', 'watch'], () => {});

gulp.task('test', ['karma']);
