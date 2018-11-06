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

const getSquadstatus = async (req, res, next) => {
  const getData = async () => {
    return queryHandler.getSquadstatus();
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

const getMemberstatus = async (req, res, next) => {
  const getData = async () => {
    return queryHandler.getMemberstatus(req.params);
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

const getTalent = async (req, res, next) => {
  const getData = async () => {
    return queryHandler.getTalent();
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
const getValid = async (req, res, next) => {
  const getData = async () => {
    return queryHandler.getValid();
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

const getOneValid = async (req, res, next) => {
  const getData = async () => {
    return queryHandler.getOneValid(req.params);
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
  getSquadstatus,
  getMemberstatus,
  getTalent,
  getValid,
  getOneValid
};
