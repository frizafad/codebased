'use strict';

let chai  = require('chai');
chai.should();
let sinon = require('sinon');
let hippie = require('hippie');
let request = require('request');
let AppServer = require('../../bin/app/server');

describe('Get Product List', () => {
  
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
  
    it('Should return list product', (done) => {      
      const res = {
        "statusCode": 200,
        "headers": {
          "content-type": "application/json"
        }
      }
      this.get.yields(null, res, 
        {
            "success": true,
            "data": [
                {
                    "id": 1,
                    "name": "Alif Septian Nurdianto 123",
                    "image": "https://s3-ap-southeast-1.amazonaws.com/telkomdev/photo/fashion/sepatu.jpg",
                    "category": "Fashion"
                },
                {
                    "id": 2,
                    "name": "Bentar Septian",
                    "image": "https://s3-ap-southeast-1.amazonaws.com/telkomdev/photo/Bentar.jpeg",
                    "category": "Electronic"
                },
                {
                    "id": 3,
                    "name": "Rony Setyawan",
                    "image": "https://s3-ap-southeast-1.amazonaws.com/telkomdev/photo/Rony.jpeg",
                    "category": "Sports"
                }
            ],
            "message": "Get Product List",
            "code": 200
        });
      request.get('http://localhost:9000/api/products',
      {'auth':{'user':'telkom', 'pass':'da1c25d8-37c8-41b1-afe2-42dd4825bfea', 'sendImmediately': false}},(error, response, body) => {
        body.success.should.eql(true);
        body.data.length.should.eql(3);
        body.code.should.eql(200);
        done();
      });
    });
  
  });

  describe('Get Product Detail', () => {
    
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
    
      it('Should return detail product', (done) => {      
        const res = {
          "statusCode": 200,
          "headers": {
            "content-type": "application/json"
          }
        }
        this.get.yields(null, res, 
          {
              "success": true,
              "data": {
                "id":1,
                "name":"Alif Septian Nurdianto",
                "image":"https://s3-ap-southeast-1.amazonaws.com/telkomdev/photo/Alif.jpg",
                "price":12000,
                "stock":5,
                "description":"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                "category":"Fashion"
            },
              "message": "Get Product List",
              "code": 200
          });
        request.get('http://localhost:9000/api/detail-product/1',
        {'auth':{'user':'telkom', 'pass':'da1c25d8-37c8-41b1-afe2-42dd4825bfea', 'sendImmediately': false}},(error, response, body) => {
          body.success.should.eql(true);
          body.data.id.should.eql(1);
          body.code.should.eql(200);
          done();
        });
      });
    
    });