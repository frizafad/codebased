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

const getCalenderbydate = async (data) => {
  const getData = async () => {
    const dataRetailer = new CoreService();
    const result = await dataRetailer.getCalenderbydate(data);
    return result;
  };
  const response = await getData();
  return response;
};

const getpersonalscore = async (data) => {
  const getData = async () => {
  const dataRetailer = new CoreService();
  const result = await dataRetailer.getpersonalscore(data);
  return result;
  };
  const response = await getData();
  return response;
  };

module.exports = {
  getMongo,
  getCalenderbydate,
  getpersonalscore
};
