import { Boxes } from "./boxes";
import { HelpDialog } from "./help_dialog"
import { clearArray } from "./util";

class Model {
    constructor() {
        this.boxes = new Boxes();
        this.helpDialog = new HelpDialog();

        this.selectedBoxIds = [];

        this.draggingBoxes = false;
        this.draggingSelectedRegion = false;

        this.lineBegin = { x: 0, y: 0 };
        this.drawingLine = false;
        this.outBox = {};

        this.selectedRegion = { x: 0, y: 0, w: 0, h: 0, alpha: 0.3 };

        this.mode = "normal";

        this.detailsPos = 0;
        this.detailsVisible = false;
        this.details = {};
    }

    init() {
        this.boxes.deleteAll();
        clearArray(this.selectedBoxIds);
        this.draggingBoxes = false;
        this.draggingSelectedRegion = false;
        this.lineBegin = { x: 0, y: 0 };
        this.drawingLine = false;
        this.outBox = {};
        this.selectedRegion = { x: 0, y: 0, w: 0, h: 0, alpha: 0.3 };
    }

    anyBoxesSelected() {
        return this.selectedBoxIds.length > 0;
    }

    isBoxSelected(id) {
        return this.selectedBoxIds.includes(id);
    }

    addSelectedBoxId(id) {
        if (!this.selectedBoxIds.includes(id)) {
            this.selectedBoxIds.push(id);
        }
    }

    deleteSelectedBoxId(id) {
        if (this.selectedBoxIds.includes(id)) {
            this.selectedBoxIds = this.selectedBoxIds.filter(x => x !== id);
        }
    }

    clearSelectedBoxIds() {
        while (this.selectedBoxIds.length > 0) {
            this.selectedBoxIds.pop();
        }
    }
}

export { Model };
