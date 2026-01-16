import { addAdminInDB } from "./super-admin.service.js";
import bcrypt from 'bcrypt' 

export async function createAdmin(req,res) {
    console.log("Reciveng");
     
    const user = req.user;
    const {adminName, userName, password, phoneNo} = req.body;
    
    const hash = await bcrypt.hash(password,10);
    console.log(adminName, userName, password, phoneNo,hash);
    
    const newAdmin = await addAdminInDB(userName, phoneNo, adminName, hash, user.id);
    res.status(200).json({status: 'success', 
        data: {admin: newAdmin}
    });
}   