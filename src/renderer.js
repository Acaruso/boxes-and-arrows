import { getMidpoint } from "./util"

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
        this.drawBoxes(boxes);
        this.drawSelectedBox(boxes, selectedBoxId);
        this.drawLine(lineBegin, drawingLine);
        this.drawConnections(boxes);
    }

    drawBoxes(boxes) {
        boxes.forEach(box => this.drawBox(box));
    }

    drawBox(box) {
        this.drawBoxRect(box);
        this.drawBoxText(box);
    }

    drawBoxRect(box) {
        // note that we're actually updating box rect here to acct for changed text
        // prob want to move this logic out of renderer

        // const length = box.text.length > 0 ? box.text.length : 1;

        // box.rect = {
        //     x: box.coord.x,
        //     y: box.coord.y,
        //     w: Math.floor(length * box.charWidth) + (box.xPadding * 2),
        //     h: box.charHeight + box.yPadding
        // };

        // box.updateRect();

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
}

export { Renderer };
