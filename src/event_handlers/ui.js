import { ConnectionEvents } from "./connection_events";
import { BoxEvents } from "./box_events";
import { SelectedRegionEvents } from "./selected_region_events";
import { FormattingEvents } from "./formatting_events";
import { FileEvents } from "./file_events";
import {
    getMidpoint,
    rectsOverlap,
    isPrintableKeycode,
    saveFile,
    loadFile,
    loadFileFromHandle,
} from "../util"
import {
    getAllIdsInTree,
    moveBoxes,
    isTree,
} from "../tree_util";

const addEventListener = (type, callback) => {
    document.addEventListener(type, callback, false);
}

class Ui {
    constructor(state, model, eventTable, scripter, treeFormatter) {
        this.state = state;
        this.model = model;
        this.eventTable = eventTable;
        this.scripter = scripter;
        this.treeFormatter = treeFormatter;
        this.prevFileHandle = null;
        this.drag = false;
        this.dragCoord = { x: 0, y: 0 };
        this.dragDeltaCoord = { x: 0, y: 0 };

        addEventListener("mousedown", e => this.eventTable.onEvent(e));
        addEventListener("mouseup", e => this.eventTable.onEvent(e));
        addEventListener("dblclick", e => this.eventTable.onEvent(e));
        addEventListener("keydown", e => this.eventTable.onEvent(e));

        this.eventAdders = [
            new ConnectionEvents(state, model, eventTable),
            new BoxEvents(state, model, eventTable, scripter, treeFormatter),
            new SelectedRegionEvents(state, model, eventTable),
            new FormattingEvents(state, model, eventTable, scripter, treeFormatter),
            new FileEvents(state, model, eventTable, scripter),
        ];

        for (const eventAdder of this.eventAdders) {
            eventAdder.addEvents();
        }

        this.addEventListeners();
    }

    addEventListeners() {

        this.eventTable.addEvent(
            "endDrawingLine",
            e => e.mouseup,
            e => this.model.drawingLine = false
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
            "closeHelpDialog",
            e => (
                e.mousedown
                && this.state.isMouseInside(this.model.helpDialog.closeButtonRect)
                && this.model.helpDialog.visible
            ),
            e => this.model.helpDialog.visible = false
        );

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

    handleDragging() {
        if (this.model.draggingBoxes && this.model.anyBoxesSelected()) {
            // drag boxes
            for (const id of this.model.selectedBoxIds) {
                const box = this.model.boxes.getBox(id);

                const newCoord = {
                    x: box.coord.x + this.state.getMouseXDelta(),
                    y: box.coord.y + this.state.getMouseYDelta()
                };

                box.setCoord(newCoord);
            }
        } else if (this.model.draggingSelectedRegion) {
            // drag selected region
            this.model.selectedRegion.w += this.state.getMouseXDelta();
            this.model.selectedRegion.h += this.state.getMouseYDelta();

            this.model.boxes.forEach(box => {
                if (rectsOverlap(box.rect, this.model.selectedRegion)) {
                    this.model.addSelectedBoxId(box.id);
                }
            });
        }
    }

    handleScrolling() {
        const kb = this.state.cur.keyboard;
        if (
            !kb.control
            && !this.model.anyBoxesSelected()
            && (kb.w || kb.a || kb.s || kb.d)
        ) {
            const scrollAmount = 10;
            const oldXOffset = window.pageXOffset;
            const oldYOffset = window.pageYOffset;

            if (kb.w) {
                window.scroll(oldXOffset, oldYOffset - scrollAmount);
            }

            if (kb.a) {
                window.scroll(oldXOffset - scrollAmount, oldYOffset);
            }

            if (kb.s) {
                window.scroll(oldXOffset, oldYOffset + scrollAmount);
            }

            if (kb.d) {
                window.scroll(oldXOffset + scrollAmount, oldYOffset);
            }
        }
    }

    run() {
        this.handleDragging();
        this.handleScrolling();
    }
}

export { Ui };
