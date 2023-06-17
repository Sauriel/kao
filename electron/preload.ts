import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('electronAPI', {
  loadDirectory: () => ipcRenderer.invoke('loadDirectory'),
  showSelectDirectoryDialog: () => ipcRenderer.invoke('dialog:selectDirectory'),
  getSettings: () => ipcRenderer.invoke('getSettings'),
  getLibraryPath: () => ipcRenderer.invoke('getLibraryPath')
});

// Expose ipcRenderer to the client
contextBridge.exposeInMainWorld('ipcRenderer', {
  loadDirectory: () => ipcRenderer.invoke('loadDirectory'),

  send: (channel: string, ...args: any[]) => {
    let validChannels: string[] = [
      'onAppMinimize',
      'onAppMaximize',
      'onAppClose',
      'setSettings'
    ] // <-- Array of all ipcRenderer Channels used in the client
    if (validChannels.includes(channel)) {
      ipcRenderer.send(channel, args)
    }
  },

  receive: (channel: string, func: (...args: any[]) => void) => {
    let validChannels: string[] = [] // <-- Array of all ipcMain Channels used in the electron
    if (validChannels.includes(channel)) {
      // Deliberately strip event as it includes `sender`
      ipcRenderer.on(channel, (event, ...args) => func(args))
    }
  }
})
