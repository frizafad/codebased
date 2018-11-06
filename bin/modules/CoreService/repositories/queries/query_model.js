'use strict';

const modelA = () => {
  const model = {
    backlogType: ''
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
    backlog: '',
  };
  return model;
};

module.exports = {
  modelA,
  modelgetProduct,
  modelgetNotification
};
