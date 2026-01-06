import { verifyToken } from '../utils/jwt.js'
import AppError from '.././utils/appError.js'
// 
export function authenticate(req, res, next) {
 
        const authHeader = req.headers.authorization;
        if (!authHeader || authHeader.startsWith('Bearer ')) {
            return new AppError('Authentication failed: Missing Bearer token!',401);
        }
        const token = authHeader.split(' ')[1];
        const payload = verifyToken(token)
        req.user = payload;
        next();
}