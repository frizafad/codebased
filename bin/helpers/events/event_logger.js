'use strict';

const Mongo = require('../databases/mongodb/db');
const wrapper = require('../utils/wrapper');
const Emitter = require('./event_emitter');
const config = require('../../infra/configs/global_config');

class EventLogger{
    constructor(data){
        this.eventType = data.eventType;
        this.data = data.payload;
        this.aggregateType = data.aggregateType;
        this.description = data.description;
        this.priority = data.priority;
        this.status = data.status;
    }

    getEventPayload(){
        const payload = {
            "timestamp":new Date().toISOString(),
            "eventType":this.eventType,
            "payload":this.data,
            "aggregateType":this.aggregateType,
            "description":this.description,
            "priority":this.priority,
            "status":this.status
        };
        return payload;
    }

    async createLog(payload=this.getEventPayload()){
        const document = payload;
        const db = new Mongo(config.getMongoEventLog());
        db.setCollection(document.aggregateType);
        const parameter = {"payload":document.payload};
        const updateQuery = {$set:document};
        const result = await db.upsertOne(parameter,updateQuery);
        return result;
    } 
}

module.exports = EventLogger;