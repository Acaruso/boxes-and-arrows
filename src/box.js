import { getTextRect } from "./util";

class Box {
    constructor(str, coord, id=0) {
        this.coord = { ...coord };
        this.id = id;
        this.text = str.split('\n');
        this.rect = {};
        this.parentId = null;

        this.updateRect();
    }

    appendString(str) {
        const arr = str.split('\n');

        if (str === "\n") {
            this.text.push("");
        } else if (arr.length > 1) {
            for (const elt of arr) {
                if (elt !== "") {
                    this.text.push(elt);
                }
            }
        } else {
            this.text[this.text.length - 1] += str;
        }

        this.updateRect();
    }

    deleteChar() {
        if (this.text[this.text.length - 1].length > 0) {
            this.text[this.text.length - 1] = this.text[this.text.length - 1].slice(0, -1);
        } else if (this.text.length > 1) {      // don't allow to delete last string from arr
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
    }
}

export { Box };
