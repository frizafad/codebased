'use strict';

const config = require('../../../../infra/configs/global_config');
const Mongo = require('../../../../helpers/databases/mongodb/db');

const getMongo = async () => {
  const db = new Mongo(config.getDatabaseUrl());
  db.setCollection('backlogs');
  const recordset = await db.findMany();
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

module.exports = {
  getMongo,
  getProduct,
  innerSquad,
  getSquad
};
