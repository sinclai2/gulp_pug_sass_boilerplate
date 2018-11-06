var gulp = require('gulp');
var pug = require('gulp-pug');
var sass = require('gulp-sass');
var plumber = require('gulp-plumber');
var browserSync = require('browser-sync').create();
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
// Compile pug files into HTML
gulp.task('pug', function () {
  return gulp.src('src/pug/**/*.pug')
    .pipe(plumber())
    .pipe(pug())
    .pipe(gulp.dest('dist'));
});

// Minify and Concat Javascript files
gulp.task('scripts', function () {
  return gulp.src('./src/js/**/*.js')
    .pipe(plumber())
    // Minify the file
    .pipe(uglify())
    .pipe(concat('scripts.js'))
    .pipe(gulp.dest('dist/js'));
});

// Compile sass files into CSS
gulp.task('sass', function () {
  return gulp.src('src/sass/**/*.scss')
    .pipe(plumber())
    .pipe(sass({
      includePaths: ['src/sass'],
      errLogToConsole: true,
      outputStyle: 'compressed',
      onError: browserSync.notify
    }))
    .pipe(gulp.dest('dist/css'))
    .pipe(browserSync.stream());
});

// Serve and watch sass/pug files for changes
gulp.task('watch', ['pug', 'sass', 'scripts'], function () {
  browserSync.init({
      server: './dist',
      browser: "google chrome",
  }),
  gulp.watch('src/js/**/*.js', ['scripts']);
  gulp.watch('src/sass/**/*.scss', ['sass']);
  gulp.watch('src/pug/*.pug', ['pug']);
  gulp.watch('dist/*.html').on('change', browserSync.reload);
});

gulp.task('default', ['watch']);
