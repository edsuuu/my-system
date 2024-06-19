import { Router } from 'express';
import authController from '../controllers/auth';

const authRoute: Router = Router();

authRoute.post('/', authController.store);

export { authRoute };
