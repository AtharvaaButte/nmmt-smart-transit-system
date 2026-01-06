import { addAdminInDB } from "./admin.service";


export async function createAdmin(req,res) {
    const user = req.user;
    const data = req.body.data;

    await addAdminInDB()
}