class AppError extends Error {

    constructor(message,statusCode,appErrorCode) {
        super(message);
        this.statusCode = statusCode; //Stadard Error
        this.appErrorCode = appErrorCode;  //Custome Error Code
         this.isOperational = true;
        Error.captureStackTrace(this,this.constructor)
    }
}

export default AppError;