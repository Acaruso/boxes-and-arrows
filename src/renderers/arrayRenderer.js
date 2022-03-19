import { textConstants } from "../text_constants";
import { getWidthOfText } from "../util"

class ArrayRenderer {
    constructor(gfx, state, model) {
        this.gfx = gfx;
        this.state = state;
        this.model = model;
    }

    render() {
        this.drawArrays();
    }

    drawArrays() {
        const arrWrapper = {
            data: [1, 22, 3, 4, "AA"],
            labels: [
                { str: "i", index: 1 },
                { str: "j", index: 3 },
                { str: "q", index: 4 },
            ],
        };
        this.drawArray(arrWrapper);
    }

    drawArray(arrWrapper) {
        let arr = arrWrapper.data;

        if (arr.length === 0) {
            return;
        }

        const startX = 50;
        const startY = 50;

        let refRect = {
            x: startX,
            y: startY,
            w: 30,
            h: 30,
        };

        const drawBox = (str, rect) => {
            this.gfx.strokeRectHeavy(rect);

            const textWidth = getWidthOfText(str, textConstants.charWidth, 0);
            const textHeight = textConstants.charHeightNoPadding;

            const rectXMidpoint = rect.x + (rect.w / 2);
            const rectYMidpoint = rect.y + (rect.h / 2);

            const textX = rectXMidpoint - Math.floor(textWidth / 2);
            const textY = rectYMidpoint + Math.floor(textHeight / 2);

            this.gfx.drawText(
                str,
                textConstants.charHeight,
                { x: textX, y: textY },
                1
            );
        };

        const drawTopLabel = (str, rect) => {
            const yPadding = 4;
            const textWidth = getWidthOfText(str, textConstants.charWidth, 0);

            const rectXMidpoint = rect.x + (rect.w / 2);
            const textX = rectXMidpoint - Math.floor(textWidth / 2);

            this.gfx.drawText(
                str,
                textConstants.charHeight,
                { x: textX, y: rect.y - yPadding },
                1
            );
        };

        const drawPoint = (str, coord) => {
            this.gfx.drawFilledCircle(coord, 3, 2);

            const yPadding = 2;
            const textWidth = getWidthOfText(str, textConstants.charWidth, 0);
            const textX = Math.floor(coord.x - (textWidth / 2));

            this.gfx.drawText(
                str,
                textConstants.charHeight,
                { x: textX, y: coord.y + textConstants.charHeight + yPadding },
                1
            );
        };

        const drawIndexLabel = (str, index) => {
            let rect_ = { ...refRect };
            rect_.x += rect_.w * index;

            // draw arrow /////////////////////////////////

            const lineLength = 9;
            const yPadding = 2;
            const rectXMidpoint = rect_.x + (rect_.w / 2);

            const start = {
                x: rectXMidpoint,
                y: startY - textConstants.charHeight - yPadding - lineLength
            };

            const end = {
                x: rectXMidpoint,
                y: startY - textConstants.charHeight - yPadding
            };
            
            this.gfx.drawLine(start, end, 1);

            const left = {
                x: end.x - 4,
                y: end.y - 4,
            };

            this.gfx.drawLine(left, end, 1);

            const right = {
                x: end.x + 4,
                y: end.y - 4,
            };

            this.gfx.drawLine(right, end, 1);

            // draw label /////////////////////////////////

            const labelYPadding = 4;
            const textWidth = getWidthOfText(str, textConstants.charWidth, 0);
            const textX = Math.floor(rectXMidpoint - (textWidth / 2));
            const textY = start.y - labelYPadding;

            this.gfx.drawText(
                str,
                textConstants.charHeight,
                { x: textX, y: textY },
                1
            );
        };

        let rect = { ...refRect };

        for (let i = 0; i < arr.length; i++) {
            drawBox(String(arr[i]), rect);
            drawTopLabel(String(i), rect);
            drawPoint(String(i), { x: rect.x, y: rect.y + rect.h });
            rect.x += rect.w;
        }

        // draw final point
        drawPoint(String(arr.length), { x: rect.x, y: rect.y + rect.h });

        // draw labels
        for (const label of arrWrapper.labels) {
            drawIndexLabel(label.str, label.index);
        }
    }
}

export { ArrayRenderer };
