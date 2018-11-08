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

const personalscore = () => {
  const model = {
  id: '',
  name: '',
  imageUrl: '',
  keyPoints: [
  
  ],
  needImprovements: [
  
  ],
  rating: '',
  projectHistory: [
  
  ],
  title: ''
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
const modelDetail = () => {
  const model = {
    'description': '',
    'backlog': ''
  };
  return model;
};

module.exports = {
  modelQueue,
  modelCalendar,
  modelDetail,
  modelA,
  modelSquad,
  personalscore
};
