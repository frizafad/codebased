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

<<<<<<< HEAD
const getProductAll = async (data) => {
  const getData = async () => {
    const dataRetailer = new CoreService();
    const result = await dataRetailer.getProductAll(data.page);
=======
const getSquadstatus = async () => {
  const getData = async () => {
    const dataRetailer = new CoreService();
    const result = await dataRetailer.getSquadstatus();
>>>>>>> e9a09ecc1b19735a8bf6ebe0ce5125d380cd6f58
    return result;
  };
  const response = await getData();
  return response;
};
<<<<<<< HEAD

const getProductAllbyName = async (data) => {
  const getData = async () => {
    const dataRetailer = new CoreService();
    const result = await dataRetailer.getProductAllbyName(data.name, data.page);
    return result;
  };
  const response = await getData();
  return response;
};

=======
>>>>>>> e9a09ecc1b19735a8bf6ebe0ce5125d380cd6f58
const getCalenderbydate = async (data) => {
  const getData = async () => {
    const dataRetailer = new CoreService();
    const result = await dataRetailer.getCalenderbydate(data);
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
<<<<<<< HEAD
  getProductAll,
  getProductAllbyName,
=======
  getSquadstatus,
  getMemberstatus,
  getTalent,
  getValid,
  getOneValid,
>>>>>>> e9a09ecc1b19735a8bf6ebe0ce5125d380cd6f58
  getCalenderbydate
};
