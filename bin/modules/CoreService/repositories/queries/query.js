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
>>>>>>> 2de4373f15cca300c73b91eb43f8690a59519099
  return recordset;
};

module.exports = {
  getMongo,
<<<<<<< HEAD
  getProductAll,
  getProductAllbyName
=======
  getCalenderbydate
>>>>>>> 2de4373f15cca300c73b91eb43f8690a59519099
};
