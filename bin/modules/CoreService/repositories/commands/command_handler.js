'use strict';

const CoreService = require('./domain');
const postCalendar = async (data) => {
  const postData = async () => {
    const dataCalendar = new CoreService();
    const result = await dataCalendar.postCalendar(data);
    return result;
  };
  const response = await postData();
  return response;
};
module.exports = {
  postCalendar: postCalendar
};
