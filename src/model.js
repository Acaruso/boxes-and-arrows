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
        this.sortLevelsByX(levels);
        console.log("sorted levels:");
        console.log(levels);
        const rootBox = this.boxes.getBox(rootId);
        this.leftLayout(levels, rootBox.coord.x, rootBox.coord.y);
        // this.centerLayout(levels);
    }

    makeLevels(rootId) {
        let queue = [];
        let levels = [];
        let curLevel = 0;
        queue.push(rootId);

        while (queue.length > 0) {
            const n = queue.length;
            for (let i = 0; i < n; i++) {
                const curId = queue.shift();
                const curBox = this.boxes.getBox(curId);
                const childrenIds = this.boxes.getConnections(curId);
                for (const cid of childrenIds) {
                    queue.push(cid);
                }
                if (levels.length - 1 < curLevel) {
                    levels.push([]);
                }
                levels[curLevel].push([curId, curBox.coord.x]);
            }
            curLevel++;
        }

        return levels;
    }

    sortLevelsByX(levels) {
        for (let i = 0; i < levels.length; i++) {
            levels[i].sort((a, b) => a[1] < b[1]);
        }

        for (let i = 0; i < levels.length; i++) {
            const level = levels[i];
            for (let k = 0; k < level.length; k++) {
                level[k] = level[k][0];
            }
        }
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

    centerLayout(levels) {
        for (let i = levels.length - 2; i >= 0; i--) {
            for (let id of levels[i]) {
                let box = this.boxes.getBox(id);
                let childrenIds = this.boxes.getConnections(id);
                let mid = this.getChildrensMidpoint(childrenIds);
                box.setCoord({
                    x: mid - (box.rect.w / 2),
                    y: box.coord.y
                });
            }
        }
    }

    getChildrensMidpoint(childrenIds) {
        let min = 9999999;
        let max = -1;

        for (const childId of childrenIds) {
            let childBox = this.boxes.getBox(childId);
            const lhs = childBox.rect.x;
            const rhs = childBox.rect.x + childBox.rect.w;
            min = Math.min(min, lhs);
            max = Math.max(max, rhs);
        }
        return min + ((max - min) / 2);
    }
}

export { Model };
