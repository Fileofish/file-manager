import fs from 'fs';
import { showCurrentFolder } from "../../../shared/showCurrentFolder.mjs";

export function add(fileName) {
  const filePath = `./${fileName}`;

  fs.writeFile(filePath, '', (err) => {
    if (err) {
      console.log(`Operation failed: ${err.message}`);
    } else {
      console.log(`File '${fileName}' created successfully.`)
    }
    showCurrentFolder();
  })
}