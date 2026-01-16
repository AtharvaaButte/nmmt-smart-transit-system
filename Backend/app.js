import express from 'express';
import authRouter  from './modules/auth/auth.routes.js';
import superAdminRouter from './modules/super-admin/super-admin.routes.js'
import employeeRouter from './/.//modules/employee/employee.routes.js'
import { globalErrorHandler } from './middleware/errorHandler.js';
const app = express();

app.use(express.json());
 
app.use('/auth',authRouter);

app.use('/super-admin',superAdminRouter);

app.use('/employee',employeeRouter);

app.use(globalErrorHandler);
export default app;