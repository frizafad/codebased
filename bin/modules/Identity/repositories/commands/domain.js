'use strict';

const wrapper = require('../../../../helpers/utils/wrapper');
const command = require('../commands/command');
const model = require('./command_model');
const md5 = require('md5');
let usernameRegex = /^([a-zA-Z0-9.]){6,20}$/;
let passwordRegex = /^([a-zA-Z0-9@#*&.]){8,}$/;
const regexIdRetailer = /^[a-zA-Z0-9]{6,20}$/;
const regexPassword = /^[a-zA-Z0-9d@#*&]{8,}$/;
let idRetailerRegex = /^([a-zA-Z0-9@#*&.]){8,}$/;
const rString = require('randomstring');
const Utilities = require('../../../Utilities/utilities');

class Identity {
  
}

module.exports = Identity;
