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
>>>>>>> 2de4373f15cca300c73b91eb43f8690a59519099
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
>>>>>>> 2de4373f15cca300c73b91eb43f8690a59519099
};
