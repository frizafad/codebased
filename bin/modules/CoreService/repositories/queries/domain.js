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
        let modelDb = await model.modelProductAll();
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
  async getValid (data) {
    let arrData = [];
    let result = await queries.getValid();
    if (result.err) {
      return wrapper.error('fail', 'Data not found', 409);
    } else {
      let data = result.data;
      data.map(async (item) => {
        let modelDb = await model.modelA();
        modelDb.nama_project = item.nama_project;
        modelDb.datetime = item.datetime;
        modelDb.po = item.po;
        arrData.push(modelDb);
      });
    }
    return wrapper.data(arrData, ' ', 200);
  }
  async getOneValid (data) {
    let arrData = [];
    let result = await queries.getOneValid(data);
    if (result.err) {
      return wrapper.error('fail', 'Data not found', 409);
    } else {
      let data = [];
      data.push(result.data);
      data.map(async (item) => {
        let modelDb = await model.modelA();
        modelDb.nama_project = item.nama_project;
        modelDb.datetime = item.datetime;
        modelDb.po = item.po;
        arrData.push(modelDb);
      });
    }
    return wrapper.data(arrData, ' ', 200);
  }

  async getProductAll (page) {
    let arrData = [];
    var limit = 10;
    const kond = [
      {
        $lookup:
        {
          from: 'squads',
          localField: 'squadid',
          foreignField: 'squadid',
          as: 'unit'
        }
      },
      {
        $project: {
          '_id': 0,
          'name': 1,
          'startproject': 1,
          'unit': { 'name': 1 },
          'version': 1
        }
      }, {
        $skip: Number(limit * (page - 1))
      },
      {
        $limit: Number(limit)
      }
    ];
    let result = await queries.getProductAll(kond);
    if (result.err) {
      return wrapper.error('fail', 'Data not found', 409);
    } else {
      let data = result.data;
      data.map(async (item) => {
        let modelDb = await model.modelProductAll();
        modelDb.nameProduct = item.name;
        modelDb.startProject = item.startproject;
        modelDb.unit = item.unit;
        modelDb.ver = item.version;
        arrData.push(modelDb);
      });
      return wrapper.data(arrData, '', 200);
    }
  }

  async getProductAllbyName (name, page) {
    let arrData = [];
    var limit = 10;
    const kond = [
      {
        $match: {
          'name': {$regex: name}
        }
      },
      {
        $lookup:
        {
          from: 'squads',
          localField: 'squadid',
          foreignField: 'squadid',
          as: 'unit'
        }
      },
      {
        $project: {
          '_id': 0,
          'name': 1,
          'startproject': 1,
          'unit': { 'name': 1 },
          'version': 1
        }
      }, {
        $skip: Number(limit * (page - 1))
      },
      {
        $limit: Number(limit)
      }
    ];
    let result = await queries.getProductAllbyName(kond);
    if (result.err) {
      return wrapper.error('fail', 'Data not found', 409);
    } else {
      let data = result.data;
      data.map(async (item) => {
        let modelDb = await model.modelProductAll();
        modelDb.nameProduct = item.name;
        modelDb.startProject = item.startproject;
        modelDb.unit = item.unit;
        modelDb.ver = item.version;
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
        if (query === time) {
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
}

module.exports = CoreService;
