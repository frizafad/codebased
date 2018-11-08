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
const getQueue = async () => {
  const getData = async () => {
    const dataRetailer = new CoreService();
    const result = await dataRetailer.getQueue();
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

const getDetailPersonalBacklog = async (data) => {
  const getData = async () => {
    const dataRetailer = new CoreService();
    const result = await dataRetailer.getDetailPersonalBacklog(data);
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

const getPersonalBacklog = async (data) => {
  const getData = async () => {
    const dataRetailer = new CoreService();
    const result = await dataRetailer.getPersonalBacklog(data);
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
  getQueue,
  getCalenderbydate,
  getDetailPersonalBacklog,
  getPersonalBacklog,
  getSquadstatus,
  getMemberstatus,
  getTalent,
  getValid,
  getOneValid,
  getpersonalscore
};
