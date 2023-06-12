declare global {
  interface Window {
    ipcRenderer: {
      send: (channel: string, ...args: any[]) => void,
      receive: (channel: string, func: (...args: any[]) => void) => void
    },
    electronAPI: {
      loadDirectory: () => Promise<DirOrFile[]>
    }
  }
}
export {};