const winston = require('winston');
const fs = require( 'fs' );
const path = require('path');
const sentryLog = require('../components/sentry/sentry_log');
winston.emitErrs = true;

const logDir = 'logs';

const mkdirSync = function (logDir) {
    try {
      fs.mkdirSync(logDir)
    } catch (err) {
      if (err.code !== 'EEXIST') throw err
    }
}

let logger = new winston.Logger({
    transports: [
        new winston.transports.File({
            level: 'info',
            filename: path.join(logDir,'/all-logs.log'),
            handleExceptions: true,
            json: true,
            maxsize: 5242880, //5MB
            maxFiles: 5,
            colorize: false,
            createDirectory: true
        }),
        new winston.transports.Console({
            level: 'debug',
            handleExceptions: true,
            json: false,
            colorize: true
        })
    ],
    exitOnError: false
});

let log = (context, message, scope) => {
    let obj = {
        context : context,
        message : message,
        scope : scope
    }
    sentryLog.sendError(obj);
    logger.info(obj);
};

module.exports = logger;
module.exports.stream = {
    write: function(message, encoding){
        logger.info(message);
    }
}
module.exports = {
    log : log
}