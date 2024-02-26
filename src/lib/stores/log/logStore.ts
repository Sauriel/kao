import { writable } from 'svelte/store';
import type { LogEntry, LogLevel } from './type';

const log = writable<LogEntry[]>([]);

function addMessage(level: LogLevel, message: string) {
  const entry: LogEntry = {
    timestamp: new Date(),
    message,
    level,
  };
  log.update((entries) => [...entries, entry]);
}

const logStore = {
  subscribe: log.subscribe,
  info: (message: string) => addMessage('info', message),
  warn: (message: string) => addMessage('warn', message),
  error: (message: string) => addMessage('error', message),
  clear: () => log.set([]),
};

export default logStore;
