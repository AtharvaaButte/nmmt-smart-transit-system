import AppError from "../utils/appError";

// JWT Error
const handleJWTError = () => new AppError('Invalid token. Please log in again!',401);
const handleJWTTokenExpireError = () => new AppError("Your token has expired! Please log in again.",401);

export function globalErrorHandler(err,req,res,next) {
    console.log(err);
    let error = {...err}
    
    // Manually copy beacuse some times spred does not copy them
    error.name = err.name;
    error.message = err.message;
    error.code = err.code

    if(error.name ==='JsonWebTokenError'){
        error = handleJWTError();
    }
    if (error.name === 'TokenExpiredError') {
        error= handleJWTTokenExpireError()
    }
    if(error.code){
        console.log(`DB error code: ${error.code}`);
        console.log(`DB error detail: ${error.detail}`);
    }
    const statusCode = error.statusCode || 500;
    const message = error.isOperational? error.message : "Internal Server Error";
    res.status(statusCode).json({message});
}