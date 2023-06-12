function initKao() {
  return new Promise<any[]>((resolve, reject) => {
    window.ipcRenderer?.receive('onInitialized', (args: any[]) => {
      const result = args[0] as boolean;
      if (result) {
        resolve([]);
      } else {
        reject('ERROR');
      }
    });
    window.ipcRenderer?.send('initialize');
  });
}

export {
  initKao
}