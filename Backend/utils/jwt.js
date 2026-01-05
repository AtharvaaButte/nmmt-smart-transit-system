import jwt from "jsonwebtoken";
import { getJWTSecret, getJWTTokenExpireTime } from '../config/env'

export function signToken(paylaod) {
    return jwt.sign(paylaod, getJWTSecret(), {
        expiresIn: getJWTTokenExpireTime()
    });
}

export function verifyToken(token) {
    return jwt.verify(token,getJWTSecret())
}