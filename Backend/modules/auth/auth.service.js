import AppError from '../../utils/appError.js'
import {superAdminLogin} from './providers/super-admin.auth.js'

export async function login(username, password, role) {
    let token;
    switch (role) {
        case "SUPER-ADMIN":
            token = await superAdminLogin(username,password,role)
            break;

        case "ADMIN":

            break;

        case "EMPLOYEE":

            break;

        case "EMPLOYEE":

            break;

        case "PASSENGER":

            break;

        default:
            throw new AppError(`Invalid role: ${role}. Please provide a valid role.`, 400)
    }
    return token;
}