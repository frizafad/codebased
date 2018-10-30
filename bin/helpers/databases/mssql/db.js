'use strict';

let sql = require('mssql');
const Emitter = require('../../events/event_emitter');
const wrapper = require('../../utils/wrapper');
const validate = require('validate.js');

class DB {
  constructor (config) {
    this.config = config;
    this.statePool = false;
  }

  getConnection () {
    return this.statePool;
  }

  setConnection () {
    this.statePool = true;
  }

  done () {
    this.connection.close();
    this.statePool = false;
  }

  createConnection () {
    this.connection = new sql.Connection(this.config);
    this.setConnection();
  }

  async findOne (statement) {
    const self = this;
    if (!self.statePool) {
      this.createConnection();
    }
    if (self.statePool) {
      try {
        const recordset = await self.connection.connect().then(async () => {
          const req = new sql.Request(self.connection);
          const recordset = await req.query(statement);
          self.done();
          if (validate.isEmpty(recordset)) {
            return wrapper.error(`Data Not Found`, `Please Try Another Input`, 404);
          } else {
            return wrapper.data(recordset[0]);
          }
        }).catch((err) => {
          self.done();
          return wrapper.error(err, err.message, 503);
        });
        return recordset;
      } catch (err) {
        self.done();
        return wrapper.error(err, err.message, 503);
      }
    }
  }

  async findMany (statement) {
    const self = this;
    if (!self.statePool) {
      this.createConnection();
    }
    if (self.statePool) {
      try {
        const recordset = await self.connection.connect().then(async () => {
          const req = new sql.Request(self.connection);
          const recordset = await req.query(statement);
          self.done();
          if (validate.isEmpty(recordset)) {
            return wrapper.error(`Data Not Found`, `Please Try Another Input`, 404);
          } else {
            return wrapper.data(recordset);
          }
        }).catch((err) => {
          self.done();
          return wrapper.error(err, err.message, 503);
        });
        return recordset;
      } catch (err) {
        self.done();
        return wrapper.error(err, err.message, 503);
      };
    }
  }

  async postOne (statement) {
    const self = this;
    if (!self.statePool) {
      this.createConnection();
    }
    if (self.statePool) {
      try {
        const recordset = await self.connection.connect().then(async () => {
          const req = new sql.Request(self.connection);
          const recordset = await req.query(statement);
          self.done();
          return wrapper.data(req.rowsAffected);
        }).catch((err) => {
          self.done();
          return wrapper.error(err, err.message, 503);
        });
        return recordset;
      } catch (err) {
        self.done();
        return wrapper.error(err, err.message, 503);
      }
    }
  }
}

module.exports = DB;
