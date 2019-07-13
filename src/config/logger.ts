import { createLogger, Logger as Wlogger, LoggerOptions, transports } from 'winston';

import { FileTransportOptions, LoggerInterface } from './logger.i';

class Logger implements LoggerInterface {
  private fileOptions: FileTransportOptions = {
    maxsize: 5242880, // 5MB
    maxFiles: 5,
  };

  private infoOptions: FileTransportOptions = {
    level: 'info',
    ...this.fileOptions,
    filename: 'info.log',
  };

  private exceptionOptions: FileTransportOptions = {
    level: 'error',
    ...this.fileOptions,
    filename: 'exceptions.log',
  };

  private consoleOptions: LoggerOptions = {
    level: 'debug',
  };

  private logger: Wlogger | undefined;

  init() {
    this.logger = createLogger({
      transports: [
        new transports.File(this.infoOptions),
        new transports.Console(this.consoleOptions),
      ],
      exceptionHandlers: [new transports.File(this.exceptionOptions)],
      exitOnError: false,
    });
  }

  log = {
    write: (message: string) => {
      this.logger!.info(message);
    },
  };
}

const logger = new Logger();
logger.init();

export const stream = logger.log;
