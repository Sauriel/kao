import type { BrowserWindow } from 'electron';
import Store from 'electron-store';

const store = new Store();

export interface WindowState {
  x?: number;
  y?: number;
  width: number;
  height: number;
  isMaximized: boolean;
}

const DEFAULT_STATE: WindowState = {
  x: undefined,
  y: undefined,
  width: 800,
  height: 600,
  isMaximized: false
};

export default class WindowStateKeeper {
  private windowName: string;
  public state!: WindowState;
  private window!: BrowserWindow;

  constructor(windowName: string) {
    this.windowName = windowName;
    // Restore from store
    if (store.has(`windowState.${windowName}`)) {
      this.state = store.get(`windowState.${windowName}`) as WindowState;
    } else {
      this.state = {
        ...DEFAULT_STATE
      };
    }
  }

  private persistState() {
    if (!this.state.isMaximized) {
      const windowBounds = this.window.getBounds();
      this.state.x = windowBounds.x;
      this.state.y = windowBounds.y;
      this.state.width = windowBounds.width;
      this.state.height = windowBounds.height;
    }
    this.state.isMaximized = this.window.isMaximized();
    store.set(`windowState.${this.windowName}`, this.state);
  }

  public track(window: BrowserWindow) {
    this.window = window;
    ['resize', 'move', 'close'].forEach(event => {
      // @ts-ignore
      window.on(event, this.persistState.bind(this));
    });
  }
}
