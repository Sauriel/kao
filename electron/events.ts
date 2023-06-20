import { app, BrowserWindow, ipcMain, dialog, shell } from 'electron';
import lookupDirectory from './utils/loadLibrary';
import settings from './utils/settings';
import type UiSettings from '../shared/models/settings';
import filterDirectory from './utils/filter';

export function addEvents(win: BrowserWindow) {

  ipcMain.on('onAppMinimize', (event, arg) => win.minimize());

  ipcMain.on('onAppMaximize', (event, arg) => {
    if (win.isMaximized()) {
      win.unmaximize();
    } else {
      win.maximize();
    }
  });

  ipcMain.on('onAppClose', (event, arg) => app.quit());

  ipcMain.handle('loadDirectory', (event, path: string | undefined) => {
    let directoryPath = path;
    if (!directoryPath || directoryPath.trim() === '') {
      return lookupDirectory(settings.library.path.get(), true);
    } else {
      return lookupDirectory(directoryPath);
    }
  });

  ipcMain.handle('dialog:selectDirectory', () => {
    return dialog.showOpenDialog({ properties: ['openDirectory'] })
      .then(result => {
        if (result.canceled || result.filePaths.length === 0) {
          throw new Error('No valid directory selected.');
        }
        const path = result.filePaths[0];
        settings.library.path.set(path);
        return path;
      });
  });

  ipcMain.handle('getSettings', () => settings.ui.get());

  ipcMain.handle('getLibraryPath', () => settings.library.path.get());

  ipcMain.on('setSettings', (event, value: UiSettings) => settings.ui.set(value));

  ipcMain.handle('showFileInOS', (event, path: string) => shell.showItemInFolder(path));

  ipcMain.handle('searchDirectory', (event, searchTerm: string) => filterDirectory(searchTerm));
}
