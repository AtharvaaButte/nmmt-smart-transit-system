import bcrypt from 'bcrypt'
import { addEmployeeInDB } from './employee.service.js';

export async function createEmployee(req, res) {
    
    const adminUser = req.user;
    const { employeeName, userName, password, role, mobileNo, profile_img_url } = req.body;

    const hash = await bcrypt.hash(password,10);

    const newEmployee = await addEmployeeInDB(employeeName, userName, mobileNo, hash,profile_img_url, role, adminUser.id);
    
    res.status(200).json({
        status: 'success',
        data: {employee: newEmployee}
    })
}