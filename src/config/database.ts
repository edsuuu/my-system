import { config } from 'dotenv';

config();

interface DataBaseInterface {
    url: string;
}

const dbUser: string | undefined = process.env.DB_USER;
const dbPassword: string | undefined = process.env.DB_PASSWORD;
const dbName: string | undefined = process.env.DB_NAME;
const dbHost: string | undefined = process.env.DB_HOST;

if (!dbUser || !dbPassword || !dbName || !dbHost) {
    throw new Error('Uma ou mais variáveis de ambiente do banco de dados não estão definidas');
}

const databaseConfig: DataBaseInterface = {
    url: `mongodb+srv://${dbUser}:${dbPassword}@${dbHost}.srj7emp.mongodb.net/${dbName}?retryWrites=true&w=majority&appName=${dbHost}`,
};

export default databaseConfig;
