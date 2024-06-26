import express, { Express } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import { homeRoute } from './routes/home/homeRoute';
import { emailRoute } from './routes/email/emailRoute';

dotenv.config();

const whitelist = ['http://localhost:5173'];

const corsOptions: cors.CorsOptions = {
    origin: function (origin, callback) {
        if (whitelist.indexOf(origin as string) !== -1 || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
};

class App {
    public app: Express;

    constructor() {
        this.app = express();
        this.middlewares();
        this.routes();
    }

    middlewares() {
        this.app.use(cors(corsOptions));
        this.app.use(helmet());
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(express.json());
    }

    routes() {
        this.app.use('/', homeRoute);
        this.app.use('/email', emailRoute);
    }
}

export default new App().app;
