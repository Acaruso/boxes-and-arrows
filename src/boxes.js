import { Box } from "./box";

class Boxes {
    constructor() {
        this.boxes = [];
        this.nextId = 0;

        // key: id of source
        // value: array of ids of destinations
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

    getDests(id) {
        return this.connections.get(id);
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
}

export { Boxes };
