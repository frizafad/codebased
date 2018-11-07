'use strict';

const modelA = () => {
  const model = {
<<<<<<< HEAD
    backlogType: ''
=======
    nama_project: '',
    datetime: '',
    po: ''
>>>>>>> e9a09ecc1b19735a8bf6ebe0ce5125d380cd6f58
  };
  return model;
};

<<<<<<< HEAD
const modelProductAll = () => {
  const model = {
    nameProduct: '',
    startProject: '',
    unit: '',
    ver: ''
=======
const modelSquad = () => {
  const model = {
    squadid: '',
    backlogId: ''
>>>>>>> e9a09ecc1b19735a8bf6ebe0ce5125d380cd6f58
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
<<<<<<< HEAD

  modelA,
  modelProductAll,
=======
  modelA,
  modelSquad,
>>>>>>> e9a09ecc1b19735a8bf6ebe0ce5125d380cd6f58
  modelCalendar
};
