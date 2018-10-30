'use strict';

const MSSQL = require('../../databases/mssql/db');
const Mongo = require('../../databases/mongodb/db');
const SNS = require('../../components/aws-sns/sns');
const Emitter = require('../../events/event_emitter');
const EventPublisher = require('../../events/event_publisher');
const wrapper = require('../../../helpers/utils/wrapper');
const validate = require('validate.js')

class BATCH{
  constructor(data,configMongo,collection,database,topicARN,version=0,priority=1,status=1){
    this.data = data
    this.configMongo = configMongo;
    this.collection = collection;
    this.database = database
    this.topicARN = topicARN;
    this.version = version;
    this.priority = priority;
    this.status = status;
  }

  init(){
    const configMongo = this.configMongo;
    const collection = this.collection;
    this.mongo = new Mongo(configMongo);
    this.mongo.setCollection(collection);
  }

  async batchChecking(data){
    data = this.data
    const db = this.mongo;
    const parameter = {'payload':data}
    const recordset = await db.findOne(parameter);
    if(recordset.err) {
      (recordset.code!==404) ? Emitter.emitEvent('error',recordset.err) : this.batchWriting(data);     
    }else{
      Emitter.emitEvent('existed',JSON.stringify(recordset));
    }
  }

  getParameterWriting(record){
      let parameter
      let brandId = record.vBrandID
      if(brandId === null){
        parameter = {'payload':record}
      }else{
        parameter = {'payload.vBrandID':brandId}
      }
      return parameter
  }

  async batchWriting(record) {
    const db = this.mongo;
    const document = record;
    const parameter = this.getParameterWriting(record)
    const updateQuery = {$set:{payload : document}};
    const result = await db.upsertOne(parameter,updateQuery);
    if(result.err) {
      Emitter.emitEvent('error',result.err);
    }else{
      let nModified;
      if(result.code===201){
        nModified = 0
        this.batchInsert(document)
      }else{
        nModified = 1
        this.batchFindingObjectId(parameter,nModified);
      }
    }
  }

  async batchInsert(record) {
    const db = this.mongo
    const document = record
    const result = await db.insertOne({'payload':{document}})
    if(result.err){
      Emitter.emitEvent('error',result.err);
    }else{
      const parameter = this.getParameterWriting(record)
      this.batchFindingObjectId(parameter,0)
    }
  }

  async batchFindingObjectId(parameter,nModified) {
    const db = this.mongo;
    const recordset = await db.findOne(parameter);
    (recordset.err) ? Emitter.emitEvent('error',recordset.err) : this.batchPublishing(recordset.data,nModified);
  }

  async batchPublishing(data,nModified) {
    let eventType;
    let eventDescription;
    switch (nModified){
    case 0:
        eventType = `${this.collection}Created`;
        eventDescription = `create ${this.collection}`;
        break;
    case 1:
        eventType = `${this.collection}Updated`;
        eventDescription = `update ${this.collection}`;
        break;
    }
    const eventPublisher = new EventPublisher(eventType,data,this.version,data._id,this.database,eventDescription);
    const result = await eventPublisher.publishEvent(this.topicARN);
    const record = eventPublisher.getEventPayload()
    const db = this.mongo
    const parameter = this.getParameterWriting(record.payload)
    const updateQuery = {$set:record}
    const update = await db.upsertOne(parameter,updateQuery);
    const publishEvent = await eventPublisher.publishEventCore(eventType);
    (result.err) ? Emitter.emitEvent('error',result.err) : console.log(data);
  }
}

module.exports = BATCH;