import { spawn } from 'child_process';
import { exit } from "./exit/exit.mjs";
import { up } from "./navigation/up.mjs"

export class Handler {
  constructor(username) {
    this.username = username;
  }

  processing() {
    process.on('SIGINT', () => {
      exit(this.username);
    });

    process.stdin.on('data', (data) => {
      const input = data.toString().trim();
      switch(input) {
        case '.exit':
          exit(this.username);
          break;
        case 'up':
          up();
          break;
      }
    })
  }
}