import {
    getMidpoint,
    rectsOverlap,
    isPrintableKeycode,
    saveFile,
    loadFile,
    loadFileFromHandle,
} from "./util"

import {
    getAllIdsInTree,
    moveBoxes,
    isTree,
 } from "./tree_util";

const addEventListener = (type, callback) => {
    document.addEventListener(type, callback, false);
}

class Ui {
    constructor(state, model, eventTable, scripter, treeFormatter) {
        this.state = state;
        this.model = model;
        this.eventTable = eventTable;
        this.scripter = scripter;
        this.treeFormatter = treeFormatter;
        this.prevFileHandle = null;
        this.drag = false;
        this.dragCoord = { x: 0, y: 0 };
        this.dragDeltaCoord = { x: 0, y: 0 };

        addEventListener("mousedown", e => this.eventTable.onEvent(e));
        addEventListener("mouseup", e => this.eventTable.onEvent(e));
        addEventListener("dblclick", e => this.eventTable.onEvent(e));
        addEventListener("keydown", e => this.eventTable.onEvent(e));

        this.addEventListeners();
    }

    addEventListeners() {
        this.eventTable.addEvent(
            "beginConnection",
            e => e.mousedown && e.insideBox && e.keyboard.control,
            e => {
                this.model.lineBegin = getMidpoint(e.mouseBox.rect);
                this.model.outBox = e.mouseBox;
                this.model.drawingLine = true;
            }
        );

        this.eventTable.addEvent(
            "addConnection",
            e => e.mouseup && e.insideBox && this.model.drawingLine,
            e => {
                this.model.boxes.addConnection(
                    this.model.outBox.id,
                    e.mouseBox.id
                );
                this.model.drawingLine = false;
            }
        );

        this.eventTable.addEvent(
            "addBox",
            e => e.dblclick && !e.insideBox,
            e => {
                const text = "";
                const newBoxId = this.model.boxes.addBox(text, e.mouse.coord);
                this.model.clearSelectedBoxIds();
                this.model.addSelectedBoxId(newBoxId);
            }
        );

        this.eventTable.addEvent(
            "duplicateBox",
            e => e.mousedown && e.keyboard.alt && e.insideBox,
            e => {
                // const newBoxId = this.model.boxes.addBox(e.mouseBox.text, e.mouse.coord);
                const newBoxId = this.model.boxes.cloneBox(e.mouseBox, e.mouse.coord);
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
                    && !e.keyboard.alt
                    && !this.model.isBoxSelected(e.mouseBox.id);
            },
            e => {
                this.model.clearSelectedBoxIds();
                this.model.addSelectedBoxId(e.mouseBox.id);
            }
        );

        this.eventTable.addEvent(
            "shiftClickAndAddSelectBox",
            e => e.mousedown && e.insideBox && !e.keyboard.control && e.keyboard.shift,
            e => this.model.addSelectedBoxId(e.mouseBox.id)
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
            "endDraggingBoxes",
            e => e.mouseup,
            e => this.model.draggingBoxes = false
        );

        this.eventTable.addEvent(
            "beginDraggingSelectedRegion",
            e => e.mousedown && !e.keyboard.control && !e.insideBox,
            e => {
                this.model.draggingSelectedRegion = true;
            }
        );

        this.eventTable.addEvent(
            "endDraggingSelectedRegion",
            e => e.mouseup,
            e => this.model.draggingSelectedRegion = false
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
            "endDrawingLine",
            e => e.mouseup,
            e => this.model.drawingLine = false
        );

        this.eventTable.addEvent(
            "appendString",
            e => {
                return e.keydown
                    && this.model.anyBoxesSelected()
                    && isPrintableKeycode(e.which)
                    && !e.keyboard.control
            },
            e => {
                for (const id of this.model.selectedBoxIds) {
                    let box = this.model.boxes.getBox(id);
                    box.appendString(e.key_);
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
            e => e.keydown && e.keyboard.control && e.keyboard.h,
            e => {
                e.preventDefault();
                let minY = Number.MAX_SAFE_INTEGER;
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
            "verticalAlign",
            e => e.keydown && e.keyboard.control && e.keyboard.v,
            e => {
                e.preventDefault();
                let minXMid = Number.MAX_SAFE_INTEGER;
                for (const id of this.model.selectedBoxIds) {
                    let box = this.model.boxes.getBox(id);
                    minXMid = Math.min(
                        minXMid,
                        Math.floor(box.rect.x + (box.rect.w / 2))
                    );
                }

                for (const id of this.model.selectedBoxIds) {
                    let box = this.model.boxes.getBox(id);
                    box.setCoord({
                        x: minXMid - Math.floor(box.rect.w / 2),
                        y: box.coord.y
                    });
                }
            }
        );

        this.eventTable.addEvent(
            "treeFormat",
            e => (
                e.keydown
                && e.keyboard.control
                && e.keyboard.q
                && this.model.selectedBoxIds.length === 1
            ),
            e => {
                const selectedBox = this.model.selectedBoxIds[0]
                if (!isTree(selectedBox, this.model.boxes)) {
                    console.log("not a tree!");
                    return;
                }
                this.treeFormatter.treeFormat(selectedBox);
                const treeIds = getAllIdsInTree(selectedBox, this.model.boxes);
                moveBoxes(treeIds, this.state.cur.mouse.coord, this.model.boxes);
            }
        );

        this.eventTable.addEvent(
            "selectAll",
            e => e.keydown && e.keyboard.control && e.keyboard.a,
            e => {
                this.model.clearSelectedBoxIds();
                this.model.boxes.forEach(elt => {
                    this.model.addSelectedBoxId(elt.id);
                });
            }
        );

        this.eventTable.addEvent(
            "saveFile",
            e => e.keydown && e.keyboard.control && e.keyboard.s,
            async e => {
                e.preventDefault();
                try {
                    const boxesStr = JSON.stringify(this.model.boxes.boxes);
                    const connStr = JSON.stringify([...this.model.boxes.connections]);
                    await saveFile(boxesStr + "\n" + connStr);
                } catch (e) {
                    console.log(e);
                }
                this.state.cur.keyboard.control = false;
                this.state.cur.keyboard.s = false;
            }
        );

        this.eventTable.addEvent(
            "loadFile",
            e => e.keydown && e.keyboard.control && !e.keyboard.shift && e.keyboard.l,
            async e => {
                e.preventDefault();
                try {
                    const [_, content] = await loadFile();
                    this.model.init();
                    const [boxesStr, connStr] = content.split(/\n/);
                    this.model.boxes.loadBoxes(boxesStr);
                    this.model.boxes.loadConnections(connStr);
                } catch (e) {
                    console.log(e);
                }
                this.state.cur.keyboard.control = false;
                this.state.cur.keyboard.l = false;
            }
        );

        this.eventTable.addEvent(
            "loadScript",
            e => e.keydown && e.keyboard.control && e.keyboard.shift && !e.keyboard.alt && e.keyboard.l,
            async e => {
                e.preventDefault();
                try {
                    const scriptElt = document.createElement("script");
                    const [fileHandle, content] = await loadFile();
                    this.prevFileHandle = fileHandle;
                    const textNode = document.createTextNode(content);
                    scriptElt.appendChild(textNode);
                    const targetElt = document.getElementById("userScripts");
                    targetElt.append(scriptElt);
                    this.model.init();
                    setTimeout(() => {}, 0);    // wait for one event-cycle
                    this.scripter.runUserFunction(userFunction);
                } catch (e) {
                    console.log(e);
                }
                this.state.cur.keyboard.control = false;
                this.state.cur.keyboard.shift = false;
                this.state.cur.keyboard.l = false;
            }
        );

        this.eventTable.addEvent(
            "reloadScript",
            e => e.keydown && e.keyboard.control && e.keyboard.shift && e.keyboard.alt && e.keyboard.l,
            async e => {
                e.preventDefault();
                try {
                    if (this.prevFileHandle === null) {
                        return;
                    }
                    const scriptElt = document.createElement("script");
                    const content = await loadFileFromHandle(this.prevFileHandle);
                    const textNode = document.createTextNode(content);
                    scriptElt.appendChild(textNode);
                    const targetElt = document.getElementById("userScripts");
                    targetElt.append(scriptElt);
                    this.model.init();
                    setTimeout(() => {}, 0);    // wait for one event-cycle
                    this.scripter.runUserFunction(userFunction);
                } catch (e) {
                    console.log(e);
                }
                this.state.cur.keyboard.control = false;
                this.state.cur.keyboard.shift = false;
                this.state.cur.keyboard.alt = false;
                this.state.cur.keyboard.l = false;
            }
        );

        this.eventTable.addEvent(
            "closeHelpDialog",
            e => (
                e.mousedown
                && this.state.isMouseInside(this.model.helpDialog.closeButtonRect)
                && this.model.helpDialog.visible
            ),
            e => this.model.helpDialog.visible = false
        );

        this.eventTable.addEvent(
            "printAllBoxes",
            e => e.keydown && e.keyboard.control && e.keyboard.space,
            e => {
                console.log(this.model.boxes);
                console.log(window.pageXOffset);
                console.log(window.pageYOffset);
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

    handleScrolling() {
        const kb = this.state.cur.keyboard;
        if (
            !kb.control
            && !this.model.anyBoxesSelected()
            && (kb.w || kb.a || kb.s || kb.d)
        ) {
            const scrollAmount = 10;
            const oldXOffset = window.pageXOffset;
            const oldYOffset = window.pageYOffset;

            if (kb.w) {
                window.scroll(oldXOffset, oldYOffset - scrollAmount);
            }

            if (kb.a) {
                window.scroll(oldXOffset - scrollAmount, oldYOffset);
            }

            if (kb.s) {
                window.scroll(oldXOffset, oldYOffset + scrollAmount);
            }

            if (kb.d) {
                window.scroll(oldXOffset + scrollAmount, oldYOffset);
            }
        }
    }

    run() {
        this.handleDragging();
        this.handleScrolling();
    }
}

export { Ui };
