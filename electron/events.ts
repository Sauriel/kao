import { app, BrowserWindow, ipcMain, dialog } from 'electron';
import lookupDirectory from './utils/loadLibrary';
import settings from './utils/settings';
import type UiSettings from '../shared/models/settings';

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

  ipcMain.handle('loadDirectory', (event, path: string | undefined) => {
    settings.library.path.set(path);
    return lookupDirectory(settings.library.path.get());
  });

  ipcMain.handle('dialog:selectDirectory', () => {
    return dialog.showOpenDialog({ properties: ['openDirectory'] })
      .then(result => {
        if (result.canceled || result.filePaths.length === 0) {
          throw new Error('No valid directory selected.');
        }
        return result.filePaths[0];
      });
  });

  ipcMain.handle('getSettings', () => {
    return settings.ui.get();
  });

  ipcMain.on('setSettings', (event, arg: any[]) => {
    const value = arg[0] as UiSettings;
    settings.ui.set(value);
  });
}
