import { makeState } from "./state_util";

class State {
    constructor() {
        this.initialize();

        const eventListener = (e) => {
            // handle keyboard events
            if (e.key) {
                let key = e.key.toLowerCase();
                if (key === " ") {
                    key = "space";
                } else if (key === "enter") {
                    key = "\n";
                }

                if (e.type === "keydown") {
                    this.cur.keyboard[key] = true;
                } else if (e.type === "keyup") {
                    this.cur.keyboard[key] = false;
                }
            }

            // handle mouse events
            else if (e.type === "mousedown") {
                this.cur.mouse.clicked = true;
                this.cur.mouse.coord.x = e.offsetX;
                this.cur.mouse.coord.y = e.offsetY;
                if (this.initialMouseClick === true) {
                    this.prev.mouse.coord.x = this.cur.mouse.coord.x;
                    this.prev.mouse.coord.y = this.cur.mouse.coord.y;
                    this.initialMouseClick = false;
                }
            } else if (e.type === "mouseup") {
                this.cur.mouse.clicked = false;
                this.cur.mouse.coord.x = e.offsetX;
                this.cur.mouse.coord.y = e.offsetY;
            } else if (e.type === "mousemove") {
                this.cur.mouse.coord.x = e.offsetX;
                this.cur.mouse.coord.y = e.offsetY;
            }
        }

        document.addEventListener("keydown", eventListener, false);
        document.addEventListener("keyup", eventListener, false);
        document.addEventListener("mousedown", eventListener, false);
        document.addEventListener("mouseup", eventListener, false);
        document.addEventListener("mousemove", eventListener, false);

        // when alt-tabbing out of window, re-initialize state
        // otherwise keys will stay "stuck" down
        window.addEventListener('blur', () => {
            this.initialize();
        });

        // prevent spacebar from scrolling
        window.addEventListener('keydown', (e) => {
            if (e.keyCode === 32 && e.target === document.body) {
                e.preventDefault();
            }
        });
    }

    initialize() {
        this.cur = makeState();
        this.prev = makeState();
        this.initialMouseClick = true;
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

    getMouseCoord() {
        return this.cur.mouse.coord;
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
