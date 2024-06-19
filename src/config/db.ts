import { config } from 'dotenv';

// Carregar as variáveis de ambiente do arquivo .env
config();

// Definir uma interface para representar a configuração do banco de dados
interface DataBaseInterface {
  url: string;
}

// Ler as variáveis de ambiente necessárias para a configuração do banco de dados
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;
const dbName = process.env.DB_NAME;
const dbHost = process.env.DB_HOST;

// Verificar se todas as variáveis de ambiente necessárias estão definidas
if (!dbUser || !dbPassword || !dbName || !dbHost) {
  throw new Error('Uma ou mais variáveis de ambiente do banco de dados não estão definidas');
}

// Exportar a configuração do banco de dados como um módulo
const databaseConfig: DataBaseInterface = {
  url: `mongodb+srv://${dbUser}:${dbPassword}@${dbHost}.srj7emp.mongodb.net/${dbName}?retryWrites=true&w=majority&appName=${dbHost}`
};

export default databaseConfig;
