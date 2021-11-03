import { Box } from "./box";

class Boxes {
    constructor() {
        this.boxes = [];
        this.nextId = 0;
        this.connections = new Set();
    }

    addBox(text, coord) {
        const box = new Box(text, coord, this.nextId);
        this.selectedBoxId = box.id;
        this.nextId++;
        this.boxes.push(box);
    }

    forEach(fn) {
        this.boxes.forEach(fn);
    }

    getBox(id) {
        return this.boxes.find((box) => box.id === id);
    }

    getConnectionKey(box1, box2) {
        return box1.id > box2.id
            ? `${box1.id},${box2.id}`
            : `${box2.id},${box1.id}`;
    }

    getIds(key) {
        const ids = key.split(",");
        const id1 = parseInt(ids[0], 10);
        const id2 = parseInt(ids[1], 10);
        return [id1, id2];
    }

    getBoxes(key) {
        const [id1, id2] = this.getIds(key);
        return [this.getBox(id1), this.getBox(id2)];
    }

    addConnection(box1, box2) {
        const key = this.getConnectionKey(box1, box2);
        this.connections.add(key);
    }

    deleteBox(id) {
        this.boxes = this.boxes.filter((box) => box.id !== id);
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
