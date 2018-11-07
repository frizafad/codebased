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
  getCalenderbydate,
  getDetailPersonalBacklog,
  getPersonalBacklog
};
