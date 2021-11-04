import { getMidpoint, isPrintableKeycode } from "./util"

class Ui {
    constructor(gfx, state, model, scripter) {
        this.gfx = gfx;
        this.state = state;
        this.model = model;
        this.scripter = scripter;

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
                    this.model.boxes.addConnection(this.model.outBox.id, box.id);
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

        const levelsListener = (e) => {
            const key = e.key ? e.key.toLowerCase() : "";
            if (key === "arrowdown") {
                this.model.boxes.deleteAll();
                this.model.numLevels++;
                this.scripter.makeTree(this.model.numLevels);
            } else if (key === "arrowup") {
                this.model.boxes.deleteAll();
                this.model.numLevels--;
                this.scripter.makeTree(this.model.numLevels);
            }
        }

        addEventListener("mousedown", connectionMousedownListener);
        addEventListener("mousedown", createBoxListener);
        addEventListener("mouseup", connectionMouseupListener);
        addEventListener("mousedown", selectBoxListener);
        addEventListener("keydown", editTextListener);
        addEventListener("keydown", deleteBoxListener);
        addEventListener("mousedown", draggingMousedownListener);
        addEventListener("mouseup", draggingMouseupListener);
        addEventListener("keydown", levelsListener);
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
    }
}

const addEventListener = (type, callback) => {
    document.addEventListener(type, callback, false);
}

export { Ui };
