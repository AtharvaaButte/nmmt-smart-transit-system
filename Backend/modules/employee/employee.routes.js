import express from 'express'
import {authenticate} from '../../middleware/authenticate.js'
import {authorize} from '../../middleware/authorize.js'
import {ROLES} from '../../utils/role.js'
import {createEmployee} from './employee.controller.js'

const router = express.Router();

router.post('/create-employee',authenticate,authorize(ROLES.ADMIN),createEmployee)

export default router;