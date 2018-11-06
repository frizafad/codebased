'use strict';

const wrapper = require('../../../helpers/utils/wrapper');
const queryHandler = require('../repositories/queries/query_handler');

const getMongo = async (req, res, next) => {
  const getData = async () => {
    return queryHandler.getMongo();
  };
  const sendResponse = async (result) => {
    if (result.err !== false) {
      wrapper.response(res, 'success', result);
    } else {
      wrapper.response(res, 'error', result);
    }
  };
  sendResponse(await getData());
};

<<<<<<< HEAD
const getProductAll = async (req, res, next) => {
  const getData = async () => {
    return queryHandler.getProductAll(req.params);
  };
  const sendResponse = async (result) => {
    if (result.err !== false) {
      wrapper.response(res, 'success', result);
    } else {
      wrapper.response(res, 'error', result);
    }
  };
  sendResponse(await getData());
};

const getProductAllbyName = async (req, res, next) => {
  const getData = async () => {
    return queryHandler.getProductAllbyName(req.params);
  };
  const sendResponse = async (result) => {
    if (result.err !== false) {
=======
const getCalenderbydate = async (req, res, next) => {
  const getData = async () => {
    return queryHandler.getCalenderbydate(req.params.startTime);
  };
  const sendResponse = async (result) => {
    if (result.err != false) {
>>>>>>> 5bb3b39e4073186a59f9467209b9fd08a6722a00
      wrapper.response(res, 'success', result);
    } else {
      wrapper.response(res, 'error', result);
    }
  };
  sendResponse(await getData());
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
