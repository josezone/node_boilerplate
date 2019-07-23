import { provide } from 'inversify-binding-decorators';
import { createLogger, Logger as Wlogger, LoggerOptions, transports } from 'winston';

import { LOGGER } from '../const/types';
import { FileTransportOptions, LoggerInterface } from './logger.interface';

@provide(LOGGER)
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

  constructor() {
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
