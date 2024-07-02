import { Router } from 'express';
import HomeController from '../../controllers/HomeController';

const homeRoute: Router = Router();

homeRoute.get('/', HomeController.index);

export { homeRoute };
