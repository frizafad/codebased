'use strict';

module.exports.initEnvironments = (nconf) => {
  nconf.env().file('config.json');
  nconf.defaults({
    'PORT': 3000
  });
};
