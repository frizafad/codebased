'use strict';

const config = require('../../../../infra/configs/global_config');
const Mongo = require('../../../../helpers/databases/mongodb/db');

const getMongo = async () => {
  const db = new Mongo(config.getDatabaseUrl());
  db.setCollection('backlogs');
  const recordset = await db.findMany();
  return recordset;
};

const getProduct = async (item) => {
  const db = new Mongo(config.getDatabaseUrl());
  db.setCollection('products');
  const recordset = await db.innerJoin(
    [
    { 
      $match: {squadId: "squad1"} 
    },{
      $lookup:
      {
        from: 'squads',
        localField: 'squadId',
        foreignField: 'id',
        as: 'squad',
      }},
    {$unwind : "$squad"},
    // {$match : {sprintId: "SP001"}},
    // // {$group : { squadId : "$squadId", squads : {$push : "$squadId"}}},
    // {$lookup: {from: "sprints", localField: "sprintId",foreignField: "id",as: "sprint"}},
    // {$unwind : "$sprint"},
    // // {$group: {id: '$id', sprints : {$push : "$id"}}}
    ]
  );
  return recordset;
};


const getSquad = async () => {
  const db = new Mongo(config.getDatabaseUrl());
  db.setCollection('squads');
  const recordset = await db.innerJoin(
    [{ 
      $match: {sprintId: "SP001"} 
    },{
      $lookup:
      {
        from: 'sprints',
        localField: 'sprintId',
        foreignField: 'id',
        as: 'sprint',
      }    
    },{$unwind : '$sprint'}]);
  return recordset;
};

const innerSquad = async (data) => {
  const db = new Mongo(config.getDatabaseUrl());
    db.setCollection('squads');    
    const recordset = await db.innerJoin(
      [{ 
        $match: {sprintId: "SP001"} 
      },{
        $lookup:
        {
          from: 'sprints',
          localField: 'sprintId',
          foreignField: 'id',
          as: 'sprint',
        }    
      },{$unwind : '$sprint'}]);
    return recordset;
};


module.exports = {
  getMongo,
  getProduct,
  innerSquad,
  getSquad,

};
