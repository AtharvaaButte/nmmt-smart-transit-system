import { verifyToken } from '../utils/jwt.js'
import AppError from '.././utils/appError.js'
import {ERROR_CODES} from '.././utils/errorCodes.js' 
export function authenticate(req, res, next) {
        console.log("AUthticating...");
        
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            next( new AppError('Authentication failed: Missing Bearer token!',401,ERROR_CODES.AUTH_TOKEN_NOT_FOUND));
        }
        
        const token = authHeader.split(' ')[1];
        const payload = verifyToken(token)
        console.log(payload);
        
        req.user = payload;
        
        next();
}