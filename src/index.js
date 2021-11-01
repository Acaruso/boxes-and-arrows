import { App } from "./app";

document.body.onload = init;

function init() {
    const app = new App();
    app.startMainLoop();
}
