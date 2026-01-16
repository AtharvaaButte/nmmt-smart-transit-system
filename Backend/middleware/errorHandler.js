import AppError from "../utils/appError.js";
import { ERROR_CODES } from "../utils/errorCodes.js";

// JWT Error
const handleJWTError = () => new AppError('Invalid token. Please log in again!', 401, ERROR_CODES.AUTH_INVALID_TOKEN);
const handleJWTTokenExpireError = () => new AppError("Your token has expired! Please log in again.", 401, ERROR_CODES.AUTH_TOKEN_EXPIRED);

// DB Error
const uniqueKeyViolationError = (error) => {
    const regex = /Key \((.*?)\)=\((.*?)\)/;
    const match = error.detail.match(regex);

    const message = match 
        ? `Duplicate value '${match[2]}' entered for ${match[1]}. Please use another value!`
        : 'Duplicate field value entered.';
    return new AppError(message, 401, ERROR_CODES.DB_DUPLICATE_ENTRY);
}

const foreignKeyViolationError = (error) => {
    return new AppError("Invalid data reference. The related record does not exist.", 401, ERROR_CODES.DB_FOREIGN_KEY_FAIL);
}
const inavlidInputError = (error) => {
    return new AppError("Invalid input type. Please check your data format.", 401, ERROR_CODES.VAL_INVALID_INPUT);
}

export function globalErrorHandler(err, req, res, next) {
    console.log("Error");

    console.log(err);
    let error = { ...err }

    // Manually copy beacuse some times spred does not copy them
    error.name = err.name;
    error.message = err.message;
    error.code = err.code

    if (error.name === 'JsonWebTokenError') {
        error = handleJWTError();
    }
    if (error.name === 'TokenExpiredError') {
        error = handleJWTTokenExpireError()
    }
    if (error.code) {
        console.log(`DB error code: ${error.code}`);
        console.log(`DB error detail: ${error.detail}`);

        if (error.code === '23505') {
            error = uniqueKeyViolationError(error);
        }
        else if (error.code === '23503') {
            error = foreignKeyViolationError(error);
        }
        else {
            error = inavlidInputError(error);
        }

    }
    const statusCode = error.statusCode || 500;
    const appErrorCode = error.appErrorCode || 0;
    const message = error.isOperational ? error.message : "Internal Server Error";
    res.status(statusCode).json({ appErrorCode, message });
}