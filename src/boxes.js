import { Box } from "./box";
import { getMidpoint, isPrintableKeycode } from "./util"

class Boxes {
    constructor(gfx, state) {
        this.gfx = gfx;
        this.state = state;
        this.boxes = [];
        this.nextId = 0;
        this.connections = new Set();
        this.selectedBoxId = -1;
        this.selectedConnection = null;

        // edit text for selected box
        const keydownHandler = (e) => {
            if (this.selectedBoxId !== -1) {
                const key = e.key.toLowerCase();
                if (isPrintableKeycode(e.which)) {
                    let box = this.getBox(this.selectedBoxId);
                    box.text += key;
                } else if (key === "backspace") {
                    let box = this.getBox(this.selectedBoxId);
                    if (box.text.length > 0) {
                        box.text = box.text.slice(0, -1);
                    }
                }
            }
        };

        document.addEventListener("keydown", keydownHandler, false);
    }

    run() {
        this.handleSelectBox();
        this.handleDeleteBox();
        this.drawSelectedBox();
        this.drawConnections();
        this.forEach((box) => box.run());
    }

    handleSelectBox() {
        if (this.state.isMousedown()) {
            let clickedInsideBox = false;

            this.forEach((box) => {
                if (this.state.isMousedownInside(box.rect)) {
                    this.selectedBoxId = box.id;
                    clickedInsideBox = true;
                }
            });

            if (!clickedInsideBox) {
                this.selectedBoxId = -1;
            }
        }
    }

    handleDeleteBox() {
        if (this.state.isKeydown("delete") && this.selectedBoxId !== -1) {
            this.deleteConnections(this.selectedBoxId);
            this.deleteBox(this.selectedBoxId);
            this.selectedBoxId = -1;
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

    drawConnections() {
        this.connections.forEach((key) => {
            const [box1, box2] = this.getBoxes(key);
            const begin = getMidpoint(box1.rect);
            const end = getMidpoint(box2.rect);
            this.gfx.drawLine(begin, end, -1);
        });
    }

    addBox(text, coord) {
        const box = new Box(this.gfx, this.state, text, coord, this.nextId);
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
