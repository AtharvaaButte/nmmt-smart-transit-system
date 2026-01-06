import AppError from "../utils/appError";

// JWT Error
const handleJWTError = () => new AppError('Invalid token. Please log in again!',401);
const handleJWTTokenExpireError = () => new AppError("Your token has expired! Please log in again.",401);

export function globalErrorHandler(err,req,res,next) {
    console.log(err);
    let error = {...err}
    
    error.name = err.name;
    error.message = err.message
    
    
    
    res.status(statusCode).json({message});
}