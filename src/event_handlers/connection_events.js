import { getMidpoint } from "../util";

class ConnectionEvents {
    constructor(state, model, eventTable) {
        this.state = state;
        this.model = model;
        this.eventTable = eventTable;
    }

    addEvents() {
        this.eventTable.addEvent(
            "beginMakingConnection",
            e => e.mousedown && e.insideBox && e.keyboard.control,
            e => {
                this.model.lineBegin = getMidpoint(e.mouseBox.rect);
                this.model.outBox = e.mouseBox;
                this.model.drawingLine = true;
            }
        );

        this.eventTable.addEvent(
            "endMakingConnection_add",
            e => e.mouseup && e.insideBox && this.model.drawingLine,
            e => {
                this.model.boxes.addConnection(
                    this.model.outBox.id,
                    e.mouseBox.id
                );
                this.model.drawingLine = false;
            }
        );

        this.eventTable.addEvent(
            "endMakingConnection_dontAdd",
            e => e.mouseup && !e.insideBox && this.model.drawingLine,
            e => this.model.drawingLine = false
        );
    }
}

export { ConnectionEvents };
