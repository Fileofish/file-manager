import { showCurrentFolder } from "../../../shared/showCurrentFolder.mjs";
import fs from 'fs';

export function cpMv(pathToTargetFile, newDirectory, command) {
  const fileName = pathToTargetFile.substring(pathToTargetFile.lastIndexOf('/') + 1);
  const newFilePath = `${newDirectory}/${fileName}`;

  const readableStream = fs.createReadStream(pathToTargetFile);
  const writableStream = fs.createWriteStream(newFilePath);

  readableStream.on('error', (err) => {
    console.log(`Read operation failed: ${err.message}`);
  })

  writableStream.on('error', (err) => {
    console.log(`Write operation failed: ${err.message}`)
  })

  writableStream.on('finish', () => {
    switch (command) {
      case 'cp':
        console.log(`File '${fileName}' copied to '${newFilePath}' successfully.`);
        showCurrentFolder();
        break;
      case 'mv':
        fs.unlink(pathToTargetFile, (err) => {
          const errorMessage = `Error deleting file.`;
          const successMessage = `File '${fileName}' rebase to '${newFilePath}' successfully.`
          console.log((err) ? errorMessage : successMessage);
          showCurrentFolder();
        });
        break;
    }

  })

  readableStream.pipe(writableStream);
}