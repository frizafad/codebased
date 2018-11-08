'use strict';

const CoreService = require('./domain');

const getMongo = async () => {
  const getData = async () => {
    const dataRetailer = new CoreService();
    const result = await dataRetailer.getMongo();
    return result;
  };
  const response = await getData();
  return response;
};

const getProductAll = async (data) => {
  const getData = async () => {
    const dataRetailer = new CoreService();
    const result = await dataRetailer.getProductAll(data.page);
    return result;
  };
  const response = await getData();
  return response;
};

const getProductAllbyName = async (data) => {
  const getData = async () => {
    const dataRetailer = new CoreService();
    const result = await dataRetailer.getProductAllbyName(data.name, data.page);
    return result;
  };
  const response = await getData();
  return response;
};


module.exports = {
  getMongo,
  getProductAll,
  getProductAllbyName,
};
