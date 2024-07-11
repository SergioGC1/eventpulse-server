"use strict";
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import winston from './winston.js'; 
const app = express();

const appServer = {
    createServer: () => {
        winston.info('crear servidor');
        app.use(cors());
        app.use(bodyParser.urlencoded({ extended: false }));
        app.use(bodyParser.json());

        // aquí añadimos las rutas de api


        
        app.use((error, res) => {
            res.status(error.status || 500);
            res.json({
                error: {
                    message: error.message
                }
            });
        });
    },

    launchServer: () => {
        winston.info('servidor launched');
        const port = process.env.PORT || 8080;
        winston.info(`Server eventpulse listens at port ${port}`);
        // El servidor comienza a escuchar las solicitudes entrantes
        const server = app.listen(port, () => { });
    }
};

export default appServer;