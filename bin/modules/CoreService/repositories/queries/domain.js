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

  async getSquadstatus () {
    let result = await queries.getSquadstatus();
    if (result.err) {
      return wrapper.error('fail', 'Data not found', 409);
    } else {
      return wrapper.data(result, '', 200);
    }
  }

  async getMemberstatus (data) {
    let result = await queries.getMemberstatus(data);
    if (result.err) {
      return wrapper.error('fail', 'Data not found', 409);
    } else {
      return wrapper.data(result, '', 200);
    }
  }

  async getTalent () {
    let result = await queries.getTalent();
    if (result.err) {
      return wrapper.error('fail', 'Data not found', 409);
    } else {
      return wrapper.data(result, '', 200);
    }
  }
  async getValid(data){
    let arrData = [];
    let result = await queries.getValid();
    if (result.err) {
      logger.log(result.err.message, "Cannot find Data");
      return wrapper.error('fail', 'Data not found', 409);
    }
    else {
      let data = result.data;
      data.map(async (item)=>{
        let modelDb = await model.modelA();
        modelDb.nama_project = item.nama_project;
        modelDb.datetime = item.datetime;
        modelDb.po = item.po;
        arrData.push(modelDb);
      })
    }
    return wrapper.data(arrData,' ',200);
  }
  async getOneValid(data){
    let arrData = [];
    let result = await queries.getOneValid(data);
    if (result.err) {
      logger.log(result.err.message, "Cannot find Data");
      return wrapper.error('fail', 'Data not found', 409);
    }
    else {
      let data = [];
      data.push(result.data)
      data.map(async (item)=>{
        let modelDb = await model.modelA();
        modelDb.nama_project = item.nama_project;
        modelDb.datetime = item.datetime;
        modelDb.po = item.po;
        arrData.push(modelDb);
      });
    }
    return wrapper.data(arrData,' ',200);
  }
}
module.exports = CoreService;
