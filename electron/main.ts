import { app, BrowserWindow } from 'electron';
import installExtension, { VUEJS_DEVTOOLS } from 'electron-devtools-installer';
import path from 'path';
import WindowStateKeeper from './windowStateKeeper';
import { addEvents } from './events';
import runStartupTasks from './startup';

// The built directory structure
//
// ├─┬ dist-electron
// │ ├─┬ main
// │ │ └── index.js
// │ ├─┬ preload
// │ │ └── index.js
// │ ├─┬ renderer
// │ │ └── index.html

process.env.ROOT = path.join(__dirname, '..')
process.env.DIST = path.join(process.env.ROOT, 'dist-electron')
process.env.VITE_PUBLIC = process.env.VITE_DEV_SERVER_URL
  ? path.join(process.env.ROOT, 'public')
  : path.join(process.env.ROOT, '.output/public')
process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true'

let win: BrowserWindow
const preload = path.join(process.env.DIST, 'preload.js')

async function bootstrap() {
  const windowStateKeeper = new WindowStateKeeper('main');

  // win = new BrowserWindow({
  //   webPreferences: {
  //     preload,
  //     nodeIntegrationInWorker: true,
  //     contextIsolation: false,
  //     nodeIntegration: true,
  //     webSecurity: false,
  //   },
  // })

  win = new BrowserWindow({
    title: 'Main window',
    icon: path.resolve(process.env.VITE_PUBLIC!, 'favicon.ico'),
    x: windowStateKeeper.state.x,
    y: windowStateKeeper.state.y,
    width: windowStateKeeper.state.width,
    height: windowStateKeeper.state.height,
    frame: false,
    transparent: true,
    webPreferences: {
      preload,
      nodeIntegrationInWorker: true,
      contextIsolation: false,
      nodeIntegration: true,
      webSecurity: false,
    },
  });

  windowStateKeeper.track(win);

  if (process.env.VITE_DEV_SERVER_URL) {
    try {
      await installExtension(VUEJS_DEVTOOLS);
    } catch (e) {
      console.error('Vue Devtools failed to install:', e);
    }
    win.loadURL(process.env.VITE_DEV_SERVER_URL)
    // win.webContents.openDevTools()
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
    win.loadFile(path.join(process.env.VITE_PUBLIC!, 'index.html'));
  }
  win.show();
}

app.whenReady()
  .then(() => {
    bootstrap();
    runStartupTasks();
    addEvents(win);
  })
  .catch(e => console.error(e));