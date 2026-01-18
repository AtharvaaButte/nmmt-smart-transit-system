import sql from '../../database/db.js'
import AppError from '../../utils/appError.js';
import { ERROR_CODES } from '../../utils/errorCodes.js';
import { EMPLOYEE_ROLES } from '../../utils/role.js'

export async function addTripInDB(route_id, bus_id, driver_id, conductor_id, start_time, end_time, status, created_by) {
    
    await Promise.all(
        [
            employeeRoleCheck(driver_id, EMPLOYEE_ROLES.DRIVER),
            employeeRoleCheck(conductor_id, EMPLOYEE_ROLES.CONDUCTOR)
        ]
    );

    const result = await sql`
    INSERT INTO trip 
    (
    route_id,
    bus_id,
    driver_id,
    conductor_id,
    start_time,
    end_time,
    status,
    created_by
    )
    VALUES
    (
    ${route_id},
    ${bus_id},
    ${driver_id},
    ${conductor_id},
    ${start_time},
    ${end_time},
    ${status},
    ${created_by}
    )
    RETURNING 

    trip_id,
    route_id,
    bus_id,
    driver_id,
    conductor_id,
    created_by,
    start_time,
    end_time
    `
    return result[0];

}


async function employeeRoleCheck(id, requiredRole) {
    const result = await sql`SELECT role FROM employee WHERE emp_id = ${id}`;
    if (result.length === 0) {
        throw new AppError(`${requiredRole} with ID ${id} does not exist`,404,ERROR_CODES.AUTH_USER_NOT_FOUND);
    }

    const actualRole = result[0].role;

    if (requiredRole !== actualRole) {
        throw new AppError(`Invalid Staff Role: The user you selected is a '${actualRole}', but this field requires a '${requiredRole}'.`,400,ERROR_CODES.AUTH_FORBIDDEN)
    }
    return true
}