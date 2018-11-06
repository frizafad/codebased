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

const getProduct = async (data) => {
  const getData = async () => {
    const dataRetailer = new CoreService();
    const result = await dataRetailer.getProduct(data);
    return result;
  };
  const response = await getData();
  return response;
};

const getNotification = async (data) => {
  const getData = async () => {
    const dataRetailer = new CoreService();
    const result = await dataRetailer.getNotification(data);
    return result;
  };
  const response = await getData();
  return response;
};

module.exports = {
  getMongo,
  getProduct,
  getNotification
};
