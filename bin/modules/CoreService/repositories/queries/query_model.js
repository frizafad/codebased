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

const modelDetail = () => {
  const model = {
    'description': '',
    'backlog': ''
  };
  return model;
};

module.exports = {
  modelCalendar,
  modelDetail
};
