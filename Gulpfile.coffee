gulp = require 'gulp'
nodemon = require 'gulp-nodemon'
mocha = require 'gulp-mocha'
coffeelint = require 'gulp-coffeelint'

gulp.task 'default', ->
  nodemon script: 'bin/flak_cannon.coffee', ignore: ['*.*']

gulp.task 'test', ['lint'], ->
  gulp.src './tests/**/*.coffee'
  .pipe mocha()

gulp.task 'lint', ->
  gulp.src '*.coffee'
    .pipe coffeelint()
    .pipe coffeelint.reporter()
