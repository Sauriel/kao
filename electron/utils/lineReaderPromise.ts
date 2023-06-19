import LineReader from 'line-reader';

const LineReaderPromise = (file: string | NodeJS.ReadableStream, options: LineReaderOptions, iteratee: (line: string, last: boolean) => void) => new Promise<void>((resolve, reject) => {
  LineReader.eachLine(file, options, iteratee, function (err) {
    if (err) {
      reject(err);
    } else {
      resolve();
    }
  })
});

export default LineReaderPromise;