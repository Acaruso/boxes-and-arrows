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
        this.calculateFinalPositions(rootId, 0);
    }

    initializeNodes(id, level) {
        const box = this.boxes.getBox(id);

        box.setCoord({
            x: -1,
            y: level * this.yPadding
        });

        // box.setCoord({
        //     x: 0,
        //     y: level * this.yPadding
        // });

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

        if (childIds.length > 0 && !this.boxes.isLeftMost(id)) {
            this.checkForConflicts(id);
        }
    }

    checkForConflicts(id) {
        const box = this.boxes.getBox(id);
        let siblingId = this.boxes.getLeftMostSibling(id);
        let sibling = this.boxes.getBox(siblingId);

        const minDistance = this.xPadding;
        // const minDistance = this.xPadding + box.rect.w;
        
        let shiftValue = 0;
        let nodeContour = new Map();
        this.getLeftContour(id, 0, nodeContour);

        while (siblingId !== null && siblingId !== id) {
            console.log("asdf");
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

            console.log("shiftValue: " + shiftValue);

            if (shiftValue > 0) {
                console.log("!!!!!!!!!!!!");
                box.setX(box.coord.x + shiftValue);
                box.mod += shiftValue;

                this.centerNodesBetween(id, siblingId);

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

    centerNodesBetween(leftId, rightId) {
        const leftBox = this.boxes.getBox(leftId);
        const rightBox = this.boxes.getBox(rightId);

        const leftParentChildIds = this.boxes.getConnections(leftBox.parentId);
        const leftIdx = leftParentChildIds.indexOf(leftId);

        const rightParentChildIds = this.boxes.getConnections(rightBox.parentId);
        const rightIdx = rightParentChildIds.indexOf(rightId);

        let numNodesBetween = (rightIdx - leftIdx) - 1;

        if (numNodesBetween > 0) {
            let distanceBetweenNodes = (
                (leftBox.coord.x - rightBox.coord.x) / (numNodesBetween + 1)
            );

            let count = 1;

            for (let i = leftIdx + 1; i < rightIdx; i++) {
                let middleNodeId = leftParentChildIds[i];
                let middleNode = this.boxes.getBox(middleNodeId);

                let desiredX = rightBox.coord.x + (distanceBetweenNodes * count);
                let offset = desiredX - middleNode.coord.x;
                middleNode.setX(middleNode.coord.x + offset);
                middleNode.mod += offset;

                count++;
            }

            this.checkForConflicts(leftId);
        }
    }

    calculateFinalPositions(id, modSum) {
        const box = this.boxes.getBox(id);
        const childIds = this.boxes.getConnections(id);

        box.setX(box.coord.x + modSum);
        modSum += box.mod;

        for (const cid of childIds) {
            this.calculateFinalPositions(cid, modSum);
        }

        // if (childIds.length === 0) {

        // }
    }
}

const getMaxKey = (map) => {
    let keys = Array.from(map.keys());
    return Math.max(...keys);
}

export { TreeFormatter };
