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

const modelQueue = () => {
  const model = {
    name: '',
    version: ''
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

const modelgetProduct = () => {
  const model = {
    id: '',
    productName: '',
    sprint: '',
    squad: '',
    member:
    [
      {
        talentId: '',
        talentName: '',
        talentRole: ''
      }
    ],
    stakeholder: [
      {
        unit: ''
      }
    ],
    note: ''
  };
  return model;
};

const modelgetNotification = () => {
  const model = {
    member: [
      {
        talentId: '',
        talentName: '',
        talentRole: ''
      }
    ],
    description: '',
    squad: '',
    backlog: ''
  };
  return model;
};

module.exports = {
  modelA,
  modelProductAll,
  modelgetProduct,
  modelgetNotification,
  modelQueue,
  modelCalendar,
  modelDetail,
  modelSquad
};
