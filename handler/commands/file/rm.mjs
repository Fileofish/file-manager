import fs from 'fs';
import { showCurrentFolder } from "../../../shared/showCurrentFolder.mjs";

export function rm(filePath) {
  fs.unlink(filePath, (err) => {
    if (err) {
      console.log(`Error deleting file: ${err.message}`);
    } else {
      console.log(`File '${filePath}' deleted successfully.`)
      showCurrentFolder();
    }
  })
}