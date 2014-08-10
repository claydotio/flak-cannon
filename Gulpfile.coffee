gulp = require 'gulp'
nodemon = require 'gulp-nodemon'
mocha = require 'gulp-mocha'
coffeelint = require 'gulp-coffeelint'

gulp.task 'default', ->
  nodemon script: 'bin/flak_cannon.coffee', ignore: ['*.*']

gulp.task 'test', ['lint'], ->

  # Add ./ to NODE_PATH for tests
  process.env.NODE_PATH += ':' + __dirname

  gulp.src './tests/**/*.coffee'
  .pipe mocha()
  .once 'end', -> process.exit()

gulp.task 'lint', ->
  gulp.src '*.coffee'
    .pipe coffeelint()
    .pipe coffeelint.reporter()
