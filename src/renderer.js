import { textConstants } from "./text_constants";
import { getMidpoint, getWidthOfText } from "./util"

class Renderer {
    constructor(gfx, state, model) {
        this.gfx = gfx;
        this.state = state;
        this.model = model;
        this.firstDraw = true;
    }

    render() {
        this.drawBoxes();
        this.drawSelectedBoxes();
        this.drawLine();
        this.drawConnections();
        this.drawSelectedRegion();
        this.drawHelpDialog();
        this.drawArrays();
    }

    drawBoxes() {
        this.model.boxes.forEach(box => this.drawBox(box));
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
        this.drawMultiLineText(box.text, box.coord, 2);
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

    drawLine() {
        if (
            this.state.cur.mouse.clicked
            && this.state.cur.keyboard.control
            && this.model.drawingLine
        ) {
            const curMouse = this.state.cur.mouse;
            this.gfx.drawLine(this.model.lineBegin, { ...curMouse.coord }, -1);
        }
    }

    drawConnections() {
        this.model.boxes.getAllConnections()
            .map(([box1, box2]) => [getMidpoint(box1.rect), getMidpoint(box2.rect)])
            .forEach(([begin, end]) => this.gfx.drawLine(begin, end, -1));
    }

    drawSelectedRegion() {
        if (this.model.draggingSelectedRegion) {
            this.gfx.drawRect(this.model.selectedRegion, 10);
        }
    }

    drawHelpDialog() {
        const helpDialog = this.model.helpDialog;

        if (helpDialog.visible == false) {
            return;
        }

        this.gfx.drawRect(helpDialog.rect, 11);

        this.drawMultiLineText(
            helpDialog.text,
            { x: helpDialog.rect.x, y: helpDialog.rect.y },
            12
        );

        this.drawCloseButton();
    }

    drawCloseButton() {
        const cbRect = this.model.helpDialog.closeButtonRect;

        this.gfx.strokeRect(cbRect, 20);

        this.gfx.drawLine(
            { x: cbRect.x, y: cbRect.y },
            { x: cbRect.x + cbRect.w, y: cbRect.y + cbRect.h },
            20
        );

        this.gfx.drawLine(
            { x: cbRect.x + cbRect.w, y: cbRect.y },
            { x: cbRect.x, y: cbRect.y + cbRect.h },
            20
        );
    }

    drawMultiLineText(text, coord, z=0) {
        for (let i = 0; i < text.length; i++) {
            this.gfx.drawText(
                text[i],
                textConstants.charHeight,
                {
                    x: coord.x + textConstants.xPadding,
                    y: coord.y + (textConstants.charHeight * (i + 1))
                },
                z
            );
        }
    }

    drawArrays() {
        const text = (str, rect) => {
            const yPadding = 4;

            const textWidth = getWidthOfText(
                str,
                textConstants.charWidth,
                0
            );

            const rectMidpoint = Math.floor((rect.x + (rect.w / 2)));
            const textLeftX = rectMidpoint - Math.floor(textWidth / 2);

            if (this.firstDraw === true) {
                console.log(`rect: ${JSON.stringify(rect)}`);
                console.log(`textWidth: ${textWidth}`);
                console.log(`rectMidpoint: ${rectMidpoint}`);
                console.log(`textLeftX: ${textLeftX}`);
            }
            this.gfx.drawText(
                str,
                textConstants.charHeight,
                { x: textLeftX, y: rect.y - yPadding },
                // { x: rect.x + 10, y: rect.y - yPadding },
                1
            );
        };

        const length = 200;

        let rect = {
            x: 30,
            y: 30,
            w: 30,
            h: 30,
        };

        const xIncrement = rect.w;

        for (let i = 0; i < length; i++) {
            this.gfx.strokeRectHeavy(rect);
            text(String(i), rect);
            rect.x += xIncrement;
        }
        this.firstDraw = false;
    }
}

export { Renderer };
