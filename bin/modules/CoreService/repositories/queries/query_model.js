'use strict';

const modelA = () => {
  const model = {
    backlogType: ''
  };
  return model;
};

const modelProductAll = () => {
  const model = {
    nameProduct: '',
    startProject: '',
    unit: '',
    ver: ''
  };
  return model;
};

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
    modifiedBy: ''
  };
  return model;
};

module.exports = {
  modelA,
  modelProductAll,
  modelCalendar
};
