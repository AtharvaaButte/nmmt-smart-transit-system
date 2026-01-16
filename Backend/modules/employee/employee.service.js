import sql from '../../database/db.js'

export async function addEmployeeInDB(emp_nm, username, emp_phone_no, password_hash, role, created_by) {

    const result = await sql `INSERT INTO employee (
    emp_nm, 
    username, 
    phone_no, 
    password_hash, 
    role, 
    created_by
    ) 

    VALUES (
    
    ${emp_nm},
    ${username},
    ${emp_phone_no}, 
    ${password_hash}, 
    ${role}, 
    ${created_by}
    )
    RETURNING emp_nm, username, phone_no, role
    `
    return result[0];
}
