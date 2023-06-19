import { Worker } from 'worker_threads';

function runInNewThread(workerFile: string, payload: string) {
  return new Promise((resolve, reject) => {
    const worker = new Worker(workerFile);

    worker.on('message', (message) => {
      // Handle the result received from the new thread
      resolve(message);
    });

    worker.on('error', (error) => {
      // Handle any errors that occur in the new thread
      reject(error);
    });

    // Start the new thread by sending a message
    worker.postMessage(payload);
  });
}

export {
  runInNewThread
}