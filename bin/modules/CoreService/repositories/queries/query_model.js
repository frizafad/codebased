'use strict';

const modelA = () => {
  const model = {
    nama_project: '',
    datetime: '',
    po: ''
  };
  return model;
};

const modelSquad = () => {
  const model = {
    squadid: '',
    backlogId: ''
  };
  return model;
};

module.exports = {
  modelA,
  modelSquad
};
