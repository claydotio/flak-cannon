var api = require('./')
var request = require('supertest')
var app = api()

app.listen(3001, 'localhost')

describe('GET /users', function(){
  it('respond with json', function(done){
    request('http://localhost:3001')
      .post('/users')
      .send({
        "info": {
          "ip": "1.2.3.4",
          "platform": "android",
          "device": "mobile"
        }
      })
      .set('Accept', 'application/json')
      //.expect('Content-Type', /json/)
      .expect(200, done);
  })
})
