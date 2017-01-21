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


/**
 * run the Karma server once with the given config file path.
 * @param {String} configFile karma.conf.js.
 * @param {String} cb config.
 */

function runKarma(configFile, cb) {
  karma.start({
    singleRun: true,
    configFile: path.resolve(configFile)
  }, cb);
}

gulp.task('test', (cb) => {
  runKarma('karma.conf.js', cb);
});


gulp.task('watch', ['browser-sync'], () => {
  gulp.watch('*.js', ['reload']);
  gulp.watch('css/*.css', ['reload']);
  gulp.watch('*.html').on('change', reload);
  gulp.watch('jasmine/spec/inverted-index-test.js');
});

// create a default task and just log a message
gulp.task('default', ['browser-sync', 'scripts', 'watch'], () => {});
