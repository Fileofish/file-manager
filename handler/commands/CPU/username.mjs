import { showCurrentFolder } from "../../../shared/showCurrentFolder.mjs";
import os from 'os';

export function getUsername() {
  const username = os.userInfo();
  console.log(`Current system user name is '${username.username}'.`)
  showCurrentFolder();
}