import { app, BrowserWindow, ipcMain } from 'electron';
import lookupDirectory from './utils/loadLibrary';

export function addEvents(win: BrowserWindow) {

  ipcMain.on('onAppMinimize', (event, arg) => {
    win.minimize();
  });

  ipcMain.on('onAppMaximize', (event, arg) => {
    if (win.isMaximized()) {
      win.unmaximize();
    } else {
      win.maximize();
    }
  });

  ipcMain.on('onAppClose', (event, arg) => {
    app.quit();
  });

  ipcMain.handle('loadDirectory', () => {
    const path = 'G:\\Andere Computer\\Mein Computer\\Google Drive Avatare';
    return lookupDirectory(path);
  });
}
