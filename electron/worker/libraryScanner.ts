import scanDirectoryAndPersist from "../utils/libraryDatabase";

const { parentPort } = require('worker_threads');

parentPort.on('message', (message: string) => {

  scanDirectoryAndPersist(message)
    .then(() => {
      parentPort.postMessage('Task completed!');
    })
    .catch(err => {
      parentPort.postMessage('Task failed! ' + err);
    });
});