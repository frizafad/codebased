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
const getSquad = async () => {
  const getData = async () => {
    const dataRetailer = new CoreService();
    const result = await dataRetailer.getSquad();
=======

const getSquadstatus = async () => {
  const getData = async () => {
    const dataRetailer = new CoreService();
    const result = await dataRetailer.getSquadstatus();
>>>>>>> 537c050074218a13cac215dd601b5bdcfd0487da
    return result;
  };
  const response = await getData();
  return response;
};
<<<<<<< HEAD
module.exports = {
  getMongo,
  getSquad
=======

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

module.exports = {
  getMongo,
  getSquadstatus,
  getMemberstatus,
  getTalent
>>>>>>> 537c050074218a13cac215dd601b5bdcfd0487da
};
