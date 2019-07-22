import * as winston from 'winston';

export interface FileTransportOptions extends winston.LoggerOptions {
  filename?: string;
  maxsize: number;
  maxFiles: number;
}

export interface LoggerInterface {
  log: { write: (message: string) => void };
}
