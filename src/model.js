import { Boxes } from "./boxes";

class Model {
    constructor() {
        this.boxes = new Boxes();

        this.selectedBoxId = -1;
        this.dragging = false;

        this.lineBegin = { x: 0, y: 0 };
        this.drawingLine = false;
        this.outBox = {};

        this.numLevels = 1;
    }
}

export { Model };
