import { Boxes } from "./boxes";
import { getMidpoint, isPrintableKeycode } from "./util"

// controller
class Ui {
    constructor(gfx, state) {
        this.gfx = gfx;
        this.state = state;

        this.boxes = new Boxes(gfx, state);
        this.boxes.addBox("test1", { x: 4, y: 4 });
        this.boxes.addBox("test2", { x: 90, y: 4 });
        this.boxes.addBox("test3", { x: 90, y: 100 });

        this.selectedBoxId = -1;
        this.dragging = false;

        this.lineBegin = { x: 0, y: 0 };
        this.outBox = {};
        this.drawingLine = false;

        this.addEventListeners();
    }

    addEventListeners() {
        const createBoxListener = () => {
            if (this.state.cur.keyboard.shift) {
                const coord = { ...this.state.cur.mouse.coord };
                this.boxes.addBox("", coord);
            }
        };

        const connectionMousedownListener = () => {
            this.boxes.forEach((box) => {
                if (
                    this.state.isMousedownInside(box.rect)
                    && this.state.cur.keyboard.control
                ) {
                    this.lineBegin = getMidpoint(box.rect);
                    this.outBox = box;
                    this.drawingLine = true;
                }
            });
        };

        const connectionMouseupListener = () => {
            this.boxes.forEach((box) => {
                if (
                    this.state.isMouseupInside(box.rect)
                    && this.drawingLine
                ) {
                    this.boxes.addConnection(this.outBox, box);
                    this.drawingLine = false;
                }
            });
        };

        const selectBoxListener = () => {
            let clickedInsideBox = false;

            this.boxes.forEach((box) => {
                if (this.state.isMousedownInside(box.rect)) {
                    this.selectedBoxId = box.id;
                    clickedInsideBox = true;
                }
            });

            if (!clickedInsideBox) {
                this.selectedBoxId = -1;
            }
        };

        const editTextListener = (e) => {
            if (this.selectedBoxId !== -1) {
                const key = e.key.toLowerCase();
                if (isPrintableKeycode(e.which)) {
                    let box = this.boxes.getBox(this.selectedBoxId);
                    box.text += key;
                } else if (key === "backspace") {
                    let box = this.boxes.getBox(this.selectedBoxId);
                    if (box.text.length > 0) {
                        box.text = box.text.slice(0, -1);
                    }
                }
            }
        };

        const deleteBoxListener = (e) => {
            const key = e.key ? e.key.toLowerCase() : "";

            if (key === "delete" && this.selectedBoxId !== -1) {
                this.deleteConnections(this.selectedBoxId);
                this.deleteBox(this.selectedBoxId);
                this.selectedBoxId = -1;
            }
        };

        const draggingMousedownListener = () => {
            this.boxes.forEach((box) => {
                if (
                    this.state.isMousedownInside(box.rect)
                    && !this.state.cur.keyboard.control
                ) {
                    this.dragging = true;
                }
            });
        };

        const draggingMouseupListener = () => {
            this.dragging = false;
        };

        document.addEventListener("mousedown", connectionMousedownListener, false);
        document.addEventListener("mousedown", createBoxListener, false);
        document.addEventListener("mouseup", connectionMouseupListener, false);
        document.addEventListener("mousedown", selectBoxListener, false);
        document.addEventListener("keydown", editTextListener, false);
        document.addEventListener("keydown", deleteBoxListener, false);
        document.addEventListener("mousedown", draggingMousedownListener, false);
        document.addEventListener("mouseup", draggingMouseupListener, false);
    }

    run() {
        this.boxes.run();
        this.drawLine();
        this.drawSelectedBox();
        this.drawConnections();
        this.handleDragging();
    }

    drawLine() {
        if (
            this.state.cur.mouse.clicked
            && this.state.cur.keyboard.control
            && this.drawingLine
        ) {
            const curMouse = this.state.cur.mouse;
            this.gfx.drawLine(this.lineBegin, { ...curMouse.coord }, -1);
        }
    }

    drawSelectedBox() {
        if (this.selectedBoxId !== -1) {
            const selectedBox = this.boxes.getBox(this.selectedBoxId);
            const rect = { ...selectedBox.rect };
            rect.x -= 2;
            rect.y -= 2;
            rect.w += 4;
            rect.h += 4;
            this.gfx.strokeRect(rect);
        }
    }

    drawConnections() {
        this.boxes.connections.forEach((key) => {
            const [box1, box2] = this.boxes.getBoxes(key);
            const begin = getMidpoint(box1.rect);
            const end = getMidpoint(box2.rect);
            this.gfx.drawLine(begin, end, -1);
        });
    }

    handleDragging() {
        if (this.dragging) {
            const box = this.boxes.getBox(this.selectedBoxId);
            box.coord.x += this.state.getMouseXDelta();
            box.coord.y += this.state.getMouseYDelta();
        }
    }
}

export { Ui };
