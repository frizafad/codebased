'use strict';

const nconf = require('nconf');
const AppServer = require('./bin/app/server');
const configs = require('./bin/infra/configs/config');
const mongoConnectionPooling = require('./bin/helpers/databases/mongodb/connection');
configs.initEnvironments(nconf);
const appServer = new AppServer();
const port = process.env.port || nconf.get('PORT') || 1337;
appServer.server.listen(port, () => {
  mongoConnectionPooling.init();
  console.log('%s started, listening at %s', appServer.server.name, appServer.server.url);
});
