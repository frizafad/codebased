'use strict';
const modelCalendar = () => {
  const model = {
    id: '',
    judul: '',
    description: '',
    location: '',
    startTime: '',
    finishTime: '',
    createdAt: '',
    createdBy: '',
    modifiedAt: '',
    modifiedBy: '',
  };
  return model;
};

const modelQueue = () => {
  const model = {
    name : '',
    version : ''
  };
  return model;
};

module.exports = {
  modelQueue,
  modelCalendar
};
