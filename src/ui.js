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

        const mousedownListener = () => {
            // connections //////////////////////////////////////////
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

            // create box ///////////////////////////////////////////
            if (this.state.cur.keyboard.shift) {
                const coord = { ...this.state.cur.mouse.coord };
                this.model.boxes.addBox("", coord);
            }

            // select box ///////////////////////////////////////////
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

            // dragging and selectedRegion //////////////////////////
            if (!this.state.cur.keyboard.control) {
                this.model.dragging = true;

                const coord = this.state.getMouseCoord();

                this.model.selectedRegion = {
                    x: coord.x,
                    y: coord.y,
                    w: 0,
                    h: 0,
                    alpha: 0.5,
                };
            }
        }

        const mouseupListener = () => {
            // connection ///////////////////////////////////////////
            this.model.boxes.forEach((box) => {
                if (
                    this.state.isMouseupInside(box.rect)
                    && this.model.drawingLine
                ) {
                    this.model.boxes.addConnection(this.model.outBox.id, box.id);
                    this.model.drawingLine = false;
                }
            });

            // dragging /////////////////////////////////////////////
            this.model.dragging = false;
        };

        addEventListener("mousedown", (e) => {
            mousedownListener();
        });

        addEventListener("mouseup", (e) => {
            mouseupListener();
        });

        addEventListener("keydown", (e) => {
            editTextListener(e);
            deleteBoxListener(e);
        });
    }

    handleDragging() {
        if (this.model.dragging && this.model.selectedBoxId !== -1) {
            const box = this.model.boxes.getBox(this.model.selectedBoxId);

            const newCoord = {
                x: box.coord.x + this.state.getMouseXDelta(),
                y: box.coord.y + this.state.getMouseYDelta()
            };

            box.setCoord(newCoord);

        } else if (this.model.dragging && this.model.selectedBoxId === -1) {
            this.model.selectedRegion.w += this.state.getMouseXDelta();
            this.model.selectedRegion.h += this.state.getMouseYDelta();
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
