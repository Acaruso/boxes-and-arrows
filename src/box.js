class Box {
    constructor(gfx, state, text, coord, id=0) {
        this.gfx = gfx;
        this.state = state;

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

        this.addEventListeners();
    }

    addEventListeners() {
        const mousedownListener = (e) => {
            if (
                this.state.isMousedownInside(this.rect)
                && !this.state.cur.keyboard.control
            ) {
                this.dragging = true;
            }
        };

        const mouseupListener = (e) => {
            if (this.state.isMouseup()) {
                this.dragging = false;
            }
        };

        document.addEventListener("mousedown", mousedownListener, false);
        document.addEventListener("mouseup", mouseupListener, false);
    }

    run() {
        this.handleDragging();
        this.drawRect();
        this.drawText();
    }

    handleDragging() {
        if (this.dragging) {
            this.coord.x += this.state.getMouseXDelta();
            this.coord.y += this.state.getMouseYDelta();
        }
    }

    drawRect() {
        const length = this.text.length > 0 ? this.text.length : 1;

        this.rect = {
            x: this.coord.x,
            y: this.coord.y,
            w: Math.floor(length * this.charWidth) + (this.xPadding * 2),
            h: this.charHeight + this.yPadding
        };

        const bgRect = {
            ...this.rect,
            color: "#FFFFFF"
        };

        this.gfx.drawRect(bgRect, 0);
        this.gfx.strokeRect(this.rect, 1);
    }

    drawText() {
        this.gfx.drawText(
            this.text,
            this.charHeight,
            { x: this.coord.x + this.xPadding, y: this.coord.y + this.charHeight },
            2
        );
    }
}

export { Box };
