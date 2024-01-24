import { Logger } from '../../core/ports/logger';

export class DummyLogger extends Logger {
  log(message: string, context?: string): void {}
  error(message: string, trace?: string, context?: string): void {}
  warn(message: string, context?: string): void {}
  debug(message: string, context?: string): void {}
  verbose(message: string, context?: string): void {}
}