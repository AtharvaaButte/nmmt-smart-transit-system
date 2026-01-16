import bcrypt from 'bcrypt'
import sql from '../../../database/db.js'

import AppError from '../../../utils/appError.js';
import { signToken } from '../../../utils/jwt.js'
import { ERROR_CODES } from '../../../utils/errorCodes.js';
import { ROLES } from '../../../utils/role.js';

export async function adminLogin(username, password, role) {
    const result = await sql`
    SELECT admin_id, password_hash FROM admin where username = ${username}`;

    if (result.length === 0) {
        throw new AppError('Incorrect username or username not found', 404, ERROR_CODES.AUTH_USER_NOT_FOUND);
    }
    const admin_id = result[0].admin_id;
    const password_hash = result[0].password_hash

    if (bcrypt.compare(password, password_hash)) {
        const token = signToken({
            id: admin_id,
            role: ROLES.ADMIN
        })
        
        return token;
    } else {
        throw new AppError('Invalid Password', 404, ERROR_CODES.AUTH_INVALID_PASSWORD);
    }

}