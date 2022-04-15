class ModeEvents {
    constructor(state, model, eventTable) {
        this.state = state;
        this.model = model;
        this.eventTable = eventTable;
    }

    addEvents() {
        this.eventTable.addEvent(
            "changeMode",
            e => e.keydown && e.keyboard.escape,
            e => {
                if (this.model.mode === "normal") {
                    this.model.mode = "wasd";
                } else {
                    this.model.mode = "normal";
                }
            }
        );
    }
}

export { ModeEvents };
