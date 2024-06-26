import { Router } from 'express';
import EmailController from '../../Controllers/EmailController';

const emailRoute: Router = Router();

emailRoute.post('/', EmailController.sendMessage);

export { emailRoute };
