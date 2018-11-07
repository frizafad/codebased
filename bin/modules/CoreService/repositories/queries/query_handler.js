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

const getDetailPersonalBacklog = async (data) => {
  const getData = async () => {
    const dataRetailer = new CoreService();
    const result = await dataRetailer.getDetailPersonalBacklog(data);
    return result;
  };
  const response = await getData();
  return response;
};

const getPersonalBacklog = async (data) => {
  const getData = async () => {
    const dataRetailer = new CoreService();
    const result = await dataRetailer.getPersonalBacklog(data);
    return result;
  };
  const response = await getData();
  return response;
};

module.exports = {
  getMongo,
  getCalenderbydate,
  getDetailPersonalBacklog,
  getPersonalBacklog
};
