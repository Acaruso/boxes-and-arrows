import { Boxes } from "./boxes";
import { getMidpoint, isPrintableKeycode } from "./util"

// controller
class Ui {
    constructor(gfx, state, renderer) {
        this.gfx = gfx;
        this.state = state;
        this.renderer = renderer;

        this.boxes = new Boxes();
        this.boxes.addBox("test1", { x: 4, y: 4 });
        this.boxes.addBox("test2", { x: 90, y: 4 });
        this.boxes.addBox("test3", { x: 90, y: 100 });

        this.selectedBoxId = -1;
        this.dragging = false;

        this.lineBegin = { x: 0, y: 0 };
        this.drawingLine = false;
        this.outBox = {};

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
                let box = this.boxes.getBox(this.selectedBoxId);
                const key = e.key ? e.key.toLowerCase() : "";

                if (isPrintableKeycode(e.which)) {
                    box.appendChar(key);
                } else if (key === "backspace") {
                    box.deleteChar();
                }
            }
        };

        const deleteBoxListener = (e) => {
            const key = e.key ? e.key.toLowerCase() : "";

            if (key === "delete" && this.selectedBoxId !== -1) {
                this.boxes.deleteBox(this.selectedBoxId);
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

        addEventListener("mousedown", connectionMousedownListener);
        addEventListener("mousedown", createBoxListener);
        addEventListener("mouseup", connectionMouseupListener);
        addEventListener("mousedown", selectBoxListener);
        addEventListener("keydown", editTextListener);
        addEventListener("keydown", deleteBoxListener);
        addEventListener("mousedown", draggingMousedownListener);
        addEventListener("mouseup", draggingMouseupListener);
    }

    handleDragging() {
        if (this.dragging) {
            const box = this.boxes.getBox(this.selectedBoxId);

            const newCoord = {
                x: box.coord.x + this.state.getMouseXDelta(),
                y: box.coord.y + this.state.getMouseYDelta()
            };

            box.setCoord(newCoord);
        }
    }

    run() {
        this.handleDragging();

        this.renderer.render(
            this.lineBegin,
            this.drawingLine,
            this.boxes,
            this.selectedBoxId,
        );
    }
}

const addEventListener = (type, callback) => {
    document.addEventListener(type, callback, false);
}

export { Ui };
