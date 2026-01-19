import AppError from '../../utils/appError.js';
import {signToken} from '../../utils/jwt.js';
import sql from '../../database/db.js'
import bcrypt from 'bcrypt'


export async function login(username, password) {
     const result = await sql`
    SELECT account_id, username, role, password_hash FROM account WHERE username = ${username};
    `
    if (result.length === 0) {
        throw new AppError('Incorrect username or username not found',404, ERROR_CODES.AUTH_USER_NOT_FOUND);
    }
    const user = result[0]
    const password_hash = result[0].password_hash;

    if (bcrypt.compare(password,password_hash)) {
        const token = signToken({
            id: user.account_id,
            username: user.username,
            role: user.role
        });
        return token;
    }
    else{
        throw new AppError('Invalid Password',400,ERROR_CODES.AUTH_INVALID_PASSWORD);
    }
}