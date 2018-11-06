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

module.exports = {
  getMongo,
  getCalenderbydate
};
