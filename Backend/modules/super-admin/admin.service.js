import sql from '../../database/db.js'

export async function addAdminInDB(username,phone_no,admin_nm,password_hash,created_by_id){
    const result = await sql`
     INSERT INTO admin (
     username,
     phone_no,
     admin_nm,
     password_hash,
     created_by 
    ) 
     VALUES(
     ${username},
     ${phone_no},
     ${admin_nm},
     ${password_hash},
     ${created_by_id})
     
     RETURNING *
     `;
    return result[0];
    }