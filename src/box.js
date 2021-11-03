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
        this.dragging = false;
        this.out = [];
    }
}

export { Box };
