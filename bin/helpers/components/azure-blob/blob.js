'use strict';

const azure = require('azure-storage');
const wrapper = require('../../utils/wrapper');

class BLOB{
    constructor(config){
        this.blobSvc = azure.createBlobService(config);
    }

    async createBlob(container,blobName,file) {
       const blob = this.blobSvc;
       const result = await blob.createBlockBlobFromLocalFile(container, blobName, file, function(error, result, response){
        if(!error){
          console.log('file uploaded');
          return wrapper.data(true);
        }else{
          console.log(error);
          return wrapper.error(error);
        }
      });
      return result;
    }

    async removeBlob(container,blobName){
      const blob = this.blobSvc;
      console.log('blobName '+blobName);
      const result = await blob.deleteBlob(container,blobName,function(error, response){
        if(!error){
          console.log('file removed');
          return wrapper.data(true);
        }else{
          //console.log(error);
          return wrapper.error(error);
        }
      });
      return result;
    }
}

module.exports = BLOB;