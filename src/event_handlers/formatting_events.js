import {
    getAllIdsInTree,
    moveBoxes,
    isTree,
} from "../tree_util";

class FormattingEvents {
    constructor(state, model, eventTable, treeFormatter) {
        this.state = state;
        this.model = model;
        this.eventTable = eventTable;
        this.treeFormatter = treeFormatter;
    }

    addEvents() {
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
    }
}

export { FormattingEvents };
