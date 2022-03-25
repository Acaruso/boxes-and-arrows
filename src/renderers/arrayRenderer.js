import { textConstants } from "../constants/text_constants";
import { getWidthOfText } from "../util"

class ArrayRenderer {
    constructor(gfx, state, model) {
        this.gfx = gfx;
        this.state = state;
        this.model = model;

        this.refRect = { x: 0, y: 0, w: 26, h: 26 };
        this.topLabelYPadding = 4;
        this.pointRadius = 3;
        this.bottomLabelYPadding = 4;
        this.indexLabelTopYPadding = 4;
        this.indexLabelBottomYPadding = 2;
        this.indexLabelArrowLength = 9;
        this.bottomMargin = 4;
        this.sideMargin = 8;
    }

    drawArray(arrWrapper, coord) {
        const innerCoord = { x: coord.x + this.sideMargin, y: coord.y };
        const arr = arrWrapper.data;

        if (arr.length === 0) {
            return;
        }

        let totalHeight = 0;
        let curRectY = 0;

        if (arrWrapper.labels.length > 0) {
            totalHeight = this.getTotalHeightWithIndexLabels();
            curRectY = (
                innerCoord.y
                + textConstants.charHeight
                + this.indexLabelTopYPadding
                + this.indexLabelArrowLength
                + this.indexLabelBottomYPadding
                + textConstants.charHeight
                + this.topLabelYPadding
            );
        } else {
            totalHeight = this.getTotalHeightWithoutIndexLabels();
            curRectY = (
                innerCoord.y
                + textConstants.charHeight
                + this.topLabelYPadding
            );
        }

        let curRect = {
            ...this.refRect,
            x: innerCoord.x,
            y: curRectY
        };

        for (let i = 0; i < arr.length; i++) {
            this.drawBox(String(arr[i]), curRect);
            this.drawTopLabel(String(i), curRect);
            this.drawPoint(String(i), { x: curRect.x, y: curRect.y + curRect.h });
            curRect.x += curRect.w;
        }

        // draw final point
        this.drawPoint(String(arr.length), { x: curRect.x, y: curRect.y + curRect.h });

        // draw index labels
        for (const label of arrWrapper.labels) {
            this.drawIndexLabel(label, innerCoord);
        }

        this.drawOutline(arrWrapper, coord, totalHeight);
    }

    drawBox(str, rect) {
        this.gfx.strokeRectHeavy(rect, 2);

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
            2
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
            2
        );
    }

    drawPoint(str, coord) {
        this.gfx.drawFilledCircle(coord, this.pointRadius, 2);

        const textWidth = getWidthOfText(str, textConstants.charWidth, 0);
        const textX = Math.floor(coord.x - (textWidth / 2));

        this.gfx.drawText(
            str,
            textConstants.charHeight,
            { x: textX, y: coord.y + textConstants.charHeight + this.bottomLabelYPadding },
            2
        );
    }

    drawIndexLabel(label, coord) {
        const rectY = (
            coord.y
            + textConstants.charHeight
            + this.indexLabelTopYPadding
            + this.indexLabelArrowLength
            + this.indexLabelBottomYPadding
            + textConstants.charHeight
            + this.topLabelYPadding
        );

        let rect = {
            ...this.refRect,
            x: coord.x,
            y: rectY
        };

        rect.x += rect.w * label.index;

        // draw arrow /////////////////////////////////

        const rectXMidpoint = rect.x + (rect.w / 2);

        const start = {
            x: rectXMidpoint,
            y: coord.y + textConstants.charHeight + this.indexLabelTopYPadding
        };

        const end = {
            x: rectXMidpoint,
            y: start.y + this.indexLabelArrowLength
        };

        this.gfx.drawLine(start, end, 2);

        const left = {
            x: end.x - 4,
            y: end.y - 4,
        };

        this.gfx.drawLine(left, end, 2);

        const right = {
            x: end.x + 4,
            y: end.y - 4,
        };

        this.gfx.drawLine(right, end, 2);

        // draw label /////////////////////////////////

        const textWidth = getWidthOfText(label.str, textConstants.charWidth, 0);
        const textX = Math.floor(rectXMidpoint - (textWidth / 2));
        const textY = coord.y + textConstants.charHeight;

        this.gfx.drawText(
            label.str,
            textConstants.charHeight,
            { x: textX, y: textY },
            2
        );
    }

    drawOutline(arrWrapper, coord, totalHeight) {
        const arr = arrWrapper.data;

        const rect = {
            x: coord.x,
            y: coord.y,
            w: (arr.length * this.refRect.w) + (this.sideMargin * 2),
            h: totalHeight
        };

        this.gfx.strokeRect(rect, 2);
    }

    getTotalHeightWithIndexLabels() {
        return (
            textConstants.charHeight
            + this.indexLabelTopYPadding
            + this.indexLabelArrowLength
            + this.indexLabelBottomYPadding
            + textConstants.charHeight
            + this.topLabelYPadding
            + this.refRect.h
            + this.bottomLabelYPadding
            + textConstants.charHeight
            + this.bottomMargin
        );
    }

    getTotalHeightWithoutIndexLabels() {
        return (
            textConstants.charHeight
            + this.topLabelYPadding
            + this.refRect.h
            + this.bottomLabelYPadding
            + textConstants.charHeight
            + this.bottomMargin
        );
    }
}

export { ArrayRenderer };
