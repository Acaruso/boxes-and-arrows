import { BoxEvents } from "./box_events";
import { ConnectionEvents } from "./connection_events";
import { DebugEvents } from "./debug_events";
import { DialogEvents } from "./dialog_events";
import { FileEvents } from "./file_events";
import { FormattingEvents } from "./formatting_events";
import { DetailsEvents } from "./details_events";
import { ModeEvents } from "./mode_events";
import { rectsOverlap } from "../util";
import { SelectedRegionEvents } from "./selected_region_events";

const addEventListener = (type, callback, options={}) => {
    document.addEventListener(type, callback, options);
}

class Ui {
    constructor(state, model, eventTable, scripter, treeFormatter) {
        this.state = state;
        this.model = model;
        this.eventTable = eventTable;
        this.scripter = scripter;
        this.treeFormatter = treeFormatter;
        this.drag = false;
        this.dragCoord = { x: 0, y: 0 };
        this.dragDeltaCoord = { x: 0, y: 0 };

        addEventListener("mousedown", e => this.eventTable.onEvent(e));
        addEventListener("mouseup", e => this.eventTable.onEvent(e));
        addEventListener("dblclick", e => this.eventTable.onEvent(e));
        addEventListener("keydown", e => this.eventTable.onEvent(e));
        addEventListener("wheel", e => this.eventTable.onEvent(e), { passive:false });
        addEventListener("scroll", e => this.eventTable.onEvent(e));

        this.eventAdders = [
            new ConnectionEvents(state, model, eventTable),
            new BoxEvents(state, model, eventTable),
            new SelectedRegionEvents(state, model, eventTable),
            new FormattingEvents(state, model, eventTable, treeFormatter),
            new DialogEvents(state, model, eventTable),
            new FileEvents(state, model, eventTable, scripter),
            new DebugEvents(state, model, eventTable),
            new ModeEvents(state, model, eventTable),
            new DetailsEvents(state, model, eventTable),
        ];

        for (const eventAdder of this.eventAdders) {
            eventAdder.addEvents();
        }
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
            // && !this.model.anyBoxesSelected()
            && (kb.w || kb.a || kb.s || kb.d)
            && this.model.mode === "wasd"
        ) {
            const scrollAmount = 10;
            let xOffset = window.pageXOffset;
            let yOffset = window.pageYOffset;

            if (kb.w) {
                yOffset -= scrollAmount;
            }

            if (kb.a) {
                xOffset -= scrollAmount;
            }

            if (kb.s) {
                yOffset += scrollAmount;
            }

            if (kb.d) {
                xOffset += scrollAmount;
            }

            window.scroll(xOffset, yOffset);
        }
    }

    updateDetails() {
        if (this.model.detailsVisible) {
            this.model.detailsBox.setCoord({
                x: window.pageXOffset + 1,
                y: window.pageYOffset + 1
            });
            const maxHeight = document.documentElement.clientHeight - 20;
            this.model.detailsBox.rect.h = Math.min(this.model.detailsBox.rect.h, maxHeight);
        }
    }

    run() {
        this.handleDragging();
        this.handleScrolling();
        this.updateDetails();
    }
}

export { Ui };
