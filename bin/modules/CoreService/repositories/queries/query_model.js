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
<<<<<<< HEAD
  modelA,
  modelProductAll
=======
  modelCalendar
>>>>>>> 2de4373f15cca300c73b91eb43f8690a59519099
};
