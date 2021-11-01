class State {
    constructor() {
        this.cur = this.makeState();
        this.prev = this.makeState();

        this.messageTable = {
            "mousedown": () => {
                this.cur.mouse.clicked = true;
            },
            "mouseup": () => {
                this.cur.mouse.clicked = false;
            },
            "mousemove": (e) => {
                this.cur.mouse.coord.x = e.offsetX;
                this.cur.mouse.coord.y = e.offsetY;
            },
            "ArrowRight:keydown": () => {
                this.cur.keyboard.right = true;
            },
            "ArrowRight:keyup": () => {
                this.cur.keyboard.right = false;
            },
            "Control:keydown": () => {
                this.cur.keyboard.control = true;
            },
            "Control:keyup": () => {
                this.cur.keyboard.control = false;
            },
            "Shift:keydown": () => {
                this.cur.keyboard.shift = true;
            },
            "Shift:keyup": () => {
                this.cur.keyboard.shift = false;
            },
        };

        const eventHandler = (e) => {
            const s = e.key ? `${e.key}:${e.type}` : `${e.type}`;
            // console.log(s)
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

    makeState() {
        return {
            mouse: {
                clicked: false,
                coord: { x: 0, y: 0 },
            },
            keyboard: {
                right: false,
                left: false,
                control: false,
                shift: false,
            },
        };
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
