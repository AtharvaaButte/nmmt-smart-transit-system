import express from 'express'
import { authenticate } from '../../middleware/authenticate.js';
import { authorize } from '../../middleware/authorize.js';
import { ROLES } from '../../utils/role.js';
import {createRoute} from './route.controller.js'

const router = express.Router();

router.post('/create-route',authenticate,authorize(ROLES.ADMIN),createRoute)

export default router;
