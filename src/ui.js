import { getMidpoint, rectsOverlap, isPrintableKeycode, saveFile, loadFile } from "./util"

class Ui {
    constructor(gfx, state, model, scripter, eventTable) {
        this.gfx = gfx;
        this.state = state;
        this.model = model;
        this.scripter = scripter;
        this.eventTable = eventTable;

        addEventListener("mousedown", e => this.eventTable.onEvent(e));
        addEventListener("mouseup", e => this.eventTable.onEvent(e));
        addEventListener("keydown", e => this.eventTable.onEvent(e));

        this.addEventListeners();
    }

    addEventListeners() {
        const c_horizontalAlign = e => {
            return e.keydown && e.keyboard.control && e.keyboard.h;
        };

        this.eventTable.addEvent(
            "beginConnection",
            e => e.mousedown && e.insideBox && e.keyboard.control,
            e => {
                this.model.lineBegin = getMidpoint(e.mouseupdownBox.rect);
                this.model.outBox = e.mouseupdownBox;
                this.model.drawingLine = true;
            }
        );

        this.eventTable.addEvent(
            "addBox",
            e => e.mousedown && e.keyboard.alt,
            e => {
                const newBoxId = this.model.boxes.addBox("", e.mouse.coord);
                this.model.clearSelectedBoxIds();
                this.model.addSelectedBoxId(newBoxId);
            }
        );

        this.eventTable.addEvent(
            "deleteBox",
            e => e.keydown && e.key_ === "delete" && this.model.anyBoxesSelected(),
            e => {
                for (const id of this.model.selectedBoxIds) {
                    this.model.boxes.deleteBox(id);
                }
                this.model.clearSelectedBoxIds();
            }
        );

        this.eventTable.addEvent(
            "clickAndSelectBox",
            e => {
                return e.mousedown
                    && e.insideBox
                    && !e.keyboard.control
                    && !e.keyboard.shift
                    && !this.model.isBoxSelected(e.mouseupdownBox.id);
            },
            e => {
                this.model.clearSelectedBoxIds();
                this.model.addSelectedBoxId(e.mouseupdownBox.id);
            }
        );

        this.eventTable.addEvent(
            "shiftClickAndAddSelectBox",
            e => e.mousedown && e.insideBox && !e.keyboard.control && e.keyboard.shift,
            e => this.model.addSelectedBoxId(e.mouseupdownBox.id)
        );

        this.eventTable.addEvent(
            "clickAndUnselectBox",
            e => e.mousedown && !e.insideBox && !e.keyboard.control && !e.keyboard.alt,
            e => this.model.clearSelectedBoxIds()
        );

        this.eventTable.addEvent(
            "beginDraggingBoxes",
            e => e.mousedown && !e.keyboard.control && e.insideBox,
            e => this.model.draggingBoxes = true
        );

        this.eventTable.addEvent(
            "beginDraggingSelectedRegion",
            e => e.mousedown && !e.keyboard.control && !e.insideBox,
            e => this.model.draggingSelectedRegion = true
        );

        this.eventTable.addEvent(
            "setSelectedRegionCoords",
            e => e.mousedown && !e.keyboard.control,
            e => {
                this.model.selectedRegion = {
                    x: e.mouse.coord.x,
                    y: e.mouse.coord.y,
                    w: 0,
                    h: 0,
                    alpha: 0.3,
                };
            }
        );

        this.eventTable.addEvent(
            "addConnection",
            e => e.mouseup && e.insideBox && this.model.drawingLine,
            e => {
                this.model.boxes.addConnection(
                    this.model.outBox.id,
                    e.mouseupdownBox.id
                );
                this.model.drawingLine = false;
            }
        );

        this.eventTable.addEvent(
            "endDraggingBoxes",
            e => e.mouseup,
            e => this.model.draggingBoxes = false
        );

        this.eventTable.addEvent(
            "endDrawingLine",
            e => e.mouseup,
            e => this.model.drawingLine = false
        );

        this.eventTable.addEvent(
            "endDraggingSelectedRegion",
            e => e.mouseup,
            e => this.model.draggingSelectedRegion = false
        );

        this.eventTable.addEvent(
            "appendChar",
            e => {
                return e.keydown
                    && this.model.anyBoxesSelected()
                    && isPrintableKeycode(e.which)
                    && !c_horizontalAlign(e);
            },
            e => {
                for (const id of this.model.selectedBoxIds) {
                    let box = this.model.boxes.getBox(id);
                    box.appendChar(e.key_);
                }
            }
        );

        this.eventTable.addEvent(
            "deleteChar",
            e => {
                return e.keydown
                    && this.model.anyBoxesSelected()
                    && e.key_ === "backspace";
            },
            e => {
                for (const id of this.model.selectedBoxIds) {
                    let box = this.model.boxes.getBox(id);
                    box.deleteChar();
                }
            }
        );

        this.eventTable.addEvent(
            "horizontalAlign",
            c_horizontalAlign,
            // e => e.keydown && e.keyboard.control && e.keyboard.h,
            e => {
                e.preventDefault();
                this.state.cur.keyboard.control = false;
                this.state.cur.keyboard.h = false;

                let minY = 1000000000;
                for (const id of this.model.selectedBoxIds) {
                    let box = this.model.boxes.getBox(id);
                    minY = Math.min(minY, box.coord.y);
                }

                for (const id of this.model.selectedBoxIds) {
                    let box = this.model.boxes.getBox(id);
                    box.setCoord({ x: box.coord.x, y: minY });
                }
            }
        );

        this.eventTable.addEvent(
            "saveFile",
            e => e.keydown && e.keyboard.control && e.keyboard.s,
            e => {
                e.preventDefault();
                this.state.cur.keyboard.control = false;
                this.state.cur.keyboard.s = false;
                const boxesStr = JSON.stringify(this.model.boxes.boxes);
                const connStr = JSON.stringify([...this.model.boxes.connections]);
                saveFile(boxesStr + "\n" + connStr);
            }
        );

        this.eventTable.addEvent(
            "loadFile",
            e => e.keydown && e.keyboard.control && e.keyboard.l,
            e => {
                e.preventDefault();
                this.state.cur.keyboard.control = false;
                this.state.cur.keyboard.l = false;
                loadFile((content) => {
                    this.model.boxes.deleteAll();
                    const [boxesStr, connStr] = content.split(/\n/);
                    const boxData = JSON.parse(boxesStr);
                    const connData = JSON.parse(connStr);
                    this.model.boxes.loadBoxes(boxData);
                    this.model.boxes.loadConnections(connData);
                });
            }
        );
    }

    handleDragging() {
        if (this.model.draggingBoxes && this.model.anyBoxesSelected()) {
            // drag boxes
            for (const id of this.model.selectedBoxIds) {
                const box = this.model.boxes.getBox(id);

                const newCoord = {
                    x: box.coord.x + this.state.getMouseXDelta(),
                    y: box.coord.y + this.state.getMouseYDelta()
                };

                box.setCoord(newCoord);
            }
        } else if (this.model.draggingSelectedRegion) {
            // drag selected region
            this.model.selectedRegion.w += this.state.getMouseXDelta();
            this.model.selectedRegion.h += this.state.getMouseYDelta();

            this.model.boxes.forEach(box => {
                if (rectsOverlap(box.rect, this.model.selectedRegion)) {
                    this.model.addSelectedBoxId(box.id);
                }
            });
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
