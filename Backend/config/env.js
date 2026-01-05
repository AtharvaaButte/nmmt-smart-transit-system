import dotenv from 'dotenv'

dotenv.config();

export function getDBUrl() {
    return process.env.DATABASE_URL;
}

export function getJWTSecret() {
    return process.env.JWT_SECRET;
}

export function getJWTTokenExpireTime() {
    return process.env.JWT_EXPIRES_IN;
}

export function getAdminName() {
    return process.env.SUPER_ADMIN_USERNAME;
}