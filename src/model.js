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
        this.sortLevelsByX(levels);

        console.log(levels);

        const rootBox = this.boxes.getBox(rootId);
        this.leftLayout(levels, rootBox.coord.x, rootBox.coord.y);

        // this.centerLayout(levels);
    }

    makeLevels(rootId) {
        let queue = [];
        let levels = [];
        let curLevel = 0;

        const rootBox = this.boxes.getBox(rootId);

        queue.push({
            id: rootId,
            parentId: -1,
        });

        while (queue.length > 0) {
            const n = queue.length;
            for (let i = 0; i < n; i++) {
                const cur = queue.shift();
                const curBox = this.boxes.getBox(cur.id);
                const childrenIds = this.boxes.getConnections(cur.id);
                for (const cid of childrenIds) {
                    queue.push({
                        id: cid,
                        parentId: cur.id
                    });
                }
                if (levels.length - 1 < curLevel) {
                    levels.push([]);
                }
                levels[curLevel].push({
                    id: cur.id,
                    parentId: cur.parentId,
                    x: curBox.coord.x,
                });
            }
            curLevel++;
        }

        return levels;
    }

    sortLevelsByX(levels) {
        const sortFn = (a, b) => {
            if (a.x < b.x) {
                return -1;
            } else if (a.x > b.x) {
                return 1;
            } else {
                return 0;
            }
        }

        for (let i = 0; i < levels.length; i++) {
            levels[i].sort(sortFn);
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
            let prevParentId = -10;
            for (let k = 0; k < curLevel.length; k++) {
                const levelElt = curLevel[k];

                // if this is a new sibling set,
                // potentially need to correct x coord
                if (levelElt.parentId !== prevParentId && levelElt.parentId !== -1) {
                    const parentBox = this.boxes.getBox(levelElt.parentId);
                    if (x < parentBox.coord.x) {
                        x = parentBox.coord.x;
                    }
                }

                let box = this.boxes.getBox(levelElt.id);
                box.setCoord({ x, y });
                x += xPadding;
                prevParentId = levelElt.parentId;
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
