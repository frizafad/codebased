'use strict';

const AWS = require('aws-sdk');
const Emitter = require('../../events/event_emitter');
const wrapper = require('../../utils/wrapper');
const config = require('../../../infra/configs/global_config');

class DB{
    constructor(config){
		this.config = config;
    }

    init(){
        AWS.config.update(this.config);
        this.docClient = new AWS.DynamoDB.DocumentClient();
    }

    async createItem(params) {
        const docClient = this.docClient;
        console.log("Creating item...");
        return new Promise((resolve, reject) => {
            docClient.put(params, (err,data) => {
                if (err) {
                    reject(wrapper.error(err));
                } else {
                    resolve(wrapper.data(data));
                }
            });
        });
    }

    async updateItem(params) {
        const docClient = this.docClient;
        console.log("Updating item...");
        return new Promise((resolve, reject) => {
            docClient.update(params, (err,data) => {
                if (err) {
                    reject(wrapper.error(err));
                } else {
                    resolve(wrapper.data(data));
                }
            });
        });
    }

    async readItem(params) {
        const docClient = this.docClient;
        console.log("Reading item...");
        return new Promise((resolve, reject) => {
            docClient.get(params, (err,data) => {
                if (err) {
                    reject(wrapper.error(err));
                } else {
                    resolve(wrapper.data(data));
                }
            });
        });
    } 
}

module.exports = DB;