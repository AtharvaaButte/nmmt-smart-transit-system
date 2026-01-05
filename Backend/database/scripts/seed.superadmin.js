import 'dotenv/config';
import bcrypt from 'bcrypt';
import sql from '../db.js';
import { geratePasswrod } from '../../utils/password.js';
import {getAdminName} from '../../config/env.js'

async function createSuperAdmin() { 

    const result = await sql`SELECT * FROM super_admin`;
    if (result.length > 0) {
        console.log('Super Admin already exists. Password will NOT be generated again.');
        process.exit(0)
    }

    const password = geratePasswrod(10);
    const salt = await bcrypt.genSalt(10);

    const passHash = await bcrypt.hash(password,salt);
    
    console.log(password);
    console.log("This password is generated only once. Store it securely.");

    await sql`INSERT INTO super_admin (username,password_hash) values (${getAdminName()}, ${passHash})`

}

createSuperAdmin().then(()=>{
console.log('Super Admin created successfully!');
process.exit(0);
})
.catch((err)=>{
    console.error('Failed to create Super Admin.');
    console.error(err.message);
    process.exit(1);
})