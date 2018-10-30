'use strict';

//let chai  = require('chai');
//let expect = chai.expect;
//let sinon = require('sinon');
//let hippie = require('hippie');
//let request = require('request');
//let AppServer = require('../bin/app/server');
//const chaiHttp = require('chai-http');
//chai.should();
//const should = chai.should();
//const expect = chai.expect;

//let tv = require('./test_values');

/*describe('Read profile operations', () => {

  let appServer = null;

  before(() => {
    sinon.stub(request, 'get').yields(null, null, JSON.stringify({elements:[{ userid: 'USR000000000005',
      firstname: 'Rony',
      lastname: 'Setyawan',
      email: 'rony@yahoo.com',
      birthdate: '5/11/1982 12:00:00 AM',
      gender: 'M',
      mobile: '082124606606' }]}));
  });

  after(() => {
    request.get.restore();
  });

  beforeEach(() => {
    appServer = new AppServer();

  });

  afterEach(() => {
    appServer = null;
  });

  it('Should return valid profile when auth token is valid', done => {
    hippie(appServer.server)
      .header('authorization', 'Bearer ' + tv.UNLIMITED_TOKEN)
      .form()
      .json()
      .get('/api/v1/profile')
      .expectStatus(200)
      .end((err, res, body) => {
        if(err){
          throw err;
        }
        let email = body.data.email;
        email.should.be.equal(tv.VALID_EMAIL);
        done();
      });
  });

  it('Should fail return valid profile when auth token is expired', done => {
    hippie(appServer.server)
      .header('authorization', 'Bearer ' + tv.LIMITED_TOKEN)
      .form()
      .json()
      .get('/api/v1/profile')
      .expectStatus(401)
      .end((err, res, body) => {
        if(err){
          throw err;
        }
        done();
      });
  });

  it('Should fail return valid profile when auth token not provided', done => {
    hippie(appServer.server)
      .form()
      .json()
      .get('/api/profile')
      .expectStatus(403)
      .end((err, res, body) => {
        if(err){
          throw err;
        }
        done();
      });
  });
});*/


const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should;
const expect = chai.expect;

chai.use(chaiHttp);
/*
/*const mochaAsync = (fn) => {
    return async (done) => {
        try {
            await fn();
            done();
        } catch (err) {
            done(err);
        }
    };
};

it("Sample async/await mocha test using wrapper", mochaAsync(async () => {
    var x = await someAsyncMethodToTest();
    expect(x).to.equal(true);
}));*/

/*beforeEach(mochaAsync(async () => {
    await someLongSetupCode();
}));*/
describe('/', function() {
    it('should give response on / GET', function(done) {
        chai.request('http://localhost:9000')
          .get('/')
          .end(function(err,res){
            //console.log(res);
            //expect(res).to.be.an('ob');
            //chai.should().exist(res.body);
            //expect(res).to.have.deep.property('data');

            //expect(res).to.have.deep.property('code',200);
            done();
          });
      });
    //it('should list ALL blobs on /blobs GET');
    //it('should list a SINGLE blob on /blob/<id> GET');
    //it('should add a SINGLE blob on /blobs POST');
    //it('should update a SINGLE blob on /blob/<id> PUT');
    //it('should delete a SINGLE blob on /blob/<id> DELETE');
  });