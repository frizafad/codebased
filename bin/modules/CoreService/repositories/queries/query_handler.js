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
    return result;
  };
  const response = await getData();
  return response;
};

const getProductAllbyName = async (data) => {
  const getData = async () => {
    const dataRetailer = new CoreService();
    const result = await dataRetailer.getProductAllbyName(data.name, data.page);
=======
const getCalenderbydate = async (data) => {
  const getData = async () => {
    const dataRetailer = new CoreService();
    const result = await dataRetailer.getCalenderbydate(data);
>>>>>>> 5bb3b39e4073186a59f9467209b9fd08a6722a00
    return result;
  };
  const response = await getData();
  return response;
};

module.exports = {
  getMongo,
<<<<<<< HEAD
  getProductAll,
  getProductAllbyName
=======
  getCalenderbydate
>>>>>>> 5bb3b39e4073186a59f9467209b9fd08a6722a00
};
