import scanDirectoryAndPersist from "../utils/libraryDatabase";

const { parentPort } = require('worker_threads');

parentPort.on('message', (rootPath: string) => {

  scanDirectoryAndPersist(rootPath)
    .then((message) => {
      parentPort.postMessage(message);
    })
    .catch(err => {
      parentPort.postMessage(err);
    });
});