import { signToken, verifyToken } from '../../../utils/jwt.js'
import sql from '../../../database/db.js'
import AppError from '../../../utils/appError.js'
import bcrypt from 'bcrypt'

export async function superAdminLogin(username, password, role) {
    const result = await sql`
    SELECT super_admin_id, password_hash FROM super_admin where username = ${username}`

    if (result.length === 0) {
        throw new AppError('Incorrect username or username not found', 404);
    }

    const super_admin_id = result[0].super_admin_id;
    const password_hash = result[0].password_hash;

    const isMatch = await bcrypt.compare(password, password_hash);

    if (isMatch) {
        console.log("Login Successful");
        const toekn = signToken(
            {
                id: super_admin_id,
                role
            })
            return toekn;
    } else {
        throw new AppError('Invalid Password', 404);
    }

}