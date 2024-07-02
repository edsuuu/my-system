import express, { Express } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import mongoose from 'mongoose';
import databaseConfig from './config/database';
import { homeRoute } from './routes/home/homeRoute';
import { emailRoute } from './routes/email/emailRoute';

dotenv.config();

const whitelist = ['https://meuportfolio-edsu.ddns.net'];

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
        this.connectionDB();
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

    async connectionDB() {
        try {
            await mongoose.connect(databaseConfig.url);
            console.log('[server]: Conexão com o banco de dados feita com sucesso !');
        } catch (err) {
            console.error('[server-warning]: Erro ao conectar com o banco de dados !', err);
        }
    }
}

export default new App().app;
