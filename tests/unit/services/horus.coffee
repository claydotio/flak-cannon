should = require('clay-chai').should()
rewire = require 'rewire'
fs = require 'fs'
Promise = require 'bluebird'

HorusService = rewire 'services/horus'
config = require 'config'

describe 'HorusService', ->
  it 'converts', ->
    # force new file creation
    conversionsFile = HorusService.__get__ 'CONVERSIONS_FILE'
    fs.unlinkSync conversionsFile
    HorusService.constructor()

    # wait for flush to disk
    Promise.delay 100
    .then ->
      res = fs.readFileSync conversionsFile, 'utf-8'
      res.should.be 'event\tuser_id\tparams+\tuniq\tip\tnamespace\tmeta+\n'

      HorusService.convert {
        event: 'signup',
        userId: '123',
        uniq: 'i_am_special',
        params: {
          abc: 'red'
          xyz: 'blue'
        }
        ip: '1.2.3.4'
        meta: {
          a: {
            b: {
              c: 'abc'
            }
            d: 'ddd'
          }
          e: 'eee'
        }
        namespace: 'project_house'
      }

      # wait for flush to disk
      Promise.delay 100
      .then ->
        res = fs.readFileSync conversionsFile, 'utf-8'
        res.split('\n')[1].should.be 'signup\t123\tabc=red xyz=blue\t' +
          'i_am_special\t1.2.3.4\tproject_house\ta.b.c=abc a.d=ddd e=eee'

        HorusService.convert {
          event: 'signup',
          userId: '123',
        }

        # wait for flush to disk
        Promise.delay 100
        .then ->
          res = fs.readFileSync conversionsFile, 'utf-8'
          res.trim().split('\n').length.should.be 3
          res.split('\n')[2].should.be 'signup\t123\t-\t-\t-\t-\t-'

  it 'throws on spaced in values', (done) ->
    try
      HorusService.convert
        meta:
          a:
            b:
              c: 'ab c'
      done(new Error 'expected error')
    catch
      done()
