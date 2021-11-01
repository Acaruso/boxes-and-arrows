import { Box } from "./box";

class Boxes {
    constructor(gfx, state) {
        this.gfx = gfx;
        this.state = state;
        this.boxes = [];
        this.nextId = 0;
        this.connections = new Set();
    }

    addBox(text, coord) {
        const box = new Box(this.gfx, this.state, text, coord, this.nextId);
        this.nextId++;
        this.boxes.push(box);
    }

    forEach(fn) {
        for (let i = 0; i < this.boxes.length; i++) {
            fn(this.boxes[i]);
        }
    }

    run() {
        this.forEach((box) => box.run());
    }

    getConnectionKey(box1, box2) {
        return box1.id > box2.id
            ? `${box1.id},${box2.id}`
            : `${box2.id},${box1.id}`;
    }

    addConnection(box1, box2) {
        const key = getConnectionKey(box1, box2);
        this.connections.add(key);
    }
}

export { Boxes };
