'use strict';

const wrapper = require('../../../../helpers/utils/wrapper');
const model = require('./query_model');
const queries = require('./query');

class CoreService {
  async getMongo () {
    let arrData = [];
    let result = await queries.getMongo();
    if (result.err) {
      return wrapper.error('fail', 'Data not found', 409);
    } else {
      let data = result.data;
      data.map(async (item) => {
        let modelDb = await model.modelA();
        modelDb.backlogType = item.backlogType;
        arrData.push(modelDb);
      });
      return wrapper.data(arrData, '', 200);
    }
  }

  async getCalenderbydate (time) {
    let arrData = [];

    let result = await queries.getCalenderbydate();
    if (result.err) {
      return wrapper.error('fail', 'Data not found', 409);
    } else {
      let data = result.data;
      data.map(async (item) => {
        let modelCal = await model.modelCalendar();
        let query = item.startTime.split('T', 1);
        if (query == time) {
          let startTime = new Date(item.startTime);
          let finishTime = new Date(item.finishTime);
          let createdAt = new Date(item.createdAt);
          let modifiedAt = new Date(item.modifiedAt);
          modelCal.id = item.id;
          modelCal.judul = item.judul;
          modelCal.description = item.description;
          modelCal.location = item.location;
          modelCal.startTime = startTime.toLocaleString();
          modelCal.finishTime = finishTime.toLocaleString();
          modelCal.createdAt = createdAt.toLocaleString();
          modelCal.createdBy = item.createdBy;
          modelCal.modifiedAt = modifiedAt.toLocaleString();
          modelCal.modifiedBy = item.modifiedBy;
          arrData.push(modelCal);
        }
      });
      return wrapper.data(arrData, '', 200);
    }
  }
  async getpersonalscore (data) {
    let arrData = [];
    let ctx = 'domain-getpersonalscore';
    let result = await queries.getpersonalscore(data);
    if (result.err) {
      logger.log(ctx, result.err.message, "Cannot find MuridKungfu");
      return wrapper.error('fail', 'Data not found', 409);
    } else {
      let data = result.data;
      console.log(data);
      
        let modelDb = await model.personalscore();
        modelDb.id = data.id,
        modelDb.name = data.name,
        modelDb.imageUrl = data.imageUrl,
        modelDb.keyPoints = data.keyPoints,
        modelDb.needImprovements = data.needImprovements,
        modelDb.rating = data.rating,
        modelDb.projectHistory = data.projectHistory,
        modelDb.title = data.title
        arrData.push(modelDb);
    };
      return wrapper.data(arrData, '', 200);
    }
}

module.exports = CoreService;
