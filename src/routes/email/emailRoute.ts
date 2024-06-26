import { Router } from 'express';
import EmailController from '../../controllers/email';

const emailRoute: Router = Router();

emailRoute.post('/', EmailController.sendMessage);

export { emailRoute };
