gulp = require 'gulp'
nodemon = require 'gulp-nodemon'
mocha = require 'gulp-mocha'
coffeelint = require 'gulp-coffeelint'

paths =
  serverBin: './bin/flak_cannon.coffee'
  tests: './tests/**/*.coffee'
  scripts: [
    './*.coffee'
    './controllers/**/*.coffee'
    './models/**/*.coffee'
    './experiments/**/*.coffee'
    './lib/**/*.coffee'
  ]


gulp.task 'default', ['server']

gulp.task 'server', ['lint:scripts'], ->
  nodemon script: paths.serverBin, ext: 'coffee'

gulp.task 'test', ['lint:tests'], ->
  gulp.src paths.tests
  .pipe mocha()
  .once 'end', -> process.exit()

gulp.task 'lint:scripts', ->
  gulp.src paths.scripts
    .pipe coffeelint()
    .pipe coffeelint.reporter()

gulp.task 'lint:tests', ->
  gulp.src paths.tests
    .pipe coffeelint()
    .pipe coffeelint.reporter()
