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
<<<<<<< HEAD
  async getSquad () {
    let arrData = [];
    let result = await queries.getSquad();
    if (result.err) {
      return wrapper.error('fail', 'Data not found', 409);
    } else {
      let data = result.data;
      data.map(async (item) => {
        let modelDb = await model.modelA();
        modelDb.squadid = item.squadid;
        modelDb.backlogId = item.backlogId;
        arrData.push(modelDb);
      });
      return wrapper.data(arrData, '', 200);
=======

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
>>>>>>> 537c050074218a13cac215dd601b5bdcfd0487da
    }
  }
}
module.exports = CoreService;
