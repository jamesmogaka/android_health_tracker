class ErrorHandler extends Error{
    //Defining the requirements for new error
    constructor(message,statusCode){
        super(message);
        this.statusCode = statusCode;

        //Attaching the stack trace to the error
        Error.captureStackTrace(this,this.constructor);
    }
}