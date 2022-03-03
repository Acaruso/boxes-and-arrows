import { EventTable } from "./event_table"
import { Gfx } from "./gfx"
import { Model } from "./model"
import { Renderer } from "./renderer"
import { Scripter } from "./scripter"
import { State } from "./state"
import { TreeFormatter } from "./tree_formatter"
import { Ui } from "./ui"

class App {
    constructor() {
        this.gfx = new Gfx();
        this.state = new State();
        this.model = new Model();
        this.treeFormatter = new TreeFormatter(this.model);
        this.scripter = new Scripter(this.model, this.treeFormatter);
        this.eventTable = new EventTable(this.state, this.model);
        this.ui = new Ui(
            this.state,
            this.model,
            this.eventTable,
            this.scripter,
            this.treeFormatter,
        );
        this.renderer = new Renderer(this.gfx, this.state, this.model);
        this.interval = {};
    }

    startMainLoop() {
        // this.scripter.run();
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
