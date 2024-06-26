import { Router } from 'express';
import HomeController from '../../Controllers/HomeController';

const homeRoute: Router = Router();

homeRoute.get('/', HomeController.index);

export { homeRoute };
