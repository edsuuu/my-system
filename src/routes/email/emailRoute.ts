import { Router } from 'express';
import EmailController from '../../controllers/email';

const emailRoute: Router = Router();

emailRoute.get('/', EmailController.index);

export { emailRoute };
