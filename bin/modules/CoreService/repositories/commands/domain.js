'use strict';

const wrapper = require('../../../../helpers/utils/wrapper');
const model = require('./command_model');
const command = require('./command');

class CoreService {
  async postCalendar (data) {
    let result = await command.postCalendar(data);
    if (result.err) {
      return wrapper.error('fail', 'Data not found', 409);
    } else {
      let data = result.data;
      return wrapper.data(data, '', 200);
    }
  }
}
module.exports = CoreService;
