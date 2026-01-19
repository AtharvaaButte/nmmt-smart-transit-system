import sql from '../../database/db.js'
import { ROLES } from '../../utils/role.js';

export async function addAdminInDB(username,  password_hash, admin_nm, mobile_no, profile_img_url, created_by_id) {
    const result = await sql.begin(async (tsx) => {
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
        ${admin_nm},
        ${mobile_no},
        ${profile_img_url},
        ${ROLES.ADMIN}
        )
        RETURNING account_id , username, mobile_no, name
        `
        const admin_id = resultAccount[0].account_id;

        await tsx`
         INSERT INTO admin (
         admin_id,
         created_by 
        ) 
         VALUES
         (
         ${admin_id},
         ${created_by_id}
         )         
         `;
        return resultAccount[0];
    })
    return result;
}