'use strict';

const wrapper = require('../../../helpers/utils/wrapper');
const queryHandler = require('../repositories/queries/query_handler');
const CommandHandler = require('../repositories/commands/command_handler');

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
    let data = [];
    data.id = req.body.id;
    data.judul = req.body.judul;
    data.description = req.body.description;
    data.location = req.body.location;
    data.startTime = req.body.startTime;
    data.finishTime = req.body.finishTime;
    data.createdAt = req.body.createdAt;
    data.createdBy = req.body.createdBy;
    data.modifiedAt = req.body.modifiedAt;
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

module.exports = {
  getMongo,
  postCalendar
};
