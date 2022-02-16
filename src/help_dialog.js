import { textConstants } from "./text_constants";
import { getWidthOfText } from "./util"

class HelpDialog {
    constructor() {
        this.text = [
            "Welcome to Boxes and Arrows",
            "",
            "Keyboard shortcuts:",
            "Create a box: Alt-click",
            "Create a connection: Ctrl-click within a box,",
            "    then drag to another box",
            "Duplicate a box: Alt-click within a box",
            "Delete selected boxes: Delete",
            "Horizontally align selected boxes: Ctrl-H",
            "Vertically align selected boxes: Ctrl-V",
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
            x: 5,
            y: 5,
            w: maxWidth,
            color: "#A3BFFF",
        };

        this.rect.h = this.rect.y + (textConstants.charHeight * this.text.length);
    }
}

export { HelpDialog };
