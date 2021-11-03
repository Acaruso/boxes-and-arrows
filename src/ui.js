import { getMidpoint, isPrintableKeycode } from "./util"

// controller
class Ui {
    constructor(gfx, state, renderer, model) {
        this.gfx = gfx;
        this.state = state;
        this.renderer = renderer;
        this.model = model;

        // this.boxes = new Boxes();

        // this.boxes.addBox("test1", { x: 4, y: 4 });
        // this.boxes.addBox("test2", { x: 90, y: 4 });
        // this.boxes.addBox("test3", { x: 90, y: 100 });

        // this.selectedBoxId = -1;
        // this.dragging = false;

        // this.lineBegin = { x: 0, y: 0 };
        // this.drawingLine = false;
        // this.outBox = {};

        this.addEventListeners();
    }

    addEventListeners() {
        const createBoxListener = () => {
            if (this.state.cur.keyboard.shift) {
                const coord = { ...this.state.cur.mouse.coord };
                this.model.boxes.addBox("", coord);
            }
        };

        const connectionMousedownListener = () => {
            this.model.boxes.forEach((box) => {
                if (
                    this.state.isMousedownInside(box.rect)
                    && this.state.cur.keyboard.control
                ) {
                    this.model.lineBegin = getMidpoint(box.rect);
                    this.model.outBox = box;
                    this.model.drawingLine = true;
                }
            });
        };

        const connectionMouseupListener = () => {
            this.model.boxes.forEach((box) => {
                if (
                    this.state.isMouseupInside(box.rect)
                    && this.model.drawingLine
                ) {
                    this.model.boxes.addConnection(this.model.outBox, box);
                    this.model.drawingLine = false;
                }
            });
        };

        const selectBoxListener = () => {
            let clickedInsideBox = false;

            this.model.boxes.forEach((box) => {
                if (this.state.isMousedownInside(box.rect)) {
                    this.model.selectedBoxId = box.id;
                    clickedInsideBox = true;
                }
            });

            if (!clickedInsideBox) {
                this.model.selectedBoxId = -1;
            }
        };

        const editTextListener = (e) => {
            if (this.model.selectedBoxId !== -1) {
                let box = this.model.boxes.getBox(this.model.selectedBoxId);
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

            if (key === "delete" && this.model.selectedBoxId !== -1) {
                this.model.boxes.deleteBox(this.model.selectedBoxId);
                this.model.selectedBoxId = -1;
            }
        };

        const draggingMousedownListener = () => {
            this.model.boxes.forEach((box) => {
                if (
                    this.state.isMousedownInside(box.rect)
                    && !this.state.cur.keyboard.control
                ) {
                    this.model.dragging = true;
                }
            });
        };

        const draggingMouseupListener = () => {
            this.model.dragging = false;
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
        if (this.model.dragging) {
            const box = this.model.boxes.getBox(this.model.selectedBoxId);

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
            this.model.lineBegin,
            this.model.drawingLine,
            this.model.boxes,
            this.model.selectedBoxId,
        );
    }
}

const addEventListener = (type, callback) => {
    document.addEventListener(type, callback, false);
}

export { Ui };
