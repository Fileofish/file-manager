import { exit } from "./exit/exit.mjs";
import { up } from "./navigation/up.mjs";
import { cd } from "./navigation/cd.mjs";
import { ls } from "./navigation/ls.mjs";
import { cat } from "./file/cat.mjs";
import { add } from "./file/add.mjs";
import { rn } from "./file/rn.mjs";
import { cpMv } from "./file/cp-mv.mjs";
import { rm } from "./file/rm.mjs";
import { getEOL } from "./CPU/EOL.mjs";
import { getCpus } from "./CPU/cpus.mjs";
import { getHomedir } from "./CPU/homedir.mjs";
import { getUsername } from "./CPU/username.mjs";
import { getCPUArchitecture } from "./CPU/architecture.mjs";
import { getHashFile } from "./hash/hash.mjs";
import { Archiver } from "./compress/archiver.mjs";

const archiver = new Archiver();

export class Handler {
  constructor(username) {
    this.username = username;
  }

  processing() {
    // Ctrl+C
    process.on('SIGINT', () => {
      exit(this.username);
    });

    // Commands
    process.stdin.on('data', (data) => {
      const input = data.toString().trim();
      const arrInput = input.split(' ');
      const command = (arrInput[0] === 'os') ? input : arrInput[0];
      const firstValue = (arrInput[1]) ? arrInput[1] : null;
      const secondValue = (arrInput[2]) ? arrInput[2] : null;

      switch(command) {
        case '.exit':
          exit(this.username);
          break;
        case 'up':
          up();
          break;
        case 'cd':
          cd(firstValue);
          break;
        case 'ls':
          ls();
          break;
        case 'cat':
          cat(firstValue);
          break;
        case 'add':
          add(firstValue);
          break;
        case 'rn':
          rn(firstValue, secondValue);
          break;
        case 'cp':
          cpMv(firstValue, secondValue, 'cp');
          break;
        case 'mv':
          cpMv(firstValue, secondValue, 'mv');
          break;
        case 'rm':
          rm(firstValue);
          break;
        case 'os --EOL':
          getEOL();
          break;
        case 'os --cpus':
          getCpus();
          break;
        case 'os --homedir':
          getHomedir();
          break;
        case 'os --username':
          getUsername();
          break;
        case 'os --architecture':
          getCPUArchitecture();
          break;
        case 'hash':
          getHashFile(firstValue);
          break;
        case 'compress':
          archiver.compressFile(firstValue, secondValue);
          break;
        case 'decompress':
          archiver.decompressFile(firstValue, secondValue);
          break;
        default:
          console.log('Invalid input');
          break;
      }

    })

  }
}