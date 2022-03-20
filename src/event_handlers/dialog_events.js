class DialogEvents {
    constructor(state, model, eventTable, scripter, treeFormatter) {
        this.state = state;
        this.model = model;
        this.eventTable = eventTable;
        this.scripter = scripter;
        this.treeFormatter = treeFormatter;
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
