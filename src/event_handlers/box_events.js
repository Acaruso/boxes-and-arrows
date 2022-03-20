import { isPrintableKeycode } from "../util";

class BoxEvents {
    constructor(state, model, eventTable) {
        this.state = state;
        this.model = model;
        this.eventTable = eventTable;
    }

    addEvents() {
        this.eventTable.addEvent(
            "addBox",
            e => e.dblclick && !e.insideBox,
            e => {
                const text = "";
                const newBoxId = this.model.boxes.addBox(text, e.mouse.coord);
                this.model.clearSelectedBoxIds();
                this.model.addSelectedBoxId(newBoxId);
            }
        );

        this.eventTable.addEvent(
            "duplicateBox",
            e => e.mousedown && e.keyboard.alt && e.insideBox,
            e => {
                const newBoxId = this.model.boxes.cloneBox(e.mouseBox, e.mouse.coord);
                this.model.clearSelectedBoxIds();
                this.model.addSelectedBoxId(newBoxId);
            }
        );

        this.eventTable.addEvent(
            "deleteBox",
            e => e.keydown && e.key_ === "delete" && this.model.anyBoxesSelected(),
            e => {
                for (const id of this.model.selectedBoxIds) {
                    this.model.boxes.deleteBox(id);
                }
                this.model.clearSelectedBoxIds();
            }
        );

        this.eventTable.addEvent(
            "clickAndSelectBox",
            e => {
                return e.mousedown
                    && e.insideBox
                    && !e.keyboard.control
                    && !e.keyboard.shift
                    && !e.keyboard.alt
                    && !this.model.isBoxSelected(e.mouseBox.id);
            },
            e => {
                this.model.clearSelectedBoxIds();
                this.model.addSelectedBoxId(e.mouseBox.id);
            }
        );

        this.eventTable.addEvent(
            "shiftClickAndAddSelectBox",
            e => e.mousedown && e.insideBox && !e.keyboard.control && e.keyboard.shift,
            e => this.model.addSelectedBoxId(e.mouseBox.id)
        );

        this.eventTable.addEvent(
            "clickAndUnselectBox",
            e => e.mousedown && !e.insideBox && !e.keyboard.control && !e.keyboard.alt,
            e => this.model.clearSelectedBoxIds()
        );

        this.eventTable.addEvent(
            "selectAll",
            e => e.keydown && e.keyboard.control && e.keyboard.a,
            e => {
                this.model.clearSelectedBoxIds();
                this.model.boxes.forEach(elt => {
                    this.model.addSelectedBoxId(elt.id);
                });
            }
        );

        this.eventTable.addEvent(
            "beginDraggingBoxes",
            e => e.mousedown && !e.keyboard.control && e.insideBox,
            e => this.model.draggingBoxes = true
        );

        this.eventTable.addEvent(
            "endDraggingBoxes",
            e => e.mouseup,
            e => this.model.draggingBoxes = false
        );

        this.eventTable.addEvent(
            "appendString",
            e => {
                return e.keydown
                    && this.model.anyBoxesSelected()
                    && isPrintableKeycode(e.which)
                    && !e.keyboard.control
            },
            e => {
                for (const id of this.model.selectedBoxIds) {
                    let box = this.model.boxes.getBox(id);
                    box.appendString(e.key_);
                }
            }
        );

        this.eventTable.addEvent(
            "deleteChar",
            e => {
                return e.keydown
                    && this.model.anyBoxesSelected()
                    && e.key_ === "backspace";
            },
            e => {
                for (const id of this.model.selectedBoxIds) {
                    let box = this.model.boxes.getBox(id);
                    box.deleteChar();
                }
            }
        );
    }
}

export { BoxEvents };
