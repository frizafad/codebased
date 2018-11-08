'use strict';

const modelA = () => {
  const model = {
    nama_project: '',
    datetime: '',
    po: ''
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

module.exports = {
  modelA,
  modelProductAll
};
