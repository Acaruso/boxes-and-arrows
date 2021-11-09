import { Box } from "./box";

class Boxes {
    constructor() {
        this.boxes = [];
        this.nextId = 0;

        // key: id of source
        // value: array of ids of destinations
        this.connections = new Map();

        // this.connections = new Set();
    }

    // box ////////////////////////////////////////////////

    addBox(text, coord) {
        const box = new Box(text, coord, this.nextId);
        this.nextId++;
        this.boxes.push(box);
        this.connections.set(box.id, []);
        // this.connections[box.id] = [];
        return box.id;
    }

    loadBoxes(boxData) {
        let maxId = -1;
        for (const x of boxData) {
            const box = new Box(x.text, x.coord, x.id);
            this.boxes.push(box);
            maxId = Math.max(maxId, x.id);
        }
        this.nextId = maxId + 1;
    }

    loadConnections(connData) {
        for (const x of connData) {
            this.addConnectionByKey(x);
        }
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

    // connection /////////////////////////////////////////

    addConnection(source, dest) {
        // let destArr = this.connections[source];
        let destArr = this.connections.get(source);

        if (!destArr.includes(dest)) {
            destArr.push(dest);
        }
    }

    addConnectionByKey(key) {
        this.connections.add(key);
    }

    getConnections() {
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

    // getConnections() {
    //     return Array.from(this.connections)
    //         .map(key => this.getBoxes(key));
    // }

    // util ///////////////////////////////////////////////

    forEach(fn) {
        this.boxes.forEach(fn);
    }

    // private ////////////////////////////////////////////

    getConnectionKey(id1, id2) {
        return id1 > id2
            ? `${id1},${id2}`
            : `${id2},${id1}`;
    }

    getBoxes(key) {
        const [id1, id2] = this.getIds(key);
        return [this.getBox(id1), this.getBox(id2)];
    }

    getIds(key) {
        const ids = key.split(",");
        const id1 = parseInt(ids[0], 10);
        const id2 = parseInt(ids[1], 10);
        return [id1, id2];
    }

    deleteConnections(id) {
        let toDelete = [];

        this.connections.forEach((key) => {
            const [id1, id2] = this.getIds(key);
            if (id1 === id || id2 === id) {
                toDelete.push(key);
            }
        });

        toDelete.forEach((key) => this.connections.delete(key));
    }

}

export { Boxes };
