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
      wrapper.response(res, 'success', result);
    } else {
      wrapper.response(res, 'error', result);
    }
  };
  sendResponse(await getData());
};

module.exports = {
  getMongo,
  getProductAll,
  getProductAllbyName
};
