import { contextBridge, ipcRenderer } from 'electron';

// Expose ipcRenderer to the client
contextBridge.exposeInMainWorld('ipcRenderer', {
  send: (channel: string, data: any) => {
    let validChannels = [
      'onAppMinimize',
      'onAppMaximize',
      'onAppClose',
      'loadLibrary',
      'initialize'
    ] // <-- Array of all ipcRenderer Channels used in the client
    if (validChannels.includes(channel)) {
      ipcRenderer.send(channel, data)
    }
  },
  receive: (channel: string, func: (agrs: any[]) => void) => {
    let validChannels = [
      'onLibraryLoaded',
      'onInitialized'
    ] // <-- Array of all ipcMain Channels used in the electron
    if (validChannels.includes(channel)) {
      // Deliberately strip event as it includes `sender`
      ipcRenderer.on(channel, (event, ...args) => func(args))
    }
  }
})
