import { Gfx } from "./gfx"
import { Renderer } from "./renderer"
import { State } from "./state"
import { Model } from "./model"
import { Ui } from "./ui"

class App {
    constructor() {
        this.gfx = new Gfx();
        this.state = new State();
        this.model = new Model();
        this.ui = new Ui(this.gfx, this.state, this.model);
        this.renderer = new Renderer(this.gfx, this.state, this.model);

        this.interval = {};
    }

    startMainLoop() {
        this.interval = setInterval(() => this.loop(), 10);
    }

    loop() {
        this.gfx.clearScreen();
        this.ui.run();
        this.renderer.render();
        this.gfx.draw();
        this.state.nextState();
    }
}

export { App };
