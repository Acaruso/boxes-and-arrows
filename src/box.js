import { getTextRect } from "./util";

class Box {
    constructor(str, coord, id=0) {
        this.coord = { ...coord };
        this.id = id;
        this.data = str.split('\n');
        this.rect = {};
        this.parentId = null;

        this.updateRect();
    }

    appendString(str) {
        for (let i = 0; i < str.length; i++) {
            let c = str[i];

            if (c === "\n") {
                this.data.push("");
            } else {
                this.data[this.data.length - 1] += c;
            }
        }
        
        this.updateRect();

        // const arr = str.split('\n');

        // if (str === "\n") {
        //     this.data.push("");
        // } else if (arr.length > 1) {
        //     for (const elt of arr) {
        //         if (elt !== "") {
        //             this.data.push(elt);
        //         }
        //     }
        // } else {
        //     this.data[this.data.length - 1] += str;
        // }

        // this.updateRect();
    }

    // appendString(str) {
    //     const arr = str.split('\n');

    //     if (str === "\n") {
    //         this.data.push("");
    //     } else if (arr.length > 1) {
    //         for (const elt of arr) {
    //             if (elt !== "") {
    //                 this.data.push(elt);
    //             }
    //         }
    //     } else {
    //         this.data[this.data.length - 1] += str;
    //     }

    //     this.updateRect();
    // }

    appendChar(c) {
        if (c === "\n") {
            this.data.push("");
        } else {
            this.data[this.data.length - 1] += c;
        }

        this.updateRect();
    }

    deleteChar() {
        if (this.data[this.data.length - 1].length > 0) {
            this.data[this.data.length - 1] = this.data[this.data.length - 1].slice(0, -1);
        } else if (this.data.length > 1) { // don't allow to delete last string from arr
            this.data = this.data.slice(0, -1);
        }

        this.updateRect();
    }

    setData(data) {
        this.data = [...data];
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
        this.rect = getTextRect(this.data, this.coord);
    }
}

export { Box };
