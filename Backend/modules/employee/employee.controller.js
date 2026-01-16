import bcrypt from 'bcrypt'
import { addEmployeeInDB } from './employee.service.js';

export async function createEmployee(req, res) {
    
    const adminUser = req.user;
    const { employeeName, userName, password, role, phoneNO } = req.body;

    const hash = await bcrypt.hash(password,10);

    const newEmployee = await addEmployeeInDB(employeeName,userName,phoneNO,hash,role,adminUser.id);
    
    res.status(200).json({
        status: 'success',
        data: {employee: newEmployee}
    })
}