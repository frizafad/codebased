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
  async getProduct (data) {
    let arrData = [];
    let result = await queries.getProduct(data);
    let result2 = await queries.getSquad(data);    
    
    if (result.err) {
      return wrapper.error('fail', 'Data not found', 409);
    } else {
      const data = result.data;
      const data2 = result2.data;

      data.map(async (item) => {
        const modelDb = await model.modelgetProduct();      
        modelDb.id = item.id;
        modelDb.productName = item.name; 
        data2.map(async (items) => {
          modelDb.sprint = items.sprint.sprintName;
          modelDb.squad = item.squad.name; 
          modelDb.member = item.squad.member;
          modelDb.stakeholder = item.stakeholder;
          modelDb.note = items.sprint.note; 
        })      
        arrData.push(modelDb);
      })
      return wrapper.data(arrData, 'Your Request Has Been Processed', 200);
    }
  }

  async getNotification (data) {
    let arrData = [];
    let result = await queries.innerSquad(data);
    
    if (result.err) {
      return wrapper.error('fail', 'Data not found', 409);
    } else {
      let data = result.data;
       
      data.map(async (item) => {
        let modelDb = await model.modelgetNotification();
        modelDb.member = item.member;
        modelDb.description = 'Menambahkan anda dalam ' + item.description + ' ' + item.sprint.backlog.backlogId ;
        modelDb.squad = item.name;
        modelDb.backlog = 'backlog ' +item.sprint.backlog.backlogId;
        
        arrData.push(modelDb);
      })
      return wrapper.data(arrData, 'Your Request Has Been Processed', 200);
    }
  }

}
module.exports = CoreService;
