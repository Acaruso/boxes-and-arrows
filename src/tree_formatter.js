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
                box.setX(prevSib.coord.x + this.xPadding);
            } else {
                box.setX(0);
            }
        } else if (childIds.length === 1) {
            const child = this.boxes.getBox(firstElt(childIds));
            if (this.boxes.isLeftMost(id)) {
                box.setX(child.coord.x)
            } else {
                box.setX(prevSib.coord.x + this.xPadding);
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
                box.setX(prevSib.x + this.xPadding);
                box.mod = box.coord.x - mid;
            }
        }

        // todo: check for conflicts
    }
}

export { TreeFormatter };
