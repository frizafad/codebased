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

module.exports = {
  modelCalendar,
  personalscore
};
