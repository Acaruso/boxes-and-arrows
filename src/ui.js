import { Box } from "./box";
import { getMidpoint } from "./util"

class Ui {
    constructor(gfx, state) {
        this.gfx = gfx;
        this.state = state;
        this.boxes = [];
        this.lineBegin = { x: 0, y: 0 };
        this.outBox = {};
        this.drawingLine = false;
        
        this.boxes = [
            new Box(this.gfx, this.state, "test1", { x: 4, y: 4 }),
            new Box(this.gfx, this.state, "test2", { x: 90, y: 4 }),
        ];
    }

    draw() {
        this.connect();

        for (const x of this.boxes) {
            x.draw();
        }
    }

    connect() {
        const curMouse = this.state.cur.mouse;

        for (const box of this.boxes) {
            if (
                this.state.isMousedown() 
                && this.state.cur.keyboard.control
                && this.state.isMousedownInside(box.rect)
            ) {
                this.lineBegin = getMidpoint(box.rect);
                this.outBox = box;
                this.drawingLine = true;
            }

            if (
                this.state.isMouseup() 
                && this.state.isMouseupInside(box.rect)
                && this.drawingLine
            ) {
                // todo: prevent duplicate connections
                if (this.outBox !== box) {
                    this.outBox.out.push(box);
                }
                this.drawingLine = false;
            }
        }


        if (
            this.state.cur.mouse.clicked 
            && this.state.cur.keyboard.control
            && this.drawingLine
        ) {
            this.gfx.drawLine(this.lineBegin, { ...curMouse.coord }, -1);
        }

        if (this.state.cur.keyboard.right) {
            console.log(this.boxes);
        }
    }
}

export { Ui };
