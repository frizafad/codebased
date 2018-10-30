'use strict';

let sinon = require('sinon');
let request = require('request');
let assert = require('assert');
let query = require('../../bin/modules/product/repositories/queries/query');
let domain = require('../../bin/modules/product/repositories/queries/domain');

describe('View Product Detail', () => {
  let obj = {
    err: null,
    data: {
      'id': 1,
      'name': 'Houseofcuff Square',
      'image': 'https://s3-ap-southeast-1.amazonaws.com/telkomdev/photo/fashion/1_HouseofcuffSquare_599000_fashion.jpg',
      'price': 599000,
      'stock': 5,
      'description': 'Houseofcuff Square Gold Black Roman Cufflinks merupakan sebuah cufflink premium dari houseofcuff, bentuk jam analog yang dapat berfungsi menunjukkan waktu dan terbuat dari material berkualitas tinggi, dilengkapi dengan kotak eksklusif houseofcuff sehingga sangat cocok sebagai hadiah untuk kerabat anda.',
      'category': 'Fashion'
    },
    code: 200,
    message: ''
  };

  before(() => {
    sinon.stub(query, 'findOneProduct').returns(obj);
  });

  after(() => {
    query.findOneProduct.restore();
  });

  it('Should return product detail', async () => {
    let product = new domain();
    let param = {id: 1};
    let rs = await product.findProductDetail(param);
    assert.equal(rs.data.id, obj.data.id);
    assert.equal(rs.code, 200);
  });
});
