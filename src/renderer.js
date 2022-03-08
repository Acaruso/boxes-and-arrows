import { textConstants } from "./text_constants";
import { getMidpoint } from "./util"

class Renderer {
    constructor(gfx, state, model) {
        this.gfx = gfx;
        this.state = state;
        this.model = model;
    }

    render() {
        this.drawBoxes();
        this.drawSelectedBoxes();
        this.drawLine();
        this.drawConnections();
        this.drawSelectedRegion();
        this.drawHelpDialog();
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
        for (let i = 0; i < box.text.length; i++) {
            this.gfx.drawText(
                box.text[i],
                textConstants.charHeight,
                {
                    x: box.rect.x + textConstants.xPadding,
                    y: box.rect.y + (textConstants.charHeight * (i + 1))
                },
                2
            );
        }

        // this.gfx.drawText(
        //     box.text,
        //     textConstants.charHeight,
        //     { x: box.coord.x + textConstants.xPadding, y: box.coord.y + textConstants.charHeight },
        //     2
        // );
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

        for (let i = 0; i < helpDialog.text.length; i++) {
            this.gfx.drawText(
                helpDialog.text[i],
                textConstants.charHeight,
                {
                    x: helpDialog.rect.x + textConstants.xPadding,
                    y: helpDialog.rect.y + (textConstants.charHeight * (i + 1))
                },
                12
            );
        }

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

}

export { Renderer };
