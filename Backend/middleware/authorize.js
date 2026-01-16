import AppError from "../utils/appError.js";
import { ERROR_CODES } from "../utils/errorCodes.js";

export function authorize(...allowedRoles) {
    return (req,res,next)=>{
        console.log("Authoring...");
        
        if(!req.user){
            const error = new AppError('Unauthorized: No user found',401,ERROR_CODES.AUTH_USER_NOT_FOUND)
            next(error);
        }
        
        if (!allowedRoles.includes(req.user.role)) {
            const error =  new AppError("Forbidden: You don't have permission to perform this action.",403,ERROR_CODES.AUTH_FORBIDDEN)
            next(error);
        }
        
        next();
    }
}