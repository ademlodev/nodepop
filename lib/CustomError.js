"use strict";


class CustomError extends Error {
    constructor(key, status) {
        super();
        let message = null;
        console.log('name: ' + key)
        Error.captureStackTrace(this, this.constructor);
      
        this.name = key; // this.constructor.name;
        message = __(key);
      
        console.log('Message: ' + message)
        this.message =  message || 'Something went wrong. Please try again.';
      
        console.log('status: ' + status)
        this.status = status || 500;
    }

}

module.exports = CustomError;