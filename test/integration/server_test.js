const request = require('supertest');
const AppServer = require('../../bin/app/server');

describe('App', function () {
  let appServer = null;   
  
  beforeEach(function () {
    appServer = new AppServer();
    this.server = appServer.server;
  });

  afterEach(function () {
    this.server.close();
  });

  it('Should return 200 for "/"', function (done) {
    request(this.server)
      .get('/')
      .expect(200)
      .end(done);
  });

  // it('Should return error for "/api/penjualan/post"', function (done) {
  //   request(this.server)
  //     .post('/api/penjualan/post')
  //     .expect(401)
  //     .end(done);
  // });

//   it('Should handler error', function (done) {
//     request(this.server)
//       .get('/error')
//       .expect(500)
//       .end(done);
//   });
});
