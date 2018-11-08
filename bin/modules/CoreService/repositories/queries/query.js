/* eslint-disable camelcase */
'use strict';

const config = require('../../../../infra/configs/global_config');
const Mongo = require('../../../../helpers/databases/mongodb/db');

const getMongo = async () => {
  const db = new Mongo(config.getDatabaseUrl());
  db.setCollection('backlogs');
  const recordset = await db.findMany();
  return recordset;
};
const getValid = async () => {
  const db = new Mongo(config.getDatabaseUrl());
  db.setCollection('validator');
  const recordset = await db.findMany();
  return recordset;
};
const getOneValid = async (param) => {
  const db = new Mongo(config.getDatabaseUrl());
  db.setCollection('validator');
  const recordset = await db.findOne(param);
  return recordset;
};
const getSquadstatus = async () => {
  const db = new Mongo(config.getDatabaseUrl());
  let sudah_dikerjakan = 0;
  let sedang_dikerjakan = 0;
  let belum_dikerjakan = 0;
  db.setCollection('squads');
  const recordset = await db.findMany();
  recordset.data.forEach(function (backlog) {
    backlog.backlogId.forEach(function (isibacklog) {
      if (isibacklog.deskripsi === 'sudah dikerjakan') {
        sudah_dikerjakan += 1;
      } else if (isibacklog.deskripsi === 'sedang dikerjakan') {
        sedang_dikerjakan += 1;
      } else if (isibacklog.deskripsi === 'belum dikerjakan') {
        belum_dikerjakan += 1;
      }
    });
  });
  let hasil = {
    sudah_dikerjakan,
    sedang_dikerjakan,
    belum_dikerjakan
  };
  return hasil;
};

const getMemberstatus = async (data) => {
  const db = new Mongo(config.getDatabaseUrl());
  let sudah_dikerjakan = 0;
  let sedang_dikerjakan = 0;
  let belum_dikerjakan = 0;
  db.setCollection('squads');
  const recordset = await db.findOne(data);
  recordset.data.backlogId.forEach(function (isibacklog) {
    if (isibacklog.deskripsi === 'sudah dikerjakan') {
      sudah_dikerjakan += 1;
    } else if (isibacklog.deskripsi === 'sedang dikerjakan') {
      sedang_dikerjakan += 1;
    } else if (isibacklog.deskripsi === 'belum dikerjakan') {
      belum_dikerjakan += 1;
    }
  });
  let hasil = {
    sudah_dikerjakan,
    sedang_dikerjakan,
    belum_dikerjakan
  };
  return hasil;
};

const getTalent = async () => {
  let talents = [];
  const db = new Mongo(config.getDatabaseUrl());
  db.setCollection('squads');
  const recordset = await db.findMany();
  recordset.data.forEach(function (element) {
    element.member.forEach(function (role) {
      let dat = {
        'talentName': role.talentName,
        'talentRole': role.talentRole
      };
      talents.push(dat);
    });
  });

  const removeDuplicates = (array, key) => {
    return array.reduce((arr, item) => {
      const removed = arr.filter(i => i[key] !== item[key]);
      return [...removed, item];
    }, []);
  };

  let talent = removeDuplicates(talents, 'talentName');
  let Arrdata = [];
  function Ratingnya () {
    talent.forEach(async function (elem) {
      let name = {
        'name': elem.talentName
      };

      const db = new Mongo(config.getDatabaseUrl());
      db.setCollection('members');
      const recordset2 = await db.findOne(name);
      let hasil = {
        'talentName': elem.talentName,
        'talentRole': elem.talentRole,
        'rating': +recordset2.data.rating
      };
      Arrdata.push(hasil);
      console.log(Arrdata);
    });
  }
  await Ratingnya();

  return Arrdata;
};

const getProductAll = async (data) => {
  const db = new Mongo(config.getDatabaseUrl());
  db.setCollection('products');
  const recordset = await db.innerJoin(data);
  return recordset;
};

const getProductAllbyName = async (data) => {
  const db = new Mongo(config.getDatabaseUrl());
  db.setCollection('products');
  const recordset = await db.innerJoin(data);
  return recordset;
};
const getCalenderbydate = async () => {
  const db = new Mongo(config.getDatabaseUrl());
  db.setCollection('calendar');
  const recordset = await db.findMany();
  return recordset;
};

const getpersonalscore = async (data) => {
  const db = new Mongo(config.getDatabaseUrl());
  db.setCollection('members');
  const recordset = await db.findOne(data);
  return recordset;
  };
  
const getProduct = async (data) => {
  const db = new Mongo(config.getDatabaseUrl());
  db.setCollection('products');
  const recordset = await db.innerJoin(
    [
      {
        $lookup:
      {
        from: 'squads',
        localField: 'squadId',
        foreignField: 'id',
        as: 'squad'
      }},
      {$unwind: '$squad'}
    ]
  );
  return recordset;
};

const getSquad = async () => {
  const db = new Mongo(config.getDatabaseUrl());
  db.setCollection('squads');
  const recordset = await db.innerJoin(
    [
      {
        $match: {sprintId: 'SP001'}
      }, {
        $lookup:
      {
        from: 'sprints',
        localField: 'sprintId',
        foreignField: 'id',
        as: 'sprint'
      }
      }, {$unwind: '$sprint'}]);
  return recordset;
};

const innerSquad = async (data) => {
  const db = new Mongo(config.getDatabaseUrl());
  db.setCollection('squads');
  const recordset = await db.innerJoin(
    [{
      $match: {sprintId: 'SP001'}
    }, {
      $lookup:
        {
          from: 'sprints',
          localField: 'sprintId',
          foreignField: 'id',
          as: 'sprint'
        }
    }, {$unwind: '$sprint'}]);
  return recordset;
};
const getQueue = async () => {
  const db = new Mongo(config.getDatabaseUrl());
  db.setCollection('products');
  const recordset = await db.findMany();
  return recordset;
};

const getDetailPersonalBacklog = async (data) => {
  const db = new Mongo(config.getDatabaseUrl());
  db.setCollection('members');
  const recordset = await db.aggregatePersonalBacklog([
    {$match: {id: data.id}},
    {$lookup:
      {
        from: 'backlogs',
        localField: 'id',
        foreignField: 'assignee.id',
        as: 'backlog'
      }

    },
    {$unwind: '$backlog'}

  ]);
  return recordset;
};

const getPersonalBacklog = async (data) => {
  const db = new Mongo(config.getDatabaseUrl());
  db.setCollection('members');
  const recordset = await db.aggregatePersonalBacklog([
    {$match: {id: data.id}},
    {$lookup:
      {
        from: 'backlogs',
        localField: 'id',
        foreignField: 'assignee.id',
        as: 'backlog'
      }

    },
    {$unwind: '$backlog'}

  ]);
  return recordset;
};
module.exports = {
  getMongo,
  getProductAll,
  getProductAllbyName,
  getProduct,
  innerSquad,
  getSquad,
  getQueue,
  getCalenderbydate,
  getDetailPersonalBacklog,
  getPersonalBacklog,
  getSquadstatus,
  getMemberstatus,
  getTalent,
  getValid,
  getOneValid,
  getpersonalscore
};
