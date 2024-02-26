export type LogLevel = 'info' | 'warn' | 'error';

export type LogEntry = {
  timestamp: Date;
  message: string;
  level: LogLevel;
};
