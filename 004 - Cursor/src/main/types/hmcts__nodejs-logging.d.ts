declare module '@hmcts/nodejs-logging' {
  export interface LoggerInstance {
    info(message: string, ...meta: any[]): void;
    error(message: string, ...meta: any[]): void;
    warn(message: string, ...meta: any[]): void;
    debug(message: string, ...meta: any[]): void;
  }

  export class Logger {
    static getLogger(name: string): LoggerInstance;
  }
} 