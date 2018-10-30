'use strict';
const EventEmitter = require('events');

class MyEmitter extends EventEmitter {}
const myEmitter = new MyEmitter();

const emitEvent = (eventType, param1=null, param2=null, param3=null, param4=null) => {
   if(param1 && param2 && param3 && param4) {
       myEmitter.emit(eventType,param1,param2,param3,param4);
   }else if (param1 && param2 && param3){
       myEmitter.emit(eventType,param1,param2,param3);
   }else if (param1 && param2){
       myEmitter.emit(eventType,param1,param2);
   }else if (param1){
       myEmitter.emit(eventType,param1);
   }else{
       myEmitter.emit(eventType);
   }
}

const removeListener = () => {
   console.log(`Remove Listener`);
}

module.exports = {
   myEmitter: myEmitter,
   emitEvent: emitEvent,
   removeListener: removeListener
}