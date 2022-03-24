import { getTextRect, getWidthOfText, lastElt } from "./util";
import { stringType, arrayType } from "./constants";
import { textConstants } from "./text_constants";

function makeStringData(str) {
    return {
        type: stringType,
        data: str
    };
}

function makeArrayData(arr, labels) {
    return {
        type: arrayType,
        data: arr,
        labels,
    };
}

class StringData {
    constructor(str) {
        this.type = stringType;
        this.data = str;
    }

    clone() {
        return {
            type: stringType,
            data: this.data
        };
    }
}

class ArrayData {
    constructor(arr, labels) {
        this.type = arrayType;
        this.data = arr;
        this.labels = labels;
    }

    clone() {
        let clone = {
            type: arrayType,
            data: [...this.data],
            labels: []
        };

        for (const label of this.labels) {
            clone.labels.push({ ...label });
        }

        return clone;
    }
}

class Box {
    constructor(str, coord, id=0) {
        this.coord = { ...coord };
        this.id = id;

        this.data = [
            new StringData(""),
        ];

        this.appendString(str);
        this.rect = {};
        this.parentId = null;

        const arrData = new ArrayData(
            [1, 22, 3, 4, "AA", 12, 9],
            [
                { str: "i", index: 5 },
                { str: "j", index: 3 },
                { str: "q", index: 4 },
            ]
        );

        this.data.push(arrData);

        this.updateRect();
    }

    pushStringData(str) {
        this.data.push(makeStringData(str));
    }

    getLastStringData() {
        if (this.data.length === 0) {
            return null;
        }

        for (let i = this.data.length - 1; i >= 0; i--) {
            const elt = this.data[i];
            if (elt.type === stringType) {
                return elt;
            }
        }

        return null;
    }

    appendString(str) {
        for (let i = 0; i < str.length; i++) {
            let c = str[i];

            if (c === "\n") {
                this.pushStringData("");
            } else {
                let lastStringData = lastElt(this.data);
                lastStringData.data += c;

                // let lastStringData = this.getLastStringData();
                // lastStringData.data += c;

                // this.data[this.data.length - 1].data += c;
            }
        }

        this.updateRect();
    }

    appendChar(c) {
        if (c === "\n") {
            this.pushStringData("");
        } else {
            let lastStringData = this.getLastStringData();
            lastStringData.data += c;
            // this.data[this.data.length - 1].data += c;
        }

        this.updateRect();
    }

    // TODO: update this
    deleteChar() {

        this.updateRect();
    }

    // deleteChar() {
    //     if (this.data[this.data.length - 1].length > 0) {
    //         this.data[this.data.length - 1] = this.data[this.data.length - 1].slice(0, -1);
    //     } else if (this.data.length > 1) { // don't allow to delete last string from arr
    //         this.data = this.data.slice(0, -1);
    //     }

    //     this.updateRect();
    // }

    setData(data) {
        this.data = [];
        for (const elt of data) {
            this.data.push(elt.clone());
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
        this.rect = this.getTextRect(this.data, this.coord);
    }

    getTextRect(data, coord) {
        let maxWidth = -1;
        let length = 0;

        for (const elt of data) {
            if (elt.type === stringType) {
                const str = elt.data;
                const curWidth = getWidthOfText(
                    str,
                    textConstants.charWidth,
                    textConstants.xPadding
                );

                maxWidth = Math.max(maxWidth, curWidth);
                length++;
            }
        }

        let rect = {
            x: coord.x,
            y: coord.y,
            w: maxWidth,
        };

        rect.h = (textConstants.charHeight * length) + textConstants.yPadding;

        return rect;
    }

}

export { Box };
