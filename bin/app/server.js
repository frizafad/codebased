'use strict';

const restify = require('restify');
const cors = require('cors');
const project = require('../../package.json');
const basicAuth = require('../auth/basic_auth_helper');
const wrapper = require('../helpers/utils/wrapper');
const dashboardPerformance = require('../modules/CoreService/handlers/api_handler');

let AppServer = function () {
  this.server = restify.createServer({
    name: project.name + '-server',
    version: project.version,
    strictRouting: true
  });

  this.server.serverKey = '';
  this.server.use(restify.plugins.acceptParser(this.server.acceptable));
  this.server.use(restify.plugins.queryParser());
  this.server.use(restify.plugins.bodyParser());
  this.server.use(restify.plugins.authorizationParser());

  // required for CORS configuration
  this.server.use(cors());
  this.server.opts(/.*/, function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', req.header('Access-Control-Request-Method'));
    res.header('Access-Control-Allow-Headers', req.header('Access-Control-Request-Headers'));
    res.header('Access-Control-Expose-Headers', 'Authorization');
    res.header('Access-Control-Allow-Headers', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With,content-type,**Authorization**');
    res.send(200);
    return next();
  });

  // required for basic auth
  this.server.use(basicAuth.init());

  // anonymous can access the end point, place code bellow
  this.server.get('/', (req, res, next) => {
    wrapper.response(res, `success`, wrapper.data(`Code BackEnd`), `This service is running properly`);
  });

  this.server.get('/api/mongo', basicAuth.isAuthenticated, dashboardPerformance.getMongo);
<<<<<<< HEAD
  this.server.get('/product/getAll/:page', basicAuth.isAuthenticated, dashboardPerformance.getProductAll);
  this.server.get('/product/getAll/:name/:page', basicAuth.isAuthenticated, dashboardPerformance.getProductAllbyName);
=======
  this.server.post('/api/calendar/post', basicAuth.isAuthenticated, dashboardPerformance.postCalendar);
>>>>>>> 2de4373f15cca300c73b91eb43f8690a59519099
  this.server.get('/personal/calender/:startTime', basicAuth.isAuthenticated, dashboardPerformance.getCalenderbydate);
};
module.exports = AppServer;
