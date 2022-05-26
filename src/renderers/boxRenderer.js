import { getMidpoint } from "../util"
import { stringType, arrayType } from "../constants/constants";
import { textConstants } from "../constants/text_constants";
import { arrayDataConstants } from "../constants/array_data_constants";
import { ArrayRenderer } from "./arrayRenderer";

class BoxRenderer {
    constructor(gfx, state, model, rendererHelper) {
        this.gfx = gfx;
        this.state = state;
        this.model = model;
        this.rendererHelper = rendererHelper;

        this.arrayRenderer = new ArrayRenderer(gfx, state, model);
    }

    render() {
        this.drawBoxes();
        this.drawSelectedBoxes();
        this.drawConnections();
    }

    drawBoxes() {
        this.model.boxes.forEach(box => this.drawBox(box));
    }

    drawBox(box, color="#FFFFFF") {
        this.gfx.beginGroup();
        this.drawBoxRect(box, color);
        this.gfx.beginClipRect(box.rect, -1000);
        this.drawBoxData(box);
        this.gfx.endClip(1000);
        this.gfx.endGroup();
    }

    drawBoxRect(box, color) {
        const bgRect = {
            ...box.rect,
            color
        };

        this.gfx.drawRect(bgRect, 0);
        this.gfx.strokeRect(box.rect, 1);
    }

    drawBoxData(box) {
        let data = box.data;
        let coord = box.coord;
        let z = 2;

        let curY = box.scrollable
            ? coord.y - box.scrollPos
            : coord.y;

        for (let i = 0; i < data.length; i++) {
            const elt = data[i];
            if (elt.type === stringType) {
                const curCoord = {
                    x: coord.x + textConstants.xPadding,
                    y: curY
                };
                this.gfx.drawText(
                    elt.data,
                    textConstants.charHeight,
                    curCoord,
                    z
                );
                curY += textConstants.charHeight;
            } else if (elt.type === arrayType) {
                curY += arrayDataConstants.topMargin;
                const curCoord = {
                    x: coord.x + textConstants.xPadding,
                    y: curY
                };
                this.arrayRenderer.drawArray(elt, curCoord);
                const arrRect = elt.getRect();
                curY += arrRect.h;
            }
        }
    }

    drawSelectedBoxes() {
        const boxes = this.model.boxes;

        for (const selectedBoxId of this.model.selectedBoxIds) {
            const selectedBox = boxes.getBox(selectedBoxId);
            const rect = { ...selectedBox.rect };
            rect.x -= 2;
            rect.y -= 2;
            rect.w += 4;
            rect.h += 4;
            this.gfx.strokeRect(rect);
        }
    }

    drawConnections() {
        this.model.boxes.getAllConnections()
            .map(([box1, box2]) => [getMidpoint(box1.rect), getMidpoint(box2.rect)])
            .forEach(([begin, end]) => this.gfx.drawLine(begin, end, -1));
    }
}

export { BoxRenderer };
