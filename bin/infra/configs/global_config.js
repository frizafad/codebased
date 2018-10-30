'use strict';

const nconf = require('nconf');

const getAuthAPI = () => {
  return nconf.get('AUTH_API_BASIC');
};

const getSentryDSN = () => {
  return nconf.get('DSN_SENTRY_URL');
};

const getDatabaseUrl = () => {
  return nconf.get('NAKAMA_DATABASE_URL');
};

module.exports = {
  getAuthAPI: getAuthAPI,
  getSentryDSN: getSentryDSN,
  getDatabaseUrl: getDatabaseUrl
};
