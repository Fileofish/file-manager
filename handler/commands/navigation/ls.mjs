import fs from 'fs';
import { showCurrentFolder } from "../../../shared/showCurrentFolder.mjs";

export function ls() {
  const currentPath = process.cwd();
  const files = fs.readdirSync(currentPath);

  const directories = [];
  const regularFiles = [];

  files.forEach((file) => {
    const fileStats = fs.statSync(file);
    if (fileStats.isDirectory()) {
      directories.push(file);
    } else {
      regularFiles.push(file);
    }
  });

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