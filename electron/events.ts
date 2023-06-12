import { app, BrowserWindow, ipcMain } from 'electron';
import fs from 'fs';

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

  ipcMain.on('loadLibrary', (event, arg) => {
    console.log('Searching for avatars');
    // const path = 'G:\\Andere Computer\\Mein Computer\\Google Drive Avatare';
    // fs.promises.readdir(path, { withFileTypes: true })
    //   .then(results => results.filter(result => result.isDirectory()))
    //   .then(dirs => dirs.map(dir => ({ name: dir.name, cover: path + '\\' + dir.name + '\\0.jpg' })))
    //   .then(dirs => dirs.sort())
    //   .then(directoryNames => {
    //     event.reply('onLibraryLoaded', directoryNames);
    //   })
    //   .catch(err => console.error(err));
  });

  ipcMain.on('initialize', (event, arg) => {
    event.reply('onInitialized', false);
  });
}
