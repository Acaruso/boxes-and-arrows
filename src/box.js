import { textConstants } from "./text_constants";

class Box {
    constructor(text, coord, id=0) {
        this.coord = { ...coord };
        this.id = id;
        this.text = text;
        this.rect = {};
        this.parentId = null;

        this.updateRect();
    }

    appendString(s) {
        this.text += s;
        this.updateRect();
    }

    deleteChar() {
        if (this.text.length > 0) {
            this.text = this.text.slice(0, -1);
        }
        this.updateRect();
    }

    setCoord(newCoord) {
        this.coord = { ...newCoord };
        this.updateRect();
    }

    setX(x) {
        this.coord.x = x;
        this.updateRect();
    }

    setY(y) {
        this.coord.y = y;
        this.updateRect();
    }

    updateRect() {
        const length = this.text.length > 0 ? this.text.length : 1;

        this.rect = {
            x: this.coord.x,
            y: this.coord.y,
            w: Math.floor(length * textConstants.charWidth) + (textConstants.xPadding * 2),
            h: textConstants.charHeight + textConstants.yPadding
        };
    }
}

export { Box };
