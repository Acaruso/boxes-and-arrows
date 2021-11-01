import { Box } from "./box";
import { getMidpoint } from "./util"

class Boxes {
    constructor(gfx, state) {
        this.gfx = gfx;
        this.state = state;
        this.boxes = [];
        this.nextId = 0;
        this.connections = new Set();
        this.selectedBoxId = -1;
    }

    addBox(text, coord) {
        const box = new Box(this.gfx, this.state, text, coord, this.nextId);
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

    getBoxes(key) {
        const ids = key.split(",");
        const id1 = parseInt(ids[0], 10);
        const id2 = parseInt(ids[1], 10);
        return [this.getBox(id1), this.getBox(id2)];
    }

    addConnection(box1, box2) {
        const key = this.getConnectionKey(box1, box2);
        this.connections.add(key);
    }

    drawConnections() {
        this.connections.forEach((key) => {
            const [box1, box2] = this.getBoxes(key);
            const begin = getMidpoint(box1.rect);
            const end = getMidpoint(box2.rect);
            this.gfx.drawLine(begin, end, -1);
        });
    }

    handleSelectBox() {
        if (this.state.isMousedown()) {
            this.forEach((box) => {
                if (this.state.isMousedownInside(box.rect)) {
                    this.selectedBoxId = box.id;
                }
            });
        }
    }

    drawSelectedBox() {
        if (this.selectedBoxId !== -1) {
            const selectedBox = this.getBox(this.selectedBoxId);
            const rect = { ...selectedBox.rect };
            rect.x -= 2;
            rect.y -= 2;
            rect.w += 4;
            rect.h += 4;
            this.gfx.strokeRect(rect);
        }
    }

    run() {
        this.handleSelectBox();
        this.drawSelectedBox();
        this.forEach((box) => box.run());
        this.drawConnections();
    }
}

export { Boxes };
