import { verifyToken } from '../utils/jwt.js'

// 
export function auth(req, res, next) {
 
        const authHeader = req.headers.authorization;
        if (!authHeader || authHeader.startsWith('Bearer ')) {
            const error = new Error('Authentication header not exicst!')
            error.statusCode = 401;
            error.isOperational = true;
            throw error;
        }
        const token = authHeader.split(' ')[1];
        const payload = verifyToken(token)
        req.user = payload;
        next();
}