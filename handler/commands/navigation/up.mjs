import fs from "fs";
import { showCurrentFolder } from "../../../shared/showCurrentFolder.mjs";

export function up() {
  const currentPath = process.cwd();
  const parentPath = fs.realpath(currentPath + '/../', (err, resolvedPath) => {
    if (err) {
      console.log(`Operation failed: ${err.message}`);
      return;
    }

    if (currentPath === resolvedPath) {
      console.log('Cannot go higher than the root directory.');
      return;
    }

    try {
      process.chdir(resolvedPath);
      showCurrentFolder();
    } catch (err) {
      console.log(`Operation failed: ${err.message}`);
    }
  });
}