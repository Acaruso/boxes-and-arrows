class Box {
    constructor(text, coord, id=0) {
        this.coord = coord;
        this.id = id;
        this.charHeight = 14;
        this.charWidth = this.charHeight * 0.55;
        this.xPadding = 4;
        this.yPadding = 6;
        this.text = text;
        this.rect = {};

        this.updateRect();
    }

    appendChar(c) {
        this.text += c;
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

    updateRect() {
        const length = this.text.length > 0 ? this.text.length : 1;

        console.log(this.text);
        console.log(this.text.length);

        this.rect = {
            x: this.coord.x,
            y: this.coord.y,
            w: Math.floor(length * this.charWidth) + (this.xPadding * 2),
            h: this.charHeight + this.yPadding
        };
    }
}

export { Box };
