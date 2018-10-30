'use strict';

const AWS = require('aws-sdk');
const Emitter = require('../../events/event_emitter');
const config = require('../../../infra/configs/global_config');

class SNS{
  constructor(topicARN){
    this.topicARN = topicARN;
  }

  init(){
    AWS.config.update(config.getAWSCredential());
    this.sns = new AWS.SNS();
  }

  publishTopic(payload,topicARN=this.topicARN,eventType=null) {
    const sns = this.sns;
    (eventType) ? eventType = eventType : eventType = payload.eventType;
    return new Promise((resolve, reject) => {
      sns.publish({
        TopicArn:topicARN,
        Message:JSON.stringify(payload),
        Subject: eventType
      }, (err,data) => {
        if(err){
          return reject(err);
        }else{
          return resolve(data.MessageId);
        }
      });
    });
  } 
}

module.exports = SNS;