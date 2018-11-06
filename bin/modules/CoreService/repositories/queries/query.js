'use strict';

const config = require('../../../../infra/configs/global_config');
const Mongo = require('../../../../helpers/databases/mongodb/db');

const getMongo = async () => {
  const db = new Mongo(config.getDatabaseUrl());
  db.setCollection('backlogs');
  const recordset = await db.findMany();
  return recordset;
};

<<<<<<< HEAD
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
=======
const getCalenderbydate = async () => {
  const db = new Mongo(config.getDatabaseUrl());
  db.setCollection('calendar');
  const recordset = await db.findMany();
>>>>>>> 5bb3b39e4073186a59f9467209b9fd08a6722a00
  return recordset;
};

module.exports = {
  getMongo,
<<<<<<< HEAD
  getProductAll,
  getProductAllbyName
=======
  getCalenderbydate
>>>>>>> 5bb3b39e4073186a59f9467209b9fd08a6722a00
};
