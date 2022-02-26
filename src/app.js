import { Gfx } from "./gfx"
import { Renderer } from "./renderer"
import { State } from "./state"
import { Model } from "./model"
import { Ui } from "./ui"
import { EventTable } from "./event_table"
import { Scripter } from "./scripter"

class App {
    constructor() {
        this.gfx = new Gfx();
        this.state = new State();
        this.model = new Model();
        this.scripter = new Scripter(this.model);
        this.eventTable = new EventTable(this.state, this.model);
        this.ui = new Ui(
            this.state,
            this.model,
            this.eventTable,
            this.scripter
        );
        this.renderer = new Renderer(this.gfx, this.state, this.model);
        this.interval = {};
    }

    startMainLoop() {
        this.scripter.run();
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
