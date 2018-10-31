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
const getSquad = async (req, res, next) => {
  const getData = async () => {
    return queryHandler.getSquad();
=======

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
>>>>>>> 537c050074218a13cac215dd601b5bdcfd0487da
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
<<<<<<< HEAD
  getSquad
=======
  getSquadstatus,
  getMemberstatus,
  getTalent
>>>>>>> 537c050074218a13cac215dd601b5bdcfd0487da
};
