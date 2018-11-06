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

<<<<<<< HEAD
const getProductAll = async (req, res, next) => {
  const getData = async () => {
    return queryHandler.getProductAll(req.params);
  };
  const sendResponse = async (result) => {
    if (result.err !== false) {
=======
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
    if (result.err != false) {
>>>>>>> 2de4373f15cca300c73b91eb43f8690a59519099
      wrapper.response(res, 'success', result);
    } else {
      wrapper.response(res, 'error', result);
    }
  };
<<<<<<< HEAD
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
=======
  sendResponse(await postData());
>>>>>>> 2de4373f15cca300c73b91eb43f8690a59519099
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

module.exports = {
  getMongo,
<<<<<<< HEAD
  getProductAll,
  getProductAllbyName,
=======
  postCalendar,
>>>>>>> 2de4373f15cca300c73b91eb43f8690a59519099
  getCalenderbydate
};
