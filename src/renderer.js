import { getMidpoint } from "./util"

class Renderer {
    constructor(gfx, state, model) {
        this.gfx = gfx;
        this.state = state;
        this.model = model;
    }

    render() {
        this.drawBoxes(this.model.boxes);
        this.drawSelectedBox(this.model.boxes, this.model.selectedBoxId);
        this.drawLine(this.model.lineBegin, this.model.drawingLine);
        this.drawConnections(this.model.boxes);
        this.drawSelectedRegion();
    }

    drawBoxes(boxes) {
        boxes.forEach(box => this.drawBox(box));
    }

    drawBox(box) {
        this.drawBoxRect(box);
        this.drawBoxText(box);
    }

    drawBoxRect(box) {
        const bgRect = {
            ...box.rect,
            color: "#FFFFFF"
        };

        this.gfx.drawRect(bgRect, 0);
        this.gfx.strokeRect(box.rect, 1);
    }

    drawBoxText(box) {
        this.gfx.drawText(
            box.text,
            box.charHeight,
            { x: box.coord.x + box.xPadding, y: box.coord.y + box.charHeight },
            2
        );
    }

    drawSelectedBox(boxes, selectedBoxId) {
        if (selectedBoxId !== -1) {
            const selectedBox = boxes.getBox(selectedBoxId);
            const rect = { ...selectedBox.rect };
            rect.x -= 2;
            rect.y -= 2;
            rect.w += 4;
            rect.h += 4;
            this.gfx.strokeRect(rect);
        }
    }

    drawLine(lineBegin, drawingLine) {
        if (
            this.state.cur.mouse.clicked
            && this.state.cur.keyboard.control
            && drawingLine
        ) {
            const curMouse = this.state.cur.mouse;
            this.gfx.drawLine(lineBegin, { ...curMouse.coord }, -1);
        }
    }

    drawConnections(boxes) {
        boxes.getConnections()
            .map(([box1, box2]) => [getMidpoint(box1.rect), getMidpoint(box2.rect)])
            .forEach(([begin, end]) => this.gfx.drawLine(begin, end, -1));
    }

    drawSelectedRegion() {
        if (this.model.dragging && this.model.selectedBoxId === -1) {
            this.gfx.drawRect(this.model.selectedRegion, 10);
        }
    }
}

export { Renderer };
