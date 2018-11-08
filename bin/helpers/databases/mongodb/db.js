/* eslint-disable no-dupe-class-members */
'use strict';

const mongoConnection = require('./connection');
const Emitter = require('../../events/event_emitter');
const wrapper = require('../../utils/wrapper');
const validate = require('validate.js');
const logger = require('../../utils/logger');

class DB {
  constructor (config) {
    this.config = config;
  }

  setCollection (collectionName) {
    this.collectionName = collectionName;
  }

  async findOne (parameter) {
    let ctx = 'mongodb-findOne';
    const config = this.config;
    const collectionName = this.collectionName;
    const result = await mongoConnection.getConnection(config);
    if (result.err) {
      logger.log(ctx, result.err.message, 'Error mongodb connection');
      return result;
    } else {
      try {
        const connection = result.data.db;
        const db = connection.collection(collectionName);
        const recordset = await db.findOne(parameter);
        if (validate.isEmpty(recordset)) {
          return wrapper.error(`Data Not Found`, `Please Try Another Input`, 404);
        } else {
          return wrapper.data(recordset);
        }
      } catch (err) {
        logger.log(ctx, err.message, 'Error find data in mongodb');
        return wrapper.error(`Error Find One Mongo ${err.message}`, `${err.message}`, 409);
      }
    }
  }
  async aggregate (parameter) {
    let ctx = 'mongodb-findOne';
    const config = this.config;
    const collectionName = this.collectionName;
    const result = await mongoConnection.getConnection(config);
    if (result.err) {
      logger.log(ctx, result.err.message, 'Error mongodb connection');
      return result;
    } else {
      try {
        const connection = result.data.db;
        const db = connection.collection(collectionName);
        const recordset = await db.aggregate(parameter).toArray();
        if (validate.isEmpty(recordset)) {
          return wrapper.error(`Data Not Found`, `Please Try Another Input`, 404);
        } else {
          return wrapper.data(recordset);
        }
      } catch (err) {
        logger.log(ctx, err.message, 'Error find data in mongodb');
        return wrapper.error(`Error Find One Mongo ${err.message}`, `${err.message}`, 409);
      }
    }
  }
  async findMany (parameter) {
    let ctx = 'mongodb-findMany';
    const config = this.config;
    const collectionName = this.collectionName;
    const result = await mongoConnection.getConnection(config);
    if (result.err) {
      logger.log(ctx, result.err.message, 'Error mongodb connection');
      return result;
    } else {
      try {
        const connection = result.data.db;
        const db = connection.collection(collectionName);
        const recordset = await db.find(parameter).toArray();
        if (validate.isEmpty(recordset)) {
          return wrapper.error(`Data Not Found`, `Please Try Another Input`, 404);
        } else {
          return wrapper.data(recordset);
        }
      } catch (err) {
        logger.log(ctx, err.message, 'Error find data in mongodb');
        return wrapper.error(`Error Find Many Mongo ${err.message}`, `${err.message}`, 409);
      }
    }
  }
  async aggregate (parameter) {
    let ctx = 'mongodb-aggregate';
    const config = this.config;
    const collectionName = this.collectionName;
    const result = await mongoConnection.getConnection(config);
    if (result.err) {
      logger.log(ctx, result.err.message, 'Error mongodb connection');
      return result;
    } else {
      try {
        const connection = result.data.db;
        const db = connection.collection(collectionName);
        const recordset = await db.aggregate(
          [{ $lookup:
                   {
                     from: 'squads',
                     localField: 'squadId',
                     foreignField: 'squadId',
                     as: 'validator'
                   }
          }]).toArray();
        if (validate.isEmpty(recordset)) {
          return wrapper.error(`Data Not Found`, `Please Try Another Input`, 404);
        } else {
          return wrapper.data(recordset);
        }
      } catch (err) {
        logger.log(ctx, err.message, 'Error find data in mongodb');
        return wrapper.error(`Error Find Many Mongo ${err.message}`, `${err.message}`, 409);
      }
    }
  }

  async insertOne (document) {
    let ctx = 'mongodb-insertOne';
    const config = this.config;
    const collectionName = this.collectionName;
    const result = await mongoConnection.getConnection(config);
    if (result.err) {
      logger.log(ctx, result.err.message, 'Error mongodb connection');
      return result;
    } else {
      try {
        const connection = result.data.db;
        const db = connection.collection(collectionName);
        const recordset = await db.insertOne(document);
        if (recordset.result.n !== 1) {
          return wrapper.error(`Internal Server Error`, `Failed Inserting Data to Database`, 500);
        } else {
          return wrapper.data(document, 'created', 201);
        }
      } catch (err) {
        logger.log(ctx, err.message, 'Error insert data in mongodb');
        return wrapper.error(`Error Insert One Mongo ${err.message}`, `${err.message}`, 409);
      }
    }
  }

