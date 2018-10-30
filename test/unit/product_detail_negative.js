'use strict';

let sinon = require('sinon');
let request = require('request');
let assert = require('assert');
let query = require('../../bin/modules/product/repositories/queries/query');
let domain = require('../../bin/modules/product/repositories/queries/domain');

describe('View Product Detail Negative Test', () => {
  let obj = {
    err: 'Data Not Found',
    data: null,
    code: 404,
    message: 'Please Try Another Input'
  };

  before(() => {
    sinon.stub(query, 'findOneProduct').returns(obj);
  });

  after(() => {
    query.findOneProduct.restore();
  });

  it('Should fail return product detail', async () => {
    let product = new domain();
    let param = {id: 1};
    let rs = await product.findProductDetail(param);
    assert.equal(rs.code, 409);
    assert.equal(rs.data, null);
    assert.notEqual(rs.err, null);
  });
});
