import { Router } from 'express';
import HomeController from '../../controllers/home';

const homeRoute: Router = Router();

homeRoute.get('/', HomeController.index);

export { homeRoute };
