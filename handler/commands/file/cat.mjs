import fs from 'fs';
import { showCurrentFolder } from "../../../shared/showCurrentFolder.mjs";

export function cat(pathToFile) {
  try {
    const readableStream = fs.createReadStream(pathToFile);

    readableStream.on('data', (data) => {
      process.stdout.write(data + '\n');
      showCurrentFolder();
    });

    readableStream.on('error', (err) => {
      console.log(`Operation failed: ${err.message}`);
    });
  } catch (err) {
    console.log(`Operation failed: ${err.message}`);
  }
}