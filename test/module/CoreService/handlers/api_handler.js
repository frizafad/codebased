'use strict';

let sinon = require('sinon');
let request = require('request');
let assert = require('assert');
let query = require('../../../../bin/modules/CoreService/handlers/api_handler');

describe('View Daftar Jenis Beras', () => {
  before(() => {
    sinon.stub(query, 'getJenisBeras').returns([
      {
        'id': 1,
        'name': 'Houseofcuff Square',
        'image': 'https://s3-ap-southeast-1.amazonaws.com/telkomdev/photo/fashion/1_HouseofcuffSquare_599000_fashion.jpg',
        'price': 599000,
        'stock': 5,
        'description': 'Houseofcuff Square Gold Black Roman Cufflinks merupakan sebuah cufflink premium dari houseofcuff, bentuk jam analog yang dapat berfungsi menunjukkan waktu dan terbuat dari material berkualitas tinggi, dilengkapi dengan kotak eksklusif houseofcuff sehingga sangat cocok sebagai hadiah untuk kerabat anda.',
        'category': 'Fashion'
      },
      {
        'id': 2,
        'name': 'Jaket Sweater Harakiri',
        'image': 'https://s3-ap-southeast-1.amazonaws.com/telkomdev/photo/fashion/2_JaketSweaterHarakiri_159000_fashion.jpg',
        'price': 159000,
        'stock': 5,
        'description': 'Jaket harakiri model jepang/korea, merupakan jaket trend saat ini. Bahan : flece tebal Ukuran : M, L, XL (normal indo)',
        'category': 'Fashion'
      },
      {
        'id': 3,
        'name': 'Sepatu Varka V197',
        'image': 'https://s3-ap-southeast-1.amazonaws.com/telkomdev/photo/fashion/3_SepatuVarkaV197_120000_fashion.jpg',
        'price': 120000,
        'stock': 5,
        'description': 'Varka V197 Sepatu Boot Casual Wanita, salah satu model baru dan trend dari kami, didesain untuk bisa dipakai dalam berbagai acara. sangat nyaman dan kokoh saat dipakai sehingga menunjang kepercayaan diri anda. warna abu tersedia ukuran 36-40 dari bahan sintetis Model trend Model simple dan elegan Kualitas bagus harga terjangkau Nyaman saat dipakai Perawatan mudah',
        'category': 'Fashion'
      }]);
  });

  after(() => {
    query.findManyProduct.restore();
  });

  it('Should return product list', async () => {
    let product = new domain();
    let rs = await product.findProductList();
    assert.equal(rs.data.length, 3);
    assert.equal(rs.code, 200);
  });
});
