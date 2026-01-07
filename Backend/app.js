import express from 'express';
import authRouter  from './modules/auth/auth.routes.js';
const app = express();

app.use(express.json());
 
app.use('/api',authRouter);

export default app;