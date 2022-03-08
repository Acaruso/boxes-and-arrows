import { textConstants } from "./text_constants";
import { getTextRect } from "./util";

class Box {
    constructor(text, coord, id=0) {
        this.coord = { ...coord };
        this.id = id;
        this.text = [text];
        this.rect = {};
        this.parentId = null;

        this.updateRect();
    }

    appendString(s) {
        if (s === "\n") {
            this.text.push("");
        } else {
            this.text[this.text.length - 1] += s;
        }

        this.updateRect();
    }

    deleteChar() {
        if (this.text.length > 0) {
            this.text = this.text.slice(0, -1);
        }
        this.updateRect();
    }

    setCoord(newCoord) {
        this.coord = {
            x: Math.floor(newCoord.x),
            y: Math.floor(newCoord.y)
        };
        this.updateRect();
    }

    setX(x) {
        this.coord.x = Math.floor(x);
        this.updateRect();
    }

    setY(y) {
        this.coord.y = Math.floor(y);
        this.updateRect();
    }

    updateRect() {
        this.rect = getTextRect(this.text, this.coord);

        // const length = this.text.length > 0 ? this.text.length : 1;

        // this.rect = {
        //     x: this.coord.x,
        //     y: this.coord.y,
        //     w: Math.floor(length * textConstants.charWidth) + (textConstants.xPadding * 2),
        //     h: textConstants.charHeight + textConstants.yPadding
        // };
    }
}

export { Box };
