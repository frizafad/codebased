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
        });
        arrData.push(modelDb);
      });
      return wrapper.data(arrData, 'Your Request Has Been Processed', 200);
    }
  }

  async getNotification (data) {
    let arrData = [];
    let result = await queries.innerSquad(data);

    if (result.err) {
      return wrapper.error('Internal Server Error', 'Internal Server Error', 500);
    } else {
      let data = result.data;

      data.map(async (item) => {
        let modelDb = await model.modelgetNotification();
        modelDb.member = item.member;
        modelDb.description = 'Menambahkan anda dalam ' + item.description + ' ' + item.sprint.backlog.backlogId;
        modelDb.squad = item.name;
        modelDb.backlog = 'backlog ' + item.sprint.backlog.backlogId;

        arrData.push(modelDb);
      });
      return wrapper.data(arrData, 'Your Request Has Been Processed', 200);
    }
  };
  async getQueue () {
    let arrData = [];
    let result = await queries.getQueue();
    if (result.err) {
      return wrapper.error('fail', 'Data not found', 409);
    } else {
      let data = result.data;
      data.map(async (item) => {
        let modelDb = await model.modelQueue();
        modelDb.name = item.name;
        modelDb.version = item.version;
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
      logger.log(result.err.message, 'Cannot find Data');
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
      logger.log(result.err.message, 'Cannot find Data');
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
  async getCalenderbydate (time) {
    let arrData = [];

    let result = await queries.getCalenderbydate();
    if (result.err) {
      return wrapper.error('fail', 'Data not found', 409);
    } else {
      let data = result.data;
      data.map(async (item) => {
        let modelDb = await model.modelB();
        modelDb.name = item.name;
        modelDb.version = item.version;
        arrData.push(modelDb);

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

  async getDetailPersonalBacklog (data) {
    let result = await queries.getDetailPersonalBacklog(data);
    let belum = 0;
    let sedang = 0;
    let sudah = 0;
    let detailBelum = [];
    let detailSedang = [];
    let detailSudah = [];

    if (result.err) {
      return wrapper.error('fail', 'Data not found', 409);
    } else {
      let data = result.data;
      await data.map(async (elem) => {
        if (elem.backlog.backlogStatus === 'belum dikerjakan') {
          belum += 1;
          let modelDb = await model.modelDetail();
          modelDb.description = elem.backlog.description;
          modelDb.backlog = elem.backlog.id;
          detailBelum.push(modelDb);
        } else if (elem.backlog.backlogStatus === 'sedang dikerjakan') {
          sedang += 1;
          let modelDb = await model.modelDetail();
          modelDb.description = elem.backlog.description;
          modelDb.backlog = elem.backlog.id;
          detailSedang.push(modelDb);
        } else if (elem.backlog.backlogStatus === 'sudah dikerjakan') {
          sudah += 1;
          let modelDb = await model.modelDetail();
          modelDb.description = elem.backlog.description;
          modelDb.backlog = elem.backlog.id;
          detailSudah.push(modelDb);
        }
      });
      let hasil = {
        totalBacklog: [
          {
            'status': 'belum dikerjakan',
            'total': belum,
            'description': detailBelum
          },
          {
            'status': 'sedang dikerjakan',
            'total': sedang,
            'description': detailSedang
          },
          {
            'status': 'sudah dikerjakan',
            'total': sudah,
            'description': detailSudah
          }
        ]
      };
      return wrapper.data(hasil, '', 200);
    }
  }

  async getPersonalBacklog (data) {
    let result = await queries.getPersonalBacklog(data);
    let belum = 0;
    let sedang = 0;
    let sudah = 0;

    if (result.err) {
      return wrapper.error('fail', 'Data not found', 409);
    } else {
      let data = result.data;
      await data.map(async (elem) => {
        if (elem.backlog.backlogStatus === 'belum dikerjakan') {
          belum += 1;
        } else if (elem.backlog.backlogStatus === 'sedang dikerjakan') {
          sedang += 1;
        } else if (elem.backlog.backlogStatus === 'sudah dikerjakan') {
          sudah += 1;
        }
      });
      let hasil = {
        totalBacklog: [
          {
            'status': 'belum dikerjakan',
            'color': '#FA8E8E',
            'total': belum
          },
          {
            'status': 'sedang dikerjakan',
            'color': '#A8CEEB',
            'total': sedang
          },
          {
            'status': 'sudah dikerjakan',
            'color': '#A6EDE9',
            'total': sudah
          }
        ]
      };
      return wrapper.data(hasil, '', 200);
    }
  }
}

module.exports = CoreService;
