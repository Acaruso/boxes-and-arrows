import { firstElt } from "./util";

class TreeFormatter {
    constructor(model) {
        this.boxes = model.boxes;
        this.xPadding = 50;
        this.yPadding = 50;
    }

    treeFormat(rootId) {
        this.initializeNodes(rootId, 0);
        this.calculateInitialX(rootId);
    }

    initializeNodes(id, level) {
        const box = this.boxes.getBox(id);

        // box.setCoord({
        //     x: -1,
        //     y: level * yPadding
        // });

        box.setCoord({
            x: 0,
            y: level * this.yPadding
        });

        box.mod = 0;

        const childIds = this.boxes.getConnections(id);
        for (const cid of childIds) {
            let childBox = this.boxes.getBox(cid);
            childBox.parentId = id;
            this.initializeNodes(cid, level + 1);
        }
    }

    calculateInitialX(id) {
        const box = this.boxes.getBox(id);
        const prevSibId = this.boxes.getPrevSibling(id);
        const prevSib = this.boxes.getBox(prevSibId);
        const childIds = this.boxes.getConnections(id);

        for (const cid of childIds) {
            this.calculateInitialX(cid);
        }

        if (this.boxes.isLeaf(id)) {
            if (!this.boxes.isLeftMost(id)) {
                box.setX(prevSib.coord.x + prevSib.rect.w + this.xPadding);
            } else {
                box.setX(0);
            }
        } else if (childIds.length === 1) {
            const child = this.boxes.getBox(firstElt(childIds));
            if (this.boxes.isLeftMost(id)) {
                box.setX(child.coord.x)
            } else {
                box.setX(prevSib.coord.x + prevSib.rect.w + this.xPadding);
                box.mod = box.coord.x - child.coord.x;
            }
        } else {
            const lChildId = this.boxes.getLeftMostChild(id);
            const lChild = this.boxes.getBox(lChildId);
            const rChildId = this.boxes.getRightMostChild(id);
            const rChild = this.boxes.getBox(rChildId);
            const mid = (lChild.coord.x + rChild.coord.x) / 2;

            if (this.boxes.isLeftMost(id)) {
                box.setX(mid);
            } else {
                box.setX(prevSib.coord.x + prevSib.rect.w + this.xPadding);
                box.mod = box.coord.x - mid;
            }
        }

        if (childIds.length > 0 && this.boxes.isLeftMost(id)) {
            this.checkForConflicts(id);
        }
    }

    checkForConflicts(id) {
        const box = this.boxes.getBox(id);
        let siblingId = this.boxes.getLeftMostSibling(id);
        let sibling = this.boxes.getBox(siblingId);
        const childIds = this.boxes.getConnections(id);

        const minDistance = this.xPadding;
        let shiftValue = 0;
        let nodeContour = new Map();
        this.getLeftContour(id, 0, nodeContour);

        while (siblingId !== null && siblingId !== id) {
            let siblingContour = new Map();
            this.getRightContour(siblingId, 0, siblingContour);
            
            const sMax = getMaxKey(siblingContour);
            const nMax = getMaxKey(nodeContour);

            for (
                let level = box.coord.y + 1;
                level <= Math.min(sMax, nMax);
                level++
            ) {
                let distance = nodeContour.get(level) - siblingContour.get(level);
                if (distance + shiftValue < minDistance) {
                    shiftValue = minDistance - distance
                }
            }

            if (shiftValue > 0) {
                box.setX(box.coord.x + shiftValue);
                box.mod += shiftValue;

                // this.centerNodeBetween(id, sibling);

                shiftValue = 0;
            }

            siblingId = this.boxes.getNextSibling(siblingId);
            sibling = this.boxes.getBox(siblingId);
        }
    }

    getLeftContour(id, modSum, values) {
        const box = this.boxes.getBox(id);
        const childIds = this.boxes.getConnections(id);

        if (!values.has(box.coord.y)) {
            values.set(box.coord.y, box.coord.x + modSum);
        } else {
            let oldVal = values.get(box.coord.y);
            let newVal = Math.min(oldVal, box.coord.x + modSum);
            values.set(box.coord.y, newVal);
        }

        modSum += box.mod;

        for (const cid of childIds) {
            this.getLeftContour(cid, modSum, values);
        }
    }

    getRightContour(id, modSum, values) {
        const box = this.boxes.getBox(id);
        const childIds = this.boxes.getConnections(id);

        if (!values.has(box.coord.y)) {
            values.set(box.coord.y, box.coord.x + modSum);
        } else {
            let oldVal = values.get(box.coord.y);
            let newVal = Math.max(oldVal, box.coord.x + modSum);
            values.set(box.coord.y, newVal);
        }

        modSum += box.mod;

        for (const cid of childIds) {
            this.getRightContour(cid, modSum, values);
        }
    }
}

const getMaxKey = (map) => {
    let keys = Array.from(map.keys());
    return Math.max(...keys);
}

export { TreeFormatter };
