import { Box } from "./box";
import { firstElt, lastElt } from "./util";

class Boxes {
    constructor() {
        this.boxes = [];
        this.nextId = 0;

        // key: id of source
        // value: array of ids of destinations
        // ex: { 
        //     1: [2, 3, 4], 
        //     2: [8, 9] 
        // }
        this.connections = new Map();
    }

    addBox(text, coord) {
        const box = new Box(text, coord, this.nextId);
        this.nextId++;
        this.boxes.push(box);
        this.connections.set(box.id, []);
        return box.id;
    }

    getLength() {
        return this.boxes.length;
    }

    loadBoxes(boxesStr) {
        const boxData = JSON.parse(boxesStr);
        let maxId = -1;

        for (const x of boxData) {
            const box = new Box(x.text, x.coord, x.id);
            this.boxes.push(box);
            maxId = Math.max(maxId, x.id);
        }

        this.nextId = maxId + 1;
    }

    loadConnections(connStr) {
        this.connections = new Map(JSON.parse(connStr));
    }

    getBoxes() {
        return this.boxes;
    }

    getBox(id) {
        return this.boxes.find((box) => box.id === id);
    }

    deleteBox(id) {
        this.deleteConnections(id);
        this.boxes = this.boxes.filter((box) => box.id !== id);
    }

    deleteAll() {
        this.boxes.forEach(box => this.deleteBox(box.id));
    }

    addConnection(source, dest) {
        let destArr = this.connections.get(source);

        if (!destArr.includes(dest)) {
            destArr.push(dest);
        }
    }

    getAllConnections() {
        let out = [];

        for (const [source, destArr] of this.connections) {
            for (const dest of destArr) {
                out.push([
                    this.getBox(source),
                    this.getBox(dest)
                ]);
            }
        }

        return out;
    }

    getConnections(id) {
        return this.connections.has(id)
            ? this.connections.get(id)
            : [];
    }

    deleteConnections(id) {
        this.connections.delete(id);
        for (let [source, destArr] of this.connections) {
            this.connections.set(source, destArr.filter(x => x !== id));
        }
    }

    forEach(fn) {
        this.boxes.forEach(fn);
    }



    // new ///////////////////

    hasParent(id) {
        const box = this.getBox(id);
        return (box.parentId !== null);
    }

    isLeaf(id) {
        const childIds = this.getConnections(id);
        return (childIds.length === 0);
    }

    isLeftMost(id) {
        const box = this.getBox(id);
        if (box.parentId === null) {
            return true;
        } else {
            const parentChildIds = this.getConnections(parentId);
            return (firstElt(parentChildIds) === id);
        }
    }

    isRightMost(id) {
        const box = this.getBox(id);
        if (box.parentId === null) {
            return true;
        } else {
            const parentChildIds = this.getConnections(box.parentId);
            return (lastElt(parentChildIds) === id);
        }
    }

    getPrevSibling(id) {
        const box = this.getBox(id);
        if (box.parentId === null || this.isLeftMost(id)) {
            return null;
        } else {
            const parentChildIds = this.getConnections(box.parentId);
            const thisIdx = parentChildIds.indexOf(id);
            return parentChildIds[thisIdx - 1];
        }
    }

    getNextSibling(id) {
        const box = this.getBox(id);
        if (box.parentId === null || this.isRightMost(id)) {
            return null;
        } else {
            const parentChildIds = this.getConnections(box.parentId);
            const thisIdx = parentChildIds.indexOf(id);
            return parentChildIds[thisIdx + 1];
        }
    }

    getLeftMostSibling(id) {
        const box = this.getBox(id);
        if (box.parentId === null) {
            return null;
        } else if (this.isLeftMost(id)) {
            return id;
        } else {
            const parentChildIds = this.getConnections(box.parentId);
            return firstElt(parentChildIds);
        }
    }

    getLeftMostChild(id) {
        const childIds = this.getConnections(id);
        if (childIds.length === 0) {
            return null;
        } else {
            return firstElt(childIds);
        }
    }

    getRightMostChild(id) {
        const childIds = this.getConnections(id);
        if (childIds.length === 0) {
            return null;
        } else {
            return lastElt(childIds);
        }
    }
}

export { Boxes };
