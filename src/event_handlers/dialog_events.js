class DialogEvents {
    constructor(state, model, eventTable) {
        this.state = state;
        this.model = model;
        this.eventTable = eventTable;
    }

    addEvents() {
        this.eventTable.addEvent(
            "closeHelpDialog",
            e => (
                e.mousedown
                && this.state.isMouseInside(this.model.helpDialog.closeButtonRect)
                && this.model.helpDialog.visible
            ),
            e => this.model.helpDialog.visible = false
        );
    }
}

export { DialogEvents };
