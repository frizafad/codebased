'use strict';

const config = require('../../../../infra/configs/global_config');
const Mongo = require('../../../../helpers/databases/mongodb/db');

const postCalendar = async (data) => {
  const db = new Mongo(config.getDatabaseUrl());
  db.setCollection('calendar');
  const recordset = await db.insertOne({
    'id': data.id,
    'judul': data.judul,
    'description': data.description,
    'location': data.location,
    'startTime': data.startTime,
    'finishTime': data.finishTime,
    'createdAt': data.createdAt,
    'createdBy': data.createdBy,
    'modifiedAt': data.createdAt,
    'modifiedBy': data.createdBy
  });
  return recordset;
};
module.exports = {
<<<<<<< HEAD
=======

>>>>>>> 4ab6140f745a8165b79e57d1cd96a0e0ad4d063a
  postCalendar: postCalendar
};