  async insertMany (data) {
    let ctx = 'mongodb-insertMany';
    const document = data;
    const config = this.config;
    const collectionName = this.collectionName;
    const result = await mongoConnection.getConnection(config);
    if (result.err) {
      logger.log(ctx, result.err.message, 'Error mongodb connection');
      return result;
    } else {
      try {
        const connection = result.data.db;
        const db = connection.collection(collectionName);
        const recordset = await db.insertMany(document);
        if (recordset.result.n < 1) {
          return wrapper.error(`Internal Server Error`, `Failed Inserting Data to Database`, 500);
        } else {
          return wrapper.data(document, 'created', 201);
        }
      } catch (err) {
        logger.log(ctx, err.message, 'Error insert data in mongodb');
        return wrapper.error(`Error Insert Many Mongo ${err.message}`, `${err.message}`, 409);
      }
    }
  }

  async upsertOne (parameter, updateQuery) {
    let ctx = 'mongodb-upsertOne';
    const config = this.config;
    const collectionName = this.collectionName;
    const result = await mongoConnection.getConnection(config);
    if (result.err) {
      logger.log(ctx, result.err.message, 'Error mongodb connection');
      return result;
    } else {
      try {
        const connection = result.data.db;
        const db = connection.collection(collectionName);
        const data = await db.update(parameter, updateQuery, { upsert: true });
        if (data.result.nModified >= 0) {
          const nModified = data.result.nModified;
          const recordset = await this.findOne(parameter);
          if (nModified === 0) {
            return wrapper.data(recordset.data, 'created', 201);
          } else {
            return wrapper.data(recordset.data, 'updated', 204);
          }
        }
      } catch (err) {
        logger.log(ctx, err.message, 'Error upsert data in mongodb');
        return wrapper.error(`Error Upsert Mongo ${err.message}`, `${err.message}`, 409);
      }
    }
  }

  async findAllData (fieldName, row, page, param) {
    let ctx = 'mongodb-findAllData';
    const config = this.config;
    const collectionName = this.collectionName;
    const result = await mongoConnection.getConnection(config);
    if (result.err) {
      logger.log(ctx, result.err.message, 'Error mongodb connection');
      return result;
    } else {
      try {
        const connection = result.data.db;
        const db = connection.collection(collectionName);
        let parameterSort = {};
        parameterSort[fieldName] = 1;
        const parameterPage = row * (page - 1);
        const recordset = await db.find(param).sort(parameterSort).limit(row).skip(parameterPage).toArray();
        if (validate.isEmpty(recordset)) {
          return wrapper.error(`Data Not Found`, `Please Try Another Input`, 404);
        } else {
          return wrapper.data(recordset);
        }
      } catch (err) {
        logger.log(ctx, err.message, 'Error upsert data in mongodb');
        return wrapper.error(`Error Mongo`, `${err.message}`, 409);
      }
    }
  }

  async countData (param) {
    let ctx = 'mongodb-countData';
    const config = this.config;
    const collectionName = this.collectionName;
    const result = await mongoConnection.getConnection(config);
    if (result.err) {
      logger.log(ctx, result.err.message, 'Error mongodb connection');
      return result;
    } else {
      try {
        const connection = result.data.db;
        const db = connection.collection(collectionName);
        const recordset = await db.count(param);
        if (validate.isEmpty(recordset)) {
          return wrapper.error(`Data Not Found`, `Please Try Another Input`, 404);
        } else {
          return wrapper.data(recordset);
        }
      } catch (err) {
        logger.log(ctx, err.message, 'Error count data in mongodb');
        return wrapper.error(`Error Mongo`, `${err.message}`, 409);
      }
    }
  }
  async aggregatePersonalBacklog (_match, _unwind, parameter) {
    let ctx = 'mongodb-findMany';
    const config = this.config;
    const collectionName = this.collectionName;
    const result = await mongoConnection.getConnection(config);
    if (result.err) {
      logger.log(ctx, result.err.message, 'Error mongodb connection');
      return result;
    } else {
      try {
        const connection = result.data.db;
        const db = connection.collection(collectionName);
        const recordset = await db.aggregate(parameter).toArray();
        if (validate.isEmpty(recordset)) {
          return wrapper.error(`Data Not Found`, `Please Try Another Input`, 404);
        } else {
          return wrapper.data(recordset);
        }
      } catch (err) {
        logger.log(ctx, err.message, 'Error find data in mongodb');
        return wrapper.error(`Error Find Many Mongo ${err.message}`, `${err.message}`, 409);
      }
    }
  }

  async innerJoin (parameter) {
    let ctx = 'mongodb-findMany';
    const config = this.config;
    const collectionName = this.collectionName;
    const result = await mongoConnection.getConnection(config);
    if (result.err) {
      logger.log(ctx, result.err.message, 'Error mongodb connection');
      return result;
    } else {
      try {
        const connection = result.data.db;
        const db = connection.collection(collectionName);
        const recordset = await db.aggregate(parameter).toArray();
        if (validate.isEmpty(recordset)) {
          return wrapper.error(`Data Not Found`, `Please Try Another Input`, 404);
        } else {
          return wrapper.data(recordset);
        }
      } catch (err) {
        logger.log(ctx, err.message, 'Error find data in mongodb');
        return wrapper.error(`Error Find Many Mongo ${err.message}`, `${err.message}`, 409);
      }
    }
  }
}

module.exports = DB;
