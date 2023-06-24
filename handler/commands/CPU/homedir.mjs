import { showCurrentFolder } from "../../../shared/showCurrentFolder.mjs";
import os from 'os';

export function getHomedir() {
  const homedir = os.homedir();
  console.log(`Home directory is '${homedir}'`);
  showCurrentFolder();
}