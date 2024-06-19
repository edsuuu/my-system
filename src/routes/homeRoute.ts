import { Router } from 'express';
import HomeController from '../controllers/Home';

const homeRoute: Router = Router();

homeRoute.get('/', HomeController.index);

export { homeRoute };
