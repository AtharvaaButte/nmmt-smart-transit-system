import { addAdminInDB } from "./super-admin.service.js";
import bcrypt from 'bcrypt' 

export async function createAdmin(req,res) {
    console.log("Reciveng");
     
    const user = req.user;
    const {userName, password, adminName,  mobile_no, profile_img_url} = req.body; 
    
    const password_hash = await bcrypt.hash(password,10);
    
    const newAdmin = await addAdminInDB(userName,  password_hash, adminName,  mobile_no, profile_img_url, user.id);
    res.status(200).json({status: 'success', 
        data: {admin: newAdmin}
    });
}   