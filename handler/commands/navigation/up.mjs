import fs from "fs";
import { showCurrentFolder } from "../../../shared/showCurrentFolder.mjs";

export function up() {
  const currentPath = process.cwd();
  const parentPath = fs.realpathSync(currentPath + '/../');
  if (currentPath === parentPath) {
    console.log('Cannot go higher than the root directory.')
  } else {
    try {
      process.chdir(parentPath);
      showCurrentFolder();
    } catch (err) {
      console.log(`Operation failed: ${err.message}`);
    }
  }
}