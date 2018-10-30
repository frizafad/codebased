'use strict';

const Postgre = require('../../../../helpers/databases/postgresql/db');

const Query = async (parameter) => {
  try {
    let result = await Postgre.query(parameter);
    return result;
  } catch (error) {
    return error;
  }
};

module.exports = {
  Query: Query
};
