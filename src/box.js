import { getMidpoint } from "./util"

class Box {
    constructor(gfx, state, text, coord) {
        this.gfx = gfx;
        this.state = state;

        this.coord = coord;
        this.charHeight = 14;
        this.charWidth = this.charHeight * 0.55;
        this.xPadding = 4;
        this.yPadding = 6;
        this.text = text;
        this.rect = {};
        this.dragging = false;
        this.out = [];
    }

    run() {
        this.handleUserInput();
        this.drawConnections();
        this.drawRect();
        this.drawText();
    }

    handleUserInput() {
        if (
            this.state.isMousedownInside(this.rect)
            && !this.state.cur.keyboard.control
        ) {
            this.dragging = true;
        }

        if (this.state.isMouseup()) {
            this.dragging = false;
        }

        if (this.dragging) {
            const cur = this.state.cur.mouse.coord;
            const prev = this.state.prev.mouse.coord;
            this.coord.x += cur.x - prev.x;
            this.coord.y += cur.y - prev.y;
        }
    }

    drawConnections() {
        for (const elt of this.out) {
            const begin = getMidpoint(this.rect);
            const end = getMidpoint(elt.rect);
            this.gfx.drawLine(begin, end, -1);
        }
    }

    drawRect() {
        this.rect = {
            x: this.coord.x,
            y: this.coord.y,
            w: Math.floor(this.text.length * this.charWidth) + (this.xPadding * 2),
            h: this.charHeight + this.yPadding
        };

        let bgRect = { ...this.rect };
        bgRect.color = "#FFFFFF";
        this.gfx.drawRect(bgRect);
        this.gfx.strokeRect(this.rect);
    }

    drawText() {
        this.gfx.drawText(
            this.text,
            this.charHeight,
            { x: this.coord.x + this.xPadding, y: this.coord.y + this.charHeight },
            10
        );
    }
}

export { Box };
