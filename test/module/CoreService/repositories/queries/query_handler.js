'use strict';

const CoreService = require('./domain');

const getStokviaBarcode = async (data) => {
  const getData = async () => {
    const dataRetailer = new CoreService();
    const result = await dataRetailer.getStokviaBarcode(data);
    return result;
  };
  const response = await getData();
  return response;
};

const getJenisBeras = async () => {
  const getData = async () => {
    const dataRetailer = new CoreService();
    const result = await dataRetailer.getJenisBeras();
    return result;
  };
  const response = await getData();
  return response;
};

const getStok = async () => {
  const getData = async () => {
    const dataRetailer = new CoreService();
    const result = await dataRetailer.getStok();
    return result;
  };
  const response = await getData();
  return response;
};

const getCompare = async (data) => {
  const getData = async () => {
    const dataRetailer = new CoreService();
    const result = await dataRetailer.getCompare(data);
    return result;
  };
  const response = await getData();
  return response;
};

const getRetailerDaerah = async (data) => {
  const getData = async () => {
    const dataRetailer = new CoreService();
    const result = await dataRetailer.getRetailerDaerah(data);
    return result;
  };
  const response = await getData();
  return response;
};

const getDataRetailerByStore = async (data) => {
  const getData = async () => {
    const dataRetailerbyStore = new CoreService();
    const result = await dataRetailerbyStore.getDataRetailerByStore(data);
    return result;
  };
  const response = await getData();
  return response;
};

const getDataRetailerDetail = async (data) => {
  const getData = async () => {
    const dataRetailer = new CoreService();
    const result = await dataRetailer.getDataRetailerDetail(data);
    return result;
  };
  const response = await getData();
  return response;
};

const getDataRetailerByArea = async (data) => {
  const getData = async () => {
    const dataRetailerbyStore = new CoreService();
    const result = await dataRetailerbyStore.getDataRetailerByArea(data);
    return result;
  };
  const response = await getData();
  return response;
};

const getDataPenambahanStok = async (data) => {
  const getData = async () => {
    const dataPenambahanStok = new CoreService();
    const result = await dataPenambahanStok.getDataPenambahanStok(data);
    return result;
  };
  const response = await getData();
  return response;
};

const getTambahStok = async (data) => {
  const getData = async () => {
    const dataStok = new CoreService();
    const result = await dataStok.getTambahStok(data);
    return result;
  };
  const response = await getData();
  return response;
};

const getDetailPenambahanStok = async (data) => {
  const getData = async () => {
    const dataPenambahanStok = new CoreService();
    const result = await dataPenambahanStok.getDetailPenambahanStok(data);
    return result;
  };
  const response = await getData();
  return response;
};

const getlaporanStok = async (data) => {
  const getData = async () => {
    const dataRetailer = new CoreService();
    const result = await dataRetailer.getlaporanStok(data);
    return result;
  };
  const response = await getData();
  return response;
};

const getpenjualanmanual = async (data) => {
  const getData = async () => {
    const dataRetailer = new CoreService();
    const result = await dataRetailer.getpenjualanmanual(data);
    return result;
  };
  const response = await getData();
  return response;
};

const getBUMN = async () => {
  const getData = async () => {
    const dataRetailer = new CoreService();
    const result = await dataRetailer.getBUMN();
    return result;
  };
  const response = await getData();
  return response;
};

module.exports = {
  getStokviaBarcode: getStokviaBarcode,
  getJenisBeras: getJenisBeras,
  getStok: getStok,
  getCompare: getCompare,
  getDataRetailerDetail: getDataRetailerDetail,
  getTambahStok: getTambahStok,
  getDataRetailerByStore: getDataRetailerByStore,
  getDataRetailerByArea: getDataRetailerByArea,
  getRetailerDaerah: getRetailerDaerah,
  getDataPenambahanStok: getDataPenambahanStok,
  getDetailPenambahanStok: getDetailPenambahanStok,
  getlaporanStok: getlaporanStok,
  getpenjualanmanual: getpenjualanmanual,
  getBUMN: getBUMN
};
