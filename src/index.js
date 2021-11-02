import { App } from "./app";

document.body.onload = () => {
    const app = new App();
    app.startMainLoop();
};
