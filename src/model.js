import { Box } from "./box";
import { Boxes } from "./boxes";
import { clearArray } from "./util";
import { HelpDialog } from "./help_dialog"

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

        this.detailsVisible = false;
        this.detailsBox = {};
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

    handleDetails() {
        if (this.selectedBoxIds.length === 1) {
            const curId = this.selectedBoxIds[0];
            const curBox = this.boxes.getBox(curId);
            if (curBox.detailsData.length > 0) {
                this.detailsVisible = true;
                const detailsBoxCoord = {
                    x: window.pageXOffset + 1,
                    y: window.pageYOffset + 1
                };
                this.detailsBox = new Box("", detailsBoxCoord, 0);
                this.detailsBox.setData(curBox.detailsData);
                this.detailsBox.scrollable = true;
                const maxHeight = document.documentElement.clientHeight - 20;
                this.detailsBox.rect.h = Math.min(this.detailsBox.rect.h, maxHeight);
                return;
            }
        }

        this.detailsVisible = false;
    }
}

export { Model };
