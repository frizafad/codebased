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
}

module.exports = CoreService;
