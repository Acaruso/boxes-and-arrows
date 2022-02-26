import { firstElt } from "./util";

class TreeFormatter {
    constructor(model) {
        this.boxes = model.boxes;
        this.xPadding = 50;
        this.yPadding = 70;
    }

    treeFormat(rootId) {
        this.initializeNodes(rootId, 0);
        this.calculateInitialX(rootId);
        this.calculateFinalPositions(rootId, 0);
    }

    initializeNodes(id, level) {
        const box = this.boxes.getBox(id);

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

        if (childIds.length > 0 && !this.boxes.isLeftMost(id)) {
            this.checkForConflicts(id);
        }
    }

    checkForConflicts(id) {
        const box = this.boxes.getBox(id);
        let siblingId = this.boxes.getLeftMostSibling(id);

        const minDistance = box.rect.w + this.xPadding;
        
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

                this.centerNodesBetween(id, siblingId);

                shiftValue = 0;
            }

            siblingId = this.boxes.getNextSibling(siblingId);
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
    }


    // left layout ////////////////////////////////////////////
    
    leftLayout(rootNodeId) {
        let levels = this.makeLevels(rootNodeId);

        const xStart = 500;
        const yStart = 100;
        const xPadding = 40;
        const yPadding = 80;

        let x = xStart;
        let y = yStart;

        for (let i = 0; i < levels.length; i++) {
            let curLevel = levels[i];
            x = xStart;
            for (let k = 0; k < curLevel.length; k++) {
                let box = this.boxes.getBox(curLevel[k]);
                box.setCoord({ x, y });
                x += box.rect.w + xPadding;
            }
            y += yPadding;
        }
    }

    makeLevels(rootNodeId) {
        let queue = [];
        let levels = [];
        let curLevel = 0;

        queue.push(rootNodeId);

        while (queue.length > 0) {
            const n = queue.length;
            for (let i = 0; i < n; i++) {
                const curId = queue.shift();
                const childrenIds = this.boxes.getConnections(curId);
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
}

const getMaxKey = (map) => {
    let keys = Array.from(map.keys());
    return Math.max(...keys);
}

export { TreeFormatter };
