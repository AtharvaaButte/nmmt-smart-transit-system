import express from 'express'
import {authenticate} from '../../middleware/authenticate.js'
import {authorize} from '../../middleware/authorize.js'
import {ROLES} from '../../utils/role.js'
import {createBus} from './bus.controller.js'
const router = express.Router()

router.post('/create-bus',authenticate,authorize(ROLES.ADMIN),createBus)

export default router;