'use strict';

const wrapper = require('../../../helpers/utils/wrapper');
const queryHandler = require('../repositories/queries/query_handler');
const CommandHandler = require('../repositories/commands/command_handler');
const moment = require('moment');

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

const postCalendar = async (req, res, next) => {
  const postData = async () => {
    var now = moment();
    var format = await now.format();
    let data = [];
    data.id = req.body.id;
    data.judul = req.body.judul;
    data.description = req.body.description;
    data.location = req.body.location;
    data.startTime = req.body.startTime;
    data.finishTime = req.body.finishTime;
    data.createdAt = format;
    data.createdBy = req.body.createdBy;
    data.modifiedAt = format;
    data.modifiedBy = req.body.modifiedBy;
    return CommandHandler.postCalendar(data);
  };
  const sendResponse = async (result) => {
    if (result.err !== false) {
      wrapper.response(res, 'success', result);
    } else {
      wrapper.response(res, 'error', result);
    }
  };
  sendResponse(await postData());
};

const getCalenderbydate = async (req, res, next) => {
  const getData = async () => {
    return queryHandler.getCalenderbydate(req.params.startTime);
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

const getpersonalscore = async (req, res, next) => {
  const getData = async () => {
  return queryHandler.getpersonalscore(req.params);
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
  postCalendar,
  getCalenderbydate,
  getpersonalscore
};
