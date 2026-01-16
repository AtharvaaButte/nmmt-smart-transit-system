import express from 'express'
import { authenticate } from '../../middleware/authenticate.js';
import { authorize } from '../../middleware/authorize.js';
import { ROLES } from '../../utils/role.js';
import {createStop} from './stop.controller.js'

const router = express.Router();

router.post('/create-stop',authenticate,authorize(ROLES.ADMIN),createStop)

export default router;