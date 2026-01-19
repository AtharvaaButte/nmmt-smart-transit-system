import 'dotenv/config';
import bcrypt from 'bcrypt';
import sql from '../db.js';
import { geratePasswrod } from '../../utils/password.js';
import SUPER_ADMIN from '../../utils/superadmin.info.js'
import {ROLES} from '../../utils/role.js'

async function createSuperAdmin() { 
    
    
    const result = await sql`SELECT * FROM account WHERE role = ${ROLES.SUPER_ADMIN}`;
    if (result.length > 0) {
        console.log('Super Admin already exists. Password will NOT be generated again.');
        process.exit(0)
    }
    
    const password = geratePasswrod(10);
    const salt = await bcrypt.genSalt(10);

    const passHash = await bcrypt.hash(password,salt);
    
    console.log(password);
    console.log("This password is generated only once. Store it securely.");

    const r = await sql.begin(async (tsx)=>{
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
        ${SUPER_ADMIN.username},
        ${passHash},
        ${SUPER_ADMIN.name},
        ${SUPER_ADMIN.mobile_no},
        ${SUPER_ADMIN.profile_img_url},
        ${ROLES.SUPER_ADMIN}
        )
        RETURNING account_id
        `
        const account_id = resultAccount[0].account_id;
        
        await tsx`INSERT INTO super_admin (super_admin_id) values (${account_id})`
    })

}

createSuperAdmin().then(()=>{
console.log('Super Admin created successfully!');
process.exit(0);
})
.catch((err)=>{
    console.log(err);
    console.error(err.message);
    console.error('Failed to create Super Admin.');
    process.exit(1);
})