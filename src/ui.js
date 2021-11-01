import { Boxes } from "./boxes";
import { getMidpoint } from "./util"

class Ui {
    constructor(gfx, state) {
        this.gfx = gfx;
        this.state = state;

        this.boxes = new Boxes(gfx, state);
        this.lineBegin = { x: 0, y: 0 };
        this.outBox = {};
        this.drawingLine = false;
        // this.selectedBoxId = -1;

        this.boxes.addBox("test1", { x: 4, y: 4 });
        this.boxes.addBox("test2", { x: 90, y: 4 });
        this.boxes.addBox("test3", { x: 90, y: 100 });
    }

    run() {
        this.handleUserInput();
        this.boxes.run();
    }

    handleUserInput() {
        // this.handleSelectBox();
        this.handleCreateBox();
        this.handleCreateConnection();
    }

    // drawSelectedBox() {
    //     if (this.selectedBoxId !== -1) {
    //         const selectedBox = this.boxes.getBox(this.selectedBoxId);

    //     }
    // }

    // handleSelectBox() {
    //     let clickedInsideBox = false;

    //     this.boxes.forEach((box) => {
    //         if (this.state.isMousedownInside(box.rect)) {
    //             this.selectedBoxId = box.id;
    //             clickedInsideBox = true;
    //         }
    //     });

    //     if (!clickedInsideBox) {
    //         this.selectedBoxId = -1;
    //     }
    // }

    handleCreateBox() {
        if (this.state.isMousedown() && this.state.cur.keyboard.shift) {
            const coord = { ...this.state.cur.mouse.coord };
            this.boxes.addBox("asdf", coord);
        }
    }

    handleCreateConnection() {
        const curMouse = this.state.cur.mouse;

        this.boxes.forEach((box) => {
            if (
                this.state.isMousedownInside(box.rect)
                && this.state.cur.keyboard.control
            ) {
                this.lineBegin = getMidpoint(box.rect);
                this.outBox = box;
                this.drawingLine = true;
            }

            if (
                this.state.isMouseupInside(box.rect)
                && this.drawingLine
            ) {
                this.boxes.addConnection(this.outBox, box);
                this.drawingLine = false;
            }
        });

        if (
            this.state.cur.mouse.clicked
            && this.state.cur.keyboard.control
            && this.drawingLine
        ) {
            this.gfx.drawLine(this.lineBegin, { ...curMouse.coord }, -1);
        }
    }
}

export { Ui };
