import express from 'express'
import {authenticate} from '../../middleware/authenticate.js'
import {authorize} from '../../middleware/authorize.js'

const router = express.Router();


// Protected Routes:

// API 1: Create or Sign Up Admin
router.post('/create-admin',authenticate,authorize('super admin'))

