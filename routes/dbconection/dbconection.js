import { config } from 'dotenv';
/* Llama a la función config para cargar las variables de entorno definidas 
en el archivo`.env` */
config();

const mysqlConnection = {
    getConection: () => {
        let configuration = {
            host: process.env.DB_HOST,
            port: process.env.DB_PORT,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_DATABASE,
            timezone : "+00:00"
        }
        return configuration
    }
}

export default mysqlConnection;