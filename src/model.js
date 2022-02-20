import { Boxes } from "./boxes";
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

        this.numLevels = 1;

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

    clearSelectedBoxIds() {
        while (this.selectedBoxIds.length > 0) {
            this.selectedBoxIds.pop();
        }
    }

    treeFormat(rootId) {
        const levels = this.makeLevels(rootId);
        console.log("levels:");
        console.log(levels);
        const rootBox = this.boxes.getBox(rootId);
        this.leftLayout(levels, rootBox.coord.x, rootBox.coord.y);
    }

    makeLevels(rootId) {
        let queue = [];
        let levels = [];
        let curLevel = 0;
        queue.push(rootId);

        while (queue.length > 0) {
            let n = queue.length;
            for (let i = 0; i < n; i++) {
                let curId = queue.shift();
                let childrenIds = this.boxes.getConnections(curId);
                for (const cid of childrenIds) {
                    queue.push(cid);
                }
                if (levels.length - 1 < curLevel) {
                    levels.push([]);
                }
                levels[curLevel].push(curId);
            }
            curLevel++;
        }

        return levels;
    }

    leftLayout(levels, rootX, rootY) {
        let x = rootX;
        let y = rootY;
        const xPadding = 80;
        const yPadding = 80;

        for (let i = 0; i < levels.length; i++) {
            let curLevel = levels[i];
            x = rootX;
            for (let k = 0; k < curLevel.length; k++) {
                let box = this.boxes.getBox(curLevel[k]);
                box.setCoord({ x, y });
                x += xPadding;
            }
            y += yPadding;
        }
    }

}

export { Model };
