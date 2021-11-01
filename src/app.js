import { Gfx } from "./gfx"
import { Ui } from "./ui"
import { State } from "./state"

class App {
    constructor() {
        this.gfx = new Gfx();
        this.state = new State();
        this.ui = new Ui(this.gfx, this.state);
        this.interval = {};
    }

    startMainLoop() {
        this.interval = setInterval(() => this.loop(), 10);
    }

    loop() {
        this.gfx.clearScreen();
        this.ui.draw();
        this.gfx.draw();
        this.state.nextState();
    }
}

export { App };
