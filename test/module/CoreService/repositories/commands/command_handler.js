'use strict';

const CoreService = require('./domain');

const postDataPenjualan = async (data) => {
  const postData = async () => {
    const dataPenjualan = new CoreService();
    const result = await dataPenjualan.postDataPenjualan(data);
    return result;
  };
  const response = await postData();
  return response;
};

const postDetailPenjualan = async (data) => {
  const postData = async () => {
    const dataPenjualan = new CoreService();
    const result = await dataPenjualan.postDetailPenjualan(data);
    return result;
  };
  const response = await postData();
  return response;
};

const postDataPenambahanStok = async (data) => {
  const postData = async () => {
    const dataPenambahanStok = new CoreService();
    const result = await dataPenambahanStok.postDataPenambahanStok(data);
    return result;
  };
  const response = await postData();
  return response;
};

const postDetailPenambahanStok = async (data) => {
  const postData = async () => {
    const dataPenambahanStok = new CoreService();
    const result = await dataPenambahanStok.postDetailPenambahanStok(data);
    return result;
  };
  const response = await postData();
  return response;
};

const updateFoto = async (data) => {
  const putData = async () => {
    const dataImage = new CoreService();
    const result = await dataImage.updateFoto(data);
    return result;
  };
  const response = await putData();
  return response;
};

const postlaporanStok = async (data) => {
  const postData = async () => {
    const dataRetailer = new CoreService();
    const result = await dataRetailer.postlaporanStok(data);
    return result;
  };
  const response = await postData();
  return response;
};

const postTambahStok = async (data) => {
  const postData = async () => {
    const dataRetailer = new CoreService();
    const result = await dataRetailer.postTambahStok(data);
    return result;
  };
  const response = await postData();
  return response;
};

const insertStockBarcode = async (data) => {
  const postData = async () => {
    const dataRetailer = new CoreService();
    const result = await dataRetailer.insertStockBarcode(data);
    return result;
  };
  const response = await postData();
  return response;
};

const insertStockBC = async (data) => {
  const postData = async () => {
    const dataRetailer = new CoreService();
    const result = await dataRetailer.insertStockBC(data);
    return result;
  };
  const response = await postData();
  return response;
};

const postPenjualanManual = async (data) => {
  const postData = async () => {
    const dataPenjualan = new CoreService();
    const result = await dataPenjualan.postPenjualanManual(data);
    return result;
  };
  const response = await postData();
  return response;
};

const formSellScanBarcode = async (data) => {
  const getData = async () => {
    const coreService = new CoreService();
    const result = await coreService.formSellScanBarcode(data);
    return result;
  };
  const response = await getData();
  return response;
};

const formSellRetailer = async (data) => {
  const getData = async () => {
    const coreService = new CoreService();
    const result = await coreService.formSellRetailer(data);
    return result;
  };
  const response = await getData();
  return response;
};


module.exports = {
  postDataPenjualan: postDataPenjualan,
  postDetailPenjualan: postDetailPenjualan,
  postTambahStok: postTambahStok,
  postDataPenambahanStok: postDataPenambahanStok,
  postDetailPenambahanStok: postDetailPenambahanStok,
  updateFoto: updateFoto,
  insertStockBarcode: insertStockBarcode,
  insertStockBC: insertStockBC,
  postlaporanStok: postlaporanStok,
  postPenjualanManual: postPenjualanManual,
  formSellScanBarcode: formSellScanBarcode,
  formSellRetailer: formSellRetailer
};
