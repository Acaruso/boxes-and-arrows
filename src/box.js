import { ArrayData } from "./array_data";
import { arrayDataConstants } from "./constants/array_data_constants";
import { getWidthOfText, lastElt } from "./util";
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

        this.detailsData = [];

        this.appendString(str);
        this.rect = {};
        this.parentId = null;

        this.scrollable = false;
        this.scrollPos = 0;
        this.scrollInc = 50;

        this.updateRect();
    }

    appendString(str) {
        for (let i = 0; i < str.length; i++) {
            let c = str[i];

            if (c === "\n") {
                this.data.push(new StringData(""));
            } else {
                let lastStringData = this.getLastStringData();
                lastStringData.data += c;
            }
        }

        this.updateRect();
    }

    appendArray(arr, labels=[], colors=[]) {
        this.data.push(new ArrayData(arr, labels, colors));
        this.updateRect();
    }

    appendStringDetails(str) {
        for (let i = 0; i < str.length; i++) {
            let c = str[i];

            if (c === "\n") {
                this.detailsData.push(new StringData(""));
            } else {
                let lastStringData = lastElt(this.detailsData);
                lastStringData.data += c;
            }
        }
    }

    appendArrayDetails(arr, labels=[], colors=[]) {
        this.detailsData.push(new ArrayData(arr, labels, colors));
    }

    appendChar(c) {
        if (c === "\n") {
            this.data.push(new StringData(""));
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

    setDetailsData(detailsData) {
        this.detailsData = [];
        for (const elt of detailsData) {
            this.detailsData.push(elt.clone());
        }
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

    scrollDown() {
        if (this.scrollable && this.scrollPos < 999) {
            const dataRect = this.getRect();

            const dataLow = dataRect.y + dataRect.h;
            const newDataLow = dataLow - (this.scrollPos + this.scrollInc);
            const padding = 4;
            // const rectLow = this.rect.y + this.rect.h + padding;
            const rectLow = this.rect.y + this.rect.h;

            if (newDataLow < rectLow) {
                while (newDataLow < rectLow) {
                    newDataLow++;
                }

                this.scrollPos = newDataLow;

                // console.log('yep');
                // const a = rectLow - newDataLow;
                // console.log(a);
                // // this.scrollPos -= a;
                // this.scrollPos = newDataLow - a;
            } else {
                this.scrollPos += this.scrollInc;
            }
            console.log(this.scrollPos);
        }
    }

    scrollUp() {
        if (this.scrollable && this.scrollPos > 0) {
            this.scrollPos = clamp(this.scrollPos - this.scrollInc, 0, 999);
        }
    }
}

function clamp(value, low, high) {
    if (value < low) {
        return low;
    } else if (value > high) {
        return high;
    } else {
        return value;
    }
}

export { Box };
