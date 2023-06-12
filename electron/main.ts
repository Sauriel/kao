import { app, BrowserWindow, } from 'electron';
import installExtension, { VUEJS_DEVTOOLS } from 'electron-devtools-installer';
import path, { join } from 'path';
import WindowStateKeeper from './windowStateKeeper';
import { addEvents } from './events';

process.env.DIST = join(__dirname, '../dist');
process.env.PUBLIC = app.isPackaged ? process.env.DIST : join(process.env.DIST, '../public');

let win: BrowserWindow;

async function createWindow() {
  const windowStateKeeper = new WindowStateKeeper('main');

  win = new BrowserWindow({
    title: 'Main window',
    icon: path.resolve(process.env.PUBLIC, 'favicon.ico'),
    x: windowStateKeeper.state.x,
    y: windowStateKeeper.state.y,
    width: windowStateKeeper.state.width,
    height: windowStateKeeper.state.height,
    frame: false,
    transparent: true,
    webPreferences: {
      webSecurity: false,
      preload: path.join(__dirname, 'preload.js'),
      devTools: !!process.env.VITE_DEV_SERVER_URL,
      nodeIntegration: false,
      contextIsolation: true
    },

  });

  windowStateKeeper.track(win);

  // You can use `process.env.VITE_DEV_SERVER_URL` when the vite command is called `serve`
  if (process.env.VITE_DEV_SERVER_URL) {
    // Install Astro Devtools
    try {
      await installExtension('pfefekfhnmbfcofpjojnpmhdakcadeil');
    } catch (e) {
      console.error('Astro Devtools failed to install:', e);
    }
    // Install Vue Devtools
    try {
      await installExtension(VUEJS_DEVTOOLS);
    } catch (e) {
      console.error('Vue Devtools failed to install:', e);
    }

    win.loadURL(process.env.VITE_DEV_SERVER_URL);
    // win.webContents.openDevTools();
    const devToolsStateKeeper = new WindowStateKeeper('devTools');
    const devtools = new BrowserWindow({
      x: devToolsStateKeeper.state.x,
      y: devToolsStateKeeper.state.y,
      width: devToolsStateKeeper.state.width,
      height: devToolsStateKeeper.state.height
    });
    if (devToolsStateKeeper.state.isMaximized) {
      devtools.maximize();
    }
    win.webContents.setDevToolsWebContents(devtools.webContents)
    win.webContents.openDevTools({ mode: 'detach' });

    devToolsStateKeeper.track(devtools);

  } else {
    // Load your file
    win.loadFile('dist/index.html');
  }
  win.show();
}

app.whenReady().then(() => {
  createWindow();
  addEvents(win);
})