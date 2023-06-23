import fs from 'fs';
import { showCurrentFolder } from '../../../shared/showCurrentFolder.mjs';

export function cd(path) {
  const isWindows = process.platform === 'win32';

  try {
    if (isWindows) {
      fs.accessSync(path);
    } else {
      fs.accessSync(path, 4);
    }

    process.chdir(path);
    showCurrentFolder();
  } catch (err) {
    console.log(`Operation failed: ${err.message}`)
  }
}