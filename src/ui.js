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

        this.boxes.addBox("test1", { x: 4, y: 4 });
        this.boxes.addBox("test2", { x: 90, y: 4 });
    }

    run() {
        this.connect();
        this.boxes.run();
    }

    connect() {
        const curMouse = this.state.cur.mouse;

        this.boxes.forEach((box) => {
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
        });

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
