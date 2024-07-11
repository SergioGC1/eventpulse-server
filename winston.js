"use strict";
import appRoot from 'app-root-path';
import { createLogger, transports as _transports } from 'winston';
import { config } from 'dotenv';
//Esta función carga las variables de entorno definidas en el archivo .env
config();

var options = {
  file: {
    level: process.env.WINSTON_FILELEVEL || 'info',
    filename: `${appRoot}/logs/app.log`,
    handleExceptions: true,
    json: true,
    maxsize: 5242880, // 5MB
    maxFiles: 5,
    colorize: false,
  },
  console: {
    level: process.env.WINSTON_CONSOLELEVEL || 'debug',
    handleExceptions: true,
    json: false,
    colorize: true,
  },
};

var logger = createLogger({
  transports: [
    new _transports.File(options.file),
    new _transports.Console(options.console)
  ],
  exitOnError: false, // do not exit on handled exceptions
});

logger.stream = {
  write: function(message, encoding) {
    logger.info(message);
  },
};

export default logger;
