'use strict';

let sinon = require('sinon');
let assert = require('assert');
let CoreService = require('../../../../../bin/modules/CoreService/repositories/commands/domain');
let query = new CoreService();

describe('Post Data Penjualan Test', () => {
  let obj = {
    err: null,
    data: {
      total: 20,
      products: [{
        idProduct: 'test',
        value: 90,
        name: 'test',
        stock: 'test'
      }]
    },
    message: 'Your Request Has Been Processed',
    code: 200
  };

  before(() => {
    sinon.stub(query, 'postDataPenjualan').returns(obj);
  });

  after(() => {
    query.postDataPenjualan.restore();
  });

  it('Should fail post data penjualan', async () => {
    let product = new CoreService();
    let payload = {
      id: 'BRI00000011',
      startDate: 'test',
      endDate: 'test',
      stockType: 'test'
    };
    let rs = await product.postDataPenjualan(payload);
    assert.equal(rs.data.id, obj.data.idProduct);
    assert.equal(rs.code, 200);
  });
});

describe('Post Data Penjualan Negative Test', () => {
  let obj = {
    err: 'Data Not Found',
    data: null,
    code: 404,
    message: 'Please Try Another Input'
  };

  before(() => {
    sinon.stub(query, 'postDataPenjualan').returns(obj);
  });

  after(() => {
    query.postDataPenjualan.restore();
  });

  it('Should fail return product detail', async () => {
    let product = new CoreService();
    let payload = {
      id: 'test',
      startDate: 'test',
      endDate: 'test',
      stockType: 'test'
    };
    let rs = await product.postDataPenjualan(payload);
    assert.equal(rs.code, 400);
    assert.equal(rs.data, null);
    assert.notEqual(rs.err, null);
  });
});
