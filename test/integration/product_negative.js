'use strict';

let chai = require('chai');
chai.should();
let sinon = require('sinon');
let hippie = require('hippie');
let request = require('request');
let assert = require('assert');
let AppServer = require('../../bin/app/server');

describe('Get Product List Negative Test', () => {
  let appServer = null;

  before(() => {
    this.get = sinon.stub(request, 'get');
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

  it('Should fail return list product', (done) => {
    const res = {
      'statusCode': 404,
      'headers': {
        'content-type': 'application/json'
      }
    };
    this.get.yields(null, res,
      {
        'code': 'ResourceNotFound',
        'message': '/api/product does not exist'
      });
    request.get('http://localhost:9000/api/product',
      {'auth': {'user': 'telkom', 'pass': 'da1c25d8-37c8-41b1-afe2-42dd4825bfea', 'sendImmediately': false}}, (error, response, body) => {
        assert.equal(response.statusCode, 404);
        assert.equal(body.code, 'ResourceNotFound');
        done();
      });
  });
});
