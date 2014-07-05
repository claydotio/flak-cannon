var gulp = require('gulp')
var coffee = require('gulp-coffee')
var watch = require('gulp-watch')
var sourcemaps = require('gulp-sourcemaps')

gulp.task('client-scripts', function () {
  return gulp.src('client/coffee/*.coffee')
    .pipe(sourcemaps.init())
    .pipe(coffee().on('error', console.log))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('client/js/'))
})

gulp.task('watch', function () {
  gulp.watch('client/coffee/*.coffee', ['client-scripts'])
})

gulp.task('client', ['client-scripts', 'watch'])
