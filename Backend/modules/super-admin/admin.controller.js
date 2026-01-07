import { addAdminInDB } from "./admin.service";
import bcrypt from 'bcrypt' 

export async function createAdmin(req,res) {
    const user = req.user;
    const data = req.body.data;

    const hash = await bcrypt.hash(data.password,10);

    await addAdminInDB(data.userName, data.phoneNo, data.adminName, hash, user.id);
} 