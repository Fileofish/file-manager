import { username } from './shared/data.mjs'
import { App } from './handler/app.mjs';

const app = new App(username);

app.start()