import { showCurrentFolder } from "../../../shared/showCurrentFolder.mjs";
import fs from 'fs';

export function rn(modifiedFilePath, newNameFile) {
  const directory = modifiedFilePath.substring(0, modifiedFilePath.lastIndexOf('/'));
  const newFilePath = `${directory}/${newNameFile}`;

  fs.rename(modifiedFilePath, newFilePath, (err) => {
    if (err) {
      console.log(`Operation failed: ${err.message}`);
    } else {
      console.log(`File '${modifiedFilePath}' renamed to '${newNameFile}' successfully.`)
    }
    showCurrentFolder();
  })
}