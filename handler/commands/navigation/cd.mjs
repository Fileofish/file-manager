import fs from 'fs';
import { showCurrentFolder } from '../../../shared/showCurrentFolder.mjs';

export function cd(path) {
  const isWindows = process.platform === 'win32';

  fs.access(path, isWindows ? fs.constants.F_OK : fs.constants.R_OK, (err) => {
    if (err) {
      console.log(`Operation failed: ${err.message}`);
    } else {
      process.chdir(path);
      showCurrentFolder();
    }
  });
}