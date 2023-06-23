import fs from 'fs';
import { showCurrentFolder } from "../../../shared/showCurrentFolder.mjs";

export function cat(pathToFile) {
  const readableStream = fs.createReadStream(pathToFile);

  readableStream.on('data', (data) => {
    process.stdout.write(data + '\n');
    showCurrentFolder();
  });

  readableStream.on('err', (err) => {
    console.log(`Operation failed: ${err.message}`);
  });
}