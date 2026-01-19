import sql from '../../database/db.js'
import { EMPLOYEE_ROLES, ROLES } from '../../utils/role.js';

export async function addEmployeeInDB(emp_nm, username, mobile_no, password_hash, profile_img_url, role, created_by_id) {
    const result = await sql.begin(async (tsx) => {
        console.log(`
            ${username},
            ${password_hash},
            ${emp_nm},
            ${mobile_no},
            ${profile_img_url},
            ${ROLES.EMPLOYEE}`);

        const resultAccount = await tsx`
            INSERT INTO account 
            (
            username, 
            password_hash, 
            name,
            mobile_no, 
            profile_img_url, 
            role 
            )
            VALUES
            (
            ${username},
            ${password_hash},
            ${emp_nm},
            ${mobile_no},
            ${profile_img_url},
            ${ROLES.EMPLOYEE}
            )
        RETURNING account_id , username, mobile_no, name
        `
        const employee_id = resultAccount[0].account_id;
        console.log(`
                 ${employee_id},
         ${role}
         ${created_by_id}`);

        await tsx`
         INSERT INTO employee (
         emp_id,
         role,
         created_by 
        ) 
         VALUES
         (
         ${employee_id},
         ${role},
         ${created_by_id}
         )         
         `;
        resultAccount[0].subrole = role;
        return resultAccount[0];

    })

    return result;
}
