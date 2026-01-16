import AppError from '../../utils/appError.js';
import {superAdminLogin} from './providers/super-admin.auth.js';
import {adminLogin} from './providers/admin.auth.js';
import {employeeLogin} from './providers/employee.auth.js'
import {ROLES} from '../../utils/role.js'
import { ERROR_CODES } from '../../utils/errorCodes.js';
export async function login(username, password, role) {
    let token;
    switch (role) {
        case ROLES.SUPER_ADMIN:
            token = await superAdminLogin(username,password)
            break;
        
        case ROLES.ADMIN:
             token = await adminLogin(username,password)
            break;

        case ROLES.EMPLOYEE:
             token = await employeeLogin(username,password)
            break; 

        case "EMPLOYEE":

            break;

        case "PASSENGER":

            break;

        default:
            throw new AppError(`Invalid role: ${role}. Please provide a valid role.`, 400,ERROR_CODES.AUTH_INVALID_ROLE)
    }
    return token;
}