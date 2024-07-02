import { Router } from 'express';
import EmailController from '../../controllers/EmailController';

const emailRoute: Router = Router();

emailRoute.post('/', EmailController.sendMessage);

export { emailRoute };
