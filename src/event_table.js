class EventTable {
    constructor(state, model) {
        this.state = state;
        this.model = model;
        this.table = [];
    }

    addEvent(name, shouldRun, run) {
        this.table.push([name, shouldRun, run]);
    }

    formatEvent(e) {
        e.key_ = e.key ? e.key.toLowerCase() : "";

        if (e.key_ === "enter") {
            e.key_ = "\n";
        }

        e.mousedown = e.type === "mousedown";
        e.mouseup = e.type === "mouseup";
        e.keydown = e.type === "keydown";
        e.dblclick = e.type === "dblclick";
        e.insideBox = false;
        e.mouseBox = null;
        e.keyboard = this.state.cur.keyboard;
        e.mouse = this.state.cur.mouse;
    }

    enrichEvent(e) {
        this.formatEvent(e);
        const boxes = this.model.boxes;

        boxes.forEach((box) => {
            if (this.state.isMouseInside(box.rect)) {
                e.insideBox = true;
                e.mouseBox = box;
            }
        });

        return e;
    }

    onEvent(e) {
        this.enrichEvent(e);
        for (const [name, shouldRun, run] of this.table) {
            if (shouldRun(e)) {
                run(e);
            }
        }
    }
}

export { EventTable };
