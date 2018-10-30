'use strict';

const Mongo = require('mongodb').MongoClient;
const wrapper = require('../../utils/wrapper');
const validate = require('validate.js');
const Emitter = require('../../events/event_emitter');
const config = require('../../../infra/configs/global_config');

let connectionPool = [];
const connection = () => {
  const connectionState = {index: null, config: '', db: null};
  return connectionState;
};
const init = () => {
  addConnectionPool();
  createConnectionPool();
};

const addConnectionPool = () => {
  const connectionMongo = connection();
  connectionMongo.index = 0;
  connectionMongo.config = config.getDatabaseUrl();
  connectionPool.push(connectionMongo);
};

const createConnectionPool = async () => {
  connectionPool.map(async (currentConnection, index) => {
    const result = await createConnection(currentConnection.config);
    if (result.err) {
      connectionPool[index].db = currentConnection;
    } else {
      connectionPool[index].db = result.data;
    }
  });
};

const createConnection = async (config) => {
  const options = {poolSize: 50, keepAlive: 15000, socketTimeoutMS: 15000, connectTimeoutMS: 15000};
  try {
    const connection = await Mongo.connect(config, options);
    return wrapper.data(connection);
  } catch (err)  {
    console.log(err);
    return wrapper.error(err, err.message, 503);
  }
};

const ifExistConnection = async (config) => {
  let state = {};
  connectionPool.map((currentConnection, index) => {
    if (currentConnection.config === config) {
      state = currentConnection;
    }
  });
  if (validate.isEmpty(state)) {
    return wrapper.error('Connection Not Exist', 'Connection Must be Created Before', 404);
  } else {
    return wrapper.data(state);
  }
};

const isConnected = async (state) => {
  const connection = state.db;
  if (!connection.serverConfig.isConnected()) {
    return wrapper.error('Connection Not Found', 'Connection Must be Created Before', 404, state);
  } else {
    return wrapper.data(state);
  }
};

const getConnection = async (config) => {
  let connectionIndex;
  const checkConnection = async () => {
    const result = await ifExistConnection(config);
    if (result.err) {
      return result;
    } else {
      const connection = await isConnected(result.data);
      connectionIndex = result.data.index;
      return connection;
    }
  };
  const result = await checkConnection();
  if (result.err) {
    const state = await createConnection(config);
    if (state.err) {
      return wrapper.data(connectionPool[connectionIndex]);
    } else {
      connectionPool[connectionIndex].db = state.data;
      return wrapper.data(connectionPool[connectionIndex]);
    }
  } else {
    return result;
  }
};

module.exports = {
  init: init,
  getConnection: getConnection
};
