'use strict';

const modelA = () => {
  const model = {
    backlogType: ''
  };
  return model;
};
const modelCalendar = () => {
  const model = {
    id: '',
    description: '',
    location: '',
    dateTime: '',
    createdAt: '',
    createdBy: '',
    modifiedAt: '',
    modifiedBy: ''
  };
  return model;
};
module.exports = {
  modelA,
  modelCalendar
};
