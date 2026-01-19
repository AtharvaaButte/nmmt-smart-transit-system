import sql from '../../database/db.js'

export async function addAdminInDB(username, phone_no, admin_nm, password_hash, created_by_id) {
    const result = await sql.begin(async (tsx) => {
        const resultAccount = await tsx`
        
        `
        const result = await tsx`
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
         
         RETURNING username, phone_no, admin_nm
         `;
         return result;
    })
    return result[0];
}