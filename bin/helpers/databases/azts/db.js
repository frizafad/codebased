'use strict';

const azts = require('azure-storage');
const Emitter = require('../../events/event_emitter');

class DB{
 constructor(connectionString){
   this.connectionString = connectionString;
 }

 setTable(tableName){
   this.tableName = tableName;
 }

 createTable(){
   const connectionString = this.connectionString;
   const tableName = this.tableName;
   return new Promise((resolve, reject)=> {
     try{
       const tableService = azts.createTableService(connectionString);
       tableService.createTableIfNotExists(tableName, (err, result, response) => {
         if (err) {
           Emitter.emitEvent('error',err.message);
           reject(err);
         }else {
           resolve(result);
         }
       });
     }catch(err){
       Emitter.emitEvent('error',err.message);
       reject(err);
     }
   });
 }

 insertEntity(entity) {
   const connectionString = this.connectionString;
   const tableName = this.tableName;
   return new Promise((resolve, reject)=> {
     try{
       const tableService = azts.createTableService(connectionString);
       tableService.insertEntity(tableName, entity, {echoContent: true}, (err, result, response) => {
         if (err) {
           Emitter.emitEvent('error',err.message);
           reject(err);
         }else {
           resolve(result);
         }
       });
     }catch(err){
       Emitter.emitEvent('error',err.message);
       reject(err);
     }
   });
 }

 insertOrReplaceEntity(entity) {
   const connectionString = this.connectionString;
   const tableName = this.tableName;
   return new Promise((resolve, reject)=> {
     try{
       const tableService = azts.createTableService(connectionString);
       tableService.insertOrReplaceEntity(tableName, entity, {echoContent: true}, (err, result, response) => {
         if (err) {
           Emitter.emitEvent('error',err.message);
           reject(err);
         }else {
           resolve(result);
         }
       });
     }catch(err){
       Emitter.emitEvent('error',err.message);
       reject(err);
     }
   });
 }

 insertOrMergeEntity(entity) {
   const connectionString = this.connectionString;
   const tableName = this.tableName;
   return new Promise((resolve, reject)=> {
     try{
       const tableService = azts.createTableService(connectionString);
       tableService.insertOrMergeEntity(tableName, entity, {echoContent: true}, (err, result, response) => {
         if (err) {
           Emitter.emitEvent('error',err.message);
           reject(err);
         }else {
           resolve(result);
         }
       });
     }catch(err){
       Emitter.emitEvent('error',err.message);
       reject(err);
     }
   });
 }

 retrieveEntity(partitionKey, rowKey) {
   const connectionString = this.connectionString;
   const tableName = this.tableName;
   return new Promise((resolve, reject)=> {
     try{
       const tableService = azts.createTableService(connectionString);
       tableService.retrieveEntity(tableName, partitionKey, rowKey, {echoContent: true}, (err, result, response) => {
         if (err) {
           Emitter.emitEvent('error',err.message);
           reject(err);
         }else {
           resolve(result);
         }
       });
     }catch(err){
       Emitter.emitEvent('error',err.message);
       reject(err);
     }
   });
 }
}

module.exports = DB;