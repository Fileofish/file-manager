import fs from 'fs';
import { showCurrentFolder } from "../../../shared/showCurrentFolder.mjs";

export function ls() {
  const currentPath = process.cwd();

  fs.readdir(currentPath, (err, files) => {
    if (err) {
      console.log(`Operation failed: ${err.message}`);
      return;
    }

    const directories = [];
    const regularFiles = [];

    files.forEach((file) => {
      const filePath = `${currentPath}/${file}`;

      fs.stat(filePath, (err, fileStats) => {
        if (err) {
          console.log(`Error getting file stats: ${err.message}`);
          return;
        }

        if (fileStats.isDirectory()) {
          directories.push(file);
        } else {
          regularFiles.push(file);
        }

        if (directories.length + regularFiles.length === files.length) {
          const sortedDirectories = directories.sort();
          const sortedRegularFiles = regularFiles.sort();

          console.log('(index)\tName\t\t\tType');
          sortedDirectories.forEach((directory, index) => {
            console.log(`${++index}\t${directory}\t\t\tdirectory`);
          });
          const lastIndex = sortedDirectories.length + 1;
          sortedRegularFiles.forEach((file, index) => {
            console.log(`${lastIndex + index}\t${file}\t\tfile`);
          });
          showCurrentFolder();
        }
      });
    });
  });
}