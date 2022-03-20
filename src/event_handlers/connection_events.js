import { getMidpoint } from "../util";

class ConnectionEvents {
    constructor(state, model, eventTable) {
        this.state = state;
        this.model = model;
        this.eventTable = eventTable;
    }

    addEvents() {
        this.eventTable.addEvent(
            "beginConnection",
            e => e.mousedown && e.insideBox && e.keyboard.control,
            e => {
                this.model.lineBegin = getMidpoint(e.mouseBox.rect);
                this.model.outBox = e.mouseBox;
                this.model.drawingLine = true;
            }
        );

        this.eventTable.addEvent(
            "addConnection",
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
            "endDrawingLine",
            e => e.mouseup,
            e => this.model.drawingLine = false
        );
    }
}

export { ConnectionEvents };
