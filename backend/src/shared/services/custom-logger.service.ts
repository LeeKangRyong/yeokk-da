import { Injectable, LoggerService, Scope } from '@nestjs/common';

export enum LogLevel {
  ERROR = 0,
  WARN = 1,
  LOG = 2,
  DEBUG = 3,
  VERBOSE = 4,
}

@Injectable({ scope: Scope.TRANSIENT })
export class CustomLogger implements LoggerService {
  private context?: string;

  setContext(context: string) {
    this.context = context;
  }

  log(message: string, context?: string) {
    this.printMessage('LOG', message, context);
  }

  error(message: string, trace?: string, context?: string) {
    this.printMessage('ERROR', message, context);
    if (trace) {
      console.error(trace);
    }
  }

  warn(message: string, context?: string) {
    this.printMessage('WARN', message, context);
  }

  debug(message: string, context?: string) {
    this.printMessage('DEBUG', message, context);
  }

  verbose(message: string, context?: string) {
    this.printMessage('VERBOSE', message, context);
  }

  private printMessage(level: string, message: string, context?: string) {
    const timestamp = new Date().toISOString();
    const ctx = context || this.context || 'Application';
    const formattedMessage = `[${timestamp}] [${level}] [${ctx}] ${message}`;

    switch (level) {
      case 'ERROR':
        console.error(formattedMessage);
        break;
      case 'WARN':
        console.warn(formattedMessage);
        break;
      case 'DEBUG':
        console.debug(formattedMessage);
        break;
      case 'VERBOSE':
        console.log(formattedMessage);
        break;
      default:
        console.log(formattedMessage);
    }
  }
}
