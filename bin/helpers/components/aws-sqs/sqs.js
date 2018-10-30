'use strict';

const AWS = require('aws-sdk');
const config = require('../../../infra/configs/global_config');

class SQS{
    constructor(config){
        this.config = config;
    }

    init(){
        AWS.config.update(config.getAWSCredential());
        this.sqs = new AWS.SQS();
    }

    receiveQueue(cb) {
        const sqs = this.sqs;
        const config = this.config;
        sqs.receiveMessage(config,(err,data) => {
            if(err) {
                cb(err,null,null);
            }else if(data.Messages) {
                const message = data.Messages[0],
                receipt = message.ReceiptHandle,
                body = JSON.parse(message.Body);
                cb(null,body.Message,receipt);
            }else {
                cb(null,``,null);
            }
        });   
    }

    removeQueue(receiptHandle) {
        const sqs = this.sqs;
        const config = this.config;
        sqs.deleteMessage({
            QueueUrl: config.QueueUrl,
            ReceiptHandle: receiptHandle
        }, (err,data) => {
        (err) ? console.log(`err, ${err}`) : console.log(`Message Deleted`);
    });
  };
}

module.exports = SQS;