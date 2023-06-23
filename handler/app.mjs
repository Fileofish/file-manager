import { hello } from "./states/hello.mjs";
import { wait } from "./states/wait.mjs";
import { Handler } from "./commands/handler.mjs"

export class App {
  constructor(username) {
    this.username = username;
    this.handler = new Handler(username);
  }

  start() {
    hello(this.username);
    wait();
    this.handler.processing();
  }
}