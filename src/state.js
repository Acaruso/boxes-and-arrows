import { makeMessageTable, makeState } from "./state_util";

class State {
    constructor() {
        this.cur = makeState();
        this.prev = makeState();
        this.messageTable = makeMessageTable(this.cur);

        const eventHandler = (e) => {
            const s = e.key ? `${e.key}:${e.type}` : `${e.type}`;
            // console.log(s);
            if (this.messageTable[s]) {
                this.messageTable[s](e);
            }
        }

        document.addEventListener("mousedown", eventHandler, false);
        document.addEventListener("mouseup", eventHandler, false);
        document.addEventListener("mousemove", eventHandler, false);
        document.addEventListener("keydown", eventHandler, false);
        document.addEventListener("keyup", eventHandler, false);
    }

    isKeydown(key) {
        return this.cur.keyboard[key] && !this.prev.keyboard[key];
    }

    isMouseInside(rect) {
        const mouse = this.cur.mouse;
        return (
            mouse.coord.x > rect.x
            && mouse.coord.x < rect.x + rect.w
            && mouse.coord.y > rect.y
            && mouse.coord.y < rect.y + rect.h
        );
    }

    isMousedown() {
        return this.cur.mouse.clicked && !this.prev.mouse.clicked;
    }

    isMouseup() {
        return !this.cur.mouse.clicked && this.prev.mouse.clicked;
    }

    isMousedownInside(rect) {
        return this.isMousedown() && this.isMouseInside(rect);
    }

    isMouseupInside(rect) {
        return this.isMouseup() && this.isMouseInside(rect);
    }

    getMouseXDelta() {
        return this.cur.mouse.coord.x - this.prev.mouse.coord.x;
    }

    getMouseYDelta() {
        return this.cur.mouse.coord.y - this.prev.mouse.coord.y;
    }

    nextState() {
        this.prev.mouse.coord = { ...this.cur.mouse.coord };
        this.prev.mouse.clicked = this.cur.mouse.clicked;
        this.prev.keyboard = { ...this.cur.keyboard };
    }
}

export { State };
