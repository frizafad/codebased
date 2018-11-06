'use strict';

const config = require('../../../../infra/configs/global_config');
const Mongo = require('../../../../helpers/databases/mongodb/db');

const getMongo = async () => {
  const db = new Mongo(config.getDatabaseUrl());
  db.setCollection('backlogs');
  const recordset = await db.findMany();
  return recordset;
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

module.exports = {
  getMongo,
  getProductAll,
  getProductAllbyName
};
