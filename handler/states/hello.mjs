import { showCurrentFolder } from "../../shared/showCurrentFolder.mjs";

export function hello(username) {
  console.log(`Welcome to the File Manager, ${username}!`);
  showCurrentFolder();
}