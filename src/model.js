import { Boxes } from "./boxes";

class Model {
    constructor() {
        this.boxes = new Boxes();

        this.selectedBoxIds = [];

        this.selectedBoxId = -1;
        this.dragging = false;

        this.lineBegin = { x: 0, y: 0 };
        this.drawingLine = false;
        this.outBox = {};

        this.numLevels = 1;

        this.selectedRegion = { x: 0, y: 0, w: 0, h: 0, alpha: 0.5 };
    }

    anyBoxesSelected() {
        return this.selectedBoxIds.length > 0;
    }

    clearSelectedBoxIds() {
        while (this.selectedBoxIds.length > 0) {
            this.selectedBoxIds.pop();
        }
    }
}

export { Model };
