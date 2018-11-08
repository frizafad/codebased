'use strict';

const config = require('../../../../infra/configs/global_config');
const Mongo = require('../../../../helpers/databases/mongodb/db');

const getMongo = async () => {
  const db = new Mongo(config.getDatabaseUrl());
  db.setCollection('backlogs');
  const recordset = await db.findMany();
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

module.exports = {
  getMongo,
  getCalenderbydate,
  getpersonalscore
};
