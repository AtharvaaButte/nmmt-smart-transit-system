import express from 'express'   
import { login } from './auth.controller.js';

const router = express.Router();

// APIs

// Login API

router.post('/login',login)

export default router;
