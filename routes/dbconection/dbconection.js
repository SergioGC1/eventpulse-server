import { config } from 'dotenv';
/* Llama a la función config para cargar las variables de entorno definidas 
en el archivo`.env` */
config();

const mysqlConnection = {
    getConection: () => {
        let configuration = {
            host: process.env.MYSQL_HOST,
            port: process.env.MYSQL_PORT,
            user: process.env.MYSQL_USER,
            password: process.env.MYSQL_PASSWORD,
            database: process.env.MYSQL_NAME,
            timezone : "+00:00"
        }
        return configuration
    }
}

export default mysqlConnection;