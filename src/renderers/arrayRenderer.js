import { textConstants } from "../text_constants";
import { getWidthOfText } from "../util"

class ArrayRenderer {
    constructor(gfx, state, model) {
        this.gfx = gfx;
        this.state = state;
        this.model = model;

        this.refRect = { x: 0, y: 0, w: 26, h: 26 };
        this.topLabelYPadding = 4;
        this.pointRadius = 3;
        this.pointYPadding = 4;
        this.indexLabelTopYPadding = 4;
        this.indexLabelBottomYPadding = 2;
        this.indexLabelLineLength = 9;
    }

    render() {
        const arrWrapper = {
            data: [1, 22, 3, 4, "AA"],
            labels: [
                { str: "i", index: 1 },
                { str: "j", index: 3 },
                { str: "q", index: 4 },
            ],
        };

        const coord = { x: 170, y: 70 };

        this.drawArray(arrWrapper, coord);
    }

    drawArray(arrWrapper, coord) {
        const arr = arrWrapper.data;

        if (arr.length === 0) {
            return;
        }

        let curRect = {
            ...this.refRect,
            x: coord.x,
            y: coord.y + this.topLabelYPadding + textConstants.charHeight
        };

        for (let i = 0; i < arr.length; i++) {
            this.drawBox(String(arr[i]), curRect);
            this.drawTopLabel(String(i), curRect);
            this.drawPoint(String(i), { x: curRect.x, y: curRect.y + curRect.h });
            curRect.x += curRect.w;
        }

        // draw final point
        this.drawPoint(String(arr.length), { x: curRect.x, y: curRect.y + curRect.h });

        // draw labels
        // for (const label of arrWrapper.labels) {
        //     this.drawIndexLabel(label.str, label.index);
        // }

        this.drawOutline(arrWrapper, coord);
    }

    drawOutline(arrWrapper, coord) {
        const arr = arrWrapper.data;
        const xPadding = 8;

        const rect = {
            x: coord.x - xPadding,
            y: coord.y,
            w: 200,
            h: 200
        };

        this.gfx.strokeRect(rect, 1);
    }

    drawBox(str, rect) {
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
    }

    drawTopLabel(str, rect) {
        const textWidth = getWidthOfText(str, textConstants.charWidth, 0);

        const rectXMidpoint = rect.x + (rect.w / 2);
        const textX = rectXMidpoint - Math.floor(textWidth / 2);

        this.gfx.drawText(
            str,
            textConstants.charHeight,
            { x: textX, y: rect.y - this.topLabelYPadding },
            1
        );
    }

    drawPoint(str, coord) {
        this.gfx.drawFilledCircle(coord, this.pointRadius, 2);

        const textWidth = getWidthOfText(str, textConstants.charWidth, 0);
        const textX = Math.floor(coord.x - (textWidth / 2));

        this.gfx.drawText(
            str,
            textConstants.charHeight,
            { x: textX, y: coord.y + textConstants.charHeight + this.pointYPadding },
            1
        );
    }

    drawIndexLabel(str, index) {
        let rect = { ...this.refRect };
        rect.x += rect.w * index;

        // draw arrow /////////////////////////////////

        const lineLength = this.indexLabelLineLength;
        const rectXMidpoint = rect.x + (rect.w / 2);

        const start = {
            x: rectXMidpoint,
            y: this.startY - textConstants.charHeight - this.indexLabelBottomYPadding - lineLength
        };

        const end = {
            x: rectXMidpoint,
            y: this.startY - textConstants.charHeight - this.indexLabelBottomYPadding
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

        const textWidth = getWidthOfText(str, textConstants.charWidth, 0);
        const textX = Math.floor(rectXMidpoint - (textWidth / 2));
        const textY = start.y - this.indexLabelTopYPadding;

        this.gfx.drawText(
            str,
            textConstants.charHeight,
            { x: textX, y: textY },
            1
        );
    }
}

export { ArrayRenderer };
