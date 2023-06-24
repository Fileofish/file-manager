import { showCurrentFolder } from "../../../shared/showCurrentFolder.mjs";
import os from 'os';

export function getCPUArchitecture() {
  const CPUArchitecture = os.arch();
  console.log(`CPU architecture is '${CPUArchitecture}'.`);
  showCurrentFolder();
}