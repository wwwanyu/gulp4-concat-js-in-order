const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const order = require('gulp-order');

function js(){
  return gulp.src('src/**/*.js')
    .pipe(order([
      'vendor/z.js',
      'vendor/a.js',
      'js/myscript.js'
    ], { base: './' }))
    .pipe(concat('all.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./dist/js'))
    .pipe(browserSync.stream());
}

function watch(){
  browserSync.init({
    server: {
      baseDir: './dist'
    }
  });
  gulp.watch('./src/**/*.js', js);
  gulp.watch("**/*").on('change', browserSync.reload);
}

exports.js = js;
exports.watch = watch;
