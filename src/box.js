import { ArrayData } from "./array_data";
import { arrayDataConstants } from "./constants/array_data_constants";
import { getTextRect, getWidthOfText, lastElt } from "./util";
import { StringData } from "./string_data";
import { stringType, arrayType } from "./constants/constants";
import { textConstants } from "./constants/text_constants";

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

        // const arrData = new ArrayData(
        //     [1, 22, 3, 4, "AA", 12, 9],
        //     [
        //         { str: "i", index: 5 },
        //         { str: "j", index: 3 },
        //         { str: "q", index: 4 },
        //     ]
        // );

        // this.data.push(arrData);

        this.updateRect();
    }

    appendString(str) {
        for (let i = 0; i < str.length; i++) {
            let c = str[i];

            if (c === "\n") {
                this.pushStringData("");
            } else {
                let lastStringData = lastElt(this.data);
                lastStringData.data += c;
            }
        }

        this.updateRect();
    }

    appendArray(arr, labels={}) {
        this.pushArrData(arr, labels);
    }

    pushStringData(str) {
        this.data.push(new StringData(str));
    }

    pushArrData(arr, labels) {
        this.data.push(new ArrayData(arr, labels));
    }

    appendChar(c) {
        if (c === "\n") {
            this.pushStringData("");
        } else {
            let lastStringData = this.getLastStringData();
            lastStringData.data += c;
        }

        this.updateRect();
    }

    deleteChar() {
        const last = lastElt(this.data);
        if (last.type === stringType) {
            // delete char from string
            if (last.data.length > 0) {
                last.data = last.data.slice(0, -1);
            // delete entire string
            // dont allow deleting the last string
            } else if (this.data.length > 1) {
                this.data = this.data.slice(0, -1);
            }
        } else if (last.type === arrayType) {
            this.data = this.data.slice(0, -1);
        }

        this.updateRect();
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
        this.rect = this.getRect();
    }

    getRect() {
        let data = this.data;
        let coord = this.coord;

        let maxWidth = -1;
        let height = 0;

        for (const elt of data) {
            if (elt.type === stringType) {
                const str = elt.data;
                const curWidth = getWidthOfText(
                    str,
                    textConstants.charWidth,
                    textConstants.xPadding
                );

                maxWidth = Math.max(maxWidth, curWidth);
                height += textConstants.charHeight;
            } else if (elt.type === arrayType) {
                height += arrayDataConstants.topMargin;
                const arrRect = elt.getRect();
                const curWidth = arrRect.w + (textConstants.xPadding * 2);
                maxWidth = Math.max(maxWidth, curWidth);
                height += arrRect.h;
            }
        }

        height += textConstants.yPadding;

        let rect = {
            x: coord.x,
            y: coord.y,
            w: maxWidth,
            h: height
        };

        return rect;
    }
}

export { Box };
