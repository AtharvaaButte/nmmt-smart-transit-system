
export function globalErrorHandler(err,req,res,next) {
    console.log(err);
    const statusCode = err.statusCode || 500;
    const message = 
    err.isOperational ? err.message : 'Internal Server Error';

    res.status(statusCode).json({message});
}