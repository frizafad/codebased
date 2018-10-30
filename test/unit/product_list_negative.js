'use strict';

let sinon = require('sinon');
let request = require('request');
let assert = require('assert');
let query = require('../../bin/modules/product/repositories/queries/query');
let domain = require('../../bin/modules/product/repositories/queries/domain');

describe('View Product List Negative Test', () => {
  let obj = {
    err: 'Data Not Found',
    data: null,
    code: 404,
    message: 'Please Try Another Input'
  };

  before(() => {
    sinon.stub(query, 'findManyProduct').returns(obj);
  });

  after(() => {
    query.findManyProduct.restore();
  });

  it('Should fail return product list', async () => {
    let product = new domain();
    let rs = await product.findProductList();
    assert.equal(rs.code, 409);
    assert.equal(rs.data, null);
    assert.notEqual(rs.err, null);
  });
});
