import { showCurrentFolder } from "../../../shared/showCurrentFolder.mjs";
import os from 'os';

export function getEOL() {
  const eol = os.EOL;
  console.log(`System EOL: ${JSON.stringify(eol)}`);
  showCurrentFolder();
}