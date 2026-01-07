import * as AuthService from './auth.service.js'

export async function login(req,res) {
    const {username, password, role} = req.body;
    const toekn =  await AuthService.login(username,password,role);
    res.json({toekn})
}