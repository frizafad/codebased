'use strict';

const config = require('../../../infra/configs/global_config');
const Raven = require('raven');

const sendError = async (errorMessage) => {
    Raven.config(config.getSentryDSN()).install();
    Raven.captureException(errorMessage);
}

module.exports = {
    sendError: sendError
}