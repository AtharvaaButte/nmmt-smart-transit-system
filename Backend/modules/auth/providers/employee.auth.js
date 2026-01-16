import sql from '../../../database/db.js'
import bcrypt from 'bcrypt'
import AppError from '../../../utils/appError.js'
import { ERROR_CODES } from '../../../utils/errorCodes.js'
import { signToken } from '../../../utils/jwt.js'
import { ROLES } from '../../../utils/role.js'

export async function employeeLogin(username,password) {
    const result = await sql`
    SELECT username, password_hash FROM employee WHERE username = ${username};
    `
    if (result.length === 0) {
        throw new AppError('Incorrect username or username not found',404, ERROR_CODES.AUTH_USER_NOT_FOUND);
    }
    const employee_id = result[0].username;
    const password_hash = result[0].password_hash;

    if (bcrypt.compare(password,password_hash)) {
        const token = signToken({
            id: employee_id,
            role: ROLES.EMPLOYEE
        });
        return token;
    }
    else{
        throw new AppError('Invalid Password',400,ERROR_CODES.AUTH_INVALID_PASSWORD);
    }
}