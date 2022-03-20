class DebugEvents {
    constructor(state, model, eventTable) {
        this.state = state;
        this.model = model;
        this.eventTable = eventTable;
    }

    addEvents() {
        this.eventTable.addEvent(
            "printAllBoxes",
            e => e.keydown && e.keyboard.control && e.keyboard.space,
            e => {
                console.log(this.model.boxes);
                console.log(window.pageXOffset);
                console.log(window.pageYOffset);
            }
        );
    }
}

export { DebugEvents };
