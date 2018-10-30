'use strict';

const modelPenjualan = () => {
  const model = {
    idProduct: '',
    value: '',
    name: '',
    stock: ''
  };
  return model;
};

const modelDetail = () => {
  const model = {
    name: '',
    stock: '',
    date: '',
    user_stock_id: ''
  };
  return model;
};

const modelPenambahanStok = () => {
  const model = {
    name: '',
    products: '',
    value: ''
  };
  return model;
};

const modelDetailPenambahanStok = () => {
  const model = {
    name: '',
    createdDate: '',
    stock: '',
    date: '',
    user_stock_id: ''
  };
  return model;
};

const modelFoto = () => {
  const model = {
    idRetailer: '',
    image: ''
  };
  return model;
};

const modelStockBC = () => {
  const model = {
    user_id: String,
    details: [
      {
        productId: String,
        name: String,
        qty: Number
      }
    ]
  };
  return model;
};

const modelX = () => {
  const model = {
    idRetailer: '',
    idProduct: '',
    qty: ''
  };
  return model;
};

const modellaporanStok = () => {
  const model = {
    idRetailer: '',
    idProduct: '',
    name: '',
    jmlStock: '',
    jmlKonsumsi: '',
    totalstock: ''
  };
  return model;
};

const sellScanBarcode = () => {
  const model = {
    idRetailer: String,
    details: [
      {
        idProduct: String,
        productName: String,
        stock: Number
      }
    ]
  };
  return model;
};

module.exports = {
  modelPenjualan: modelPenjualan,
  modelDetail: modelDetail,
  modelPenambahanStok,
  modelDetailPenambahanStok,
  modelFoto,
  modelStockBC,
  modelX,
  modellaporanStok: modellaporanStok,
  sellScanBarcode: sellScanBarcode
};
