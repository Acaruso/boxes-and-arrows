import { getMidpoint, isPrintableKeycode } from "./util"

class Renderer {
    constructor(gfx, state) {
        this.gfx = gfx;
        this.state = state;
    }

    render(
        lineBegin,
        drawingLine,
        boxes,
        selectedBoxId,
    ) {
        this.drawLine(lineBegin, drawingLine);
        this.drawSelectedBox(boxes, selectedBoxId);
        this.drawConnections(boxes);
        this.drawBoxes(boxes);
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

    drawConnections(boxes) {
        boxes.connections.forEach((key) => {
            const [box1, box2] = boxes.getBoxes(key);
            const begin = getMidpoint(box1.rect);
            const end = getMidpoint(box2.rect);
            this.gfx.drawLine(begin, end, -1);
        });
    }

    drawBoxes(boxes) {
        boxes.forEach((box) => {
            this.drawBoxRect(box);
            this.drawBoxText(box);
        });
    }

    drawBoxRect(box) {
        const length = box.text.length > 0 ? box.text.length : 1;

        // note that we're actually updating box rect here to acct for changed text
        // prob want to move this logic out of renderer
        box.rect = {
            x: box.coord.x,
            y: box.coord.y,
            w: Math.floor(length * box.charWidth) + (box.xPadding * 2),
            h: box.charHeight + box.yPadding
        };

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
}

export { Renderer };
