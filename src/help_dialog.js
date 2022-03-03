import { textConstants } from "./text_constants";
import { getWidthOfText } from "./util"

class HelpDialog {
    constructor() {
        this.visible = true;

        this.text = [
            "Welcome to Boxes and Lines",
            "",
            "Controls:",
            "Create a box: double click",
            "Create a connection: Ctrl-click within a box,",
            "    then drag to another box",
            "Duplicate a box: Alt-click within a box",
            "Delete selected boxes: Delete",
            "Select all boxes: Ctrl-A",
            "Tree format: select root node, then do Ctrl-Q",
            "Horizontally align selected boxes: Ctrl-H",
            "Vertically align selected boxes: Ctrl-V",
            "Save file: Ctrl-S",
            "Load file: Ctrl-L",
            "Load script: Ctrl-Shift-L",
        ];

        let maxWidth = -1;

        for (const s of this.text) {
            const curWidth = getWidthOfText(
                s,
                textConstants.charWidth,
                textConstants.xPadding
            );

            maxWidth = Math.max(maxWidth, curWidth);
        }

        this.rect = {
            x: 200,
            y: 200,
            w: maxWidth,
            color: "#A3BFFF",
        };

        this.rect.h = (textConstants.charHeight * this.text.length) + textConstants.yPadding;

        const cbW = textConstants.charHeight;

        this.closeButtonRect = {
            x: (this.rect.x + this.rect.w) - (cbW + textConstants.yPadding),
            y: this.rect.y + textConstants.yPadding,
            w: cbW,
            h: textConstants.charHeight,
        };
    }
}

export { HelpDialog };
