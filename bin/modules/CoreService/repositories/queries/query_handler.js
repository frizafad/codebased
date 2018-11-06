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

const getSquadstatus = async () => {
  const getData = async () => {
    const dataRetailer = new CoreService();
    const result = await dataRetailer.getSquadstatus();
    return result;
  };
  const response = await getData();
  return response;
};

const getMemberstatus = async (data) => {
  const getData = async () => {
    const dataRetailer = new CoreService();
    const result = await dataRetailer.getMemberstatus(data);
    return result;
  };
  const response = await getData();
  return response;
};

const getTalent = async () => {
  const getData = async () => {
    const dataRetailer = new CoreService();
    const result = await dataRetailer.getTalent();
    return result;
  };
  const response = await getData();
  return response;
};
const getValid = async (data) => {
  const getData = async () => {
    const dataRetailer = new CoreService();
    const result = await dataRetailer.getValid(data);
    return result;
  };
  const response = await getData();
  return response;
};
const getOneValid = async (data) => {
  const getData = async () => {
    const dataRetailer = new CoreService();
    const result = await dataRetailer.getOneValid(data);
    return result;
  };
  const response = await getData();
  return response;
};
module.exports = {
  getMongo,
  getSquadstatus,
  getMemberstatus,
  getTalent,
  getValid,
  getOneValid
};
