const makeMessageTable = (cur) => {
    return {
        "mousedown": () => {
            cur.mouse.clicked = true;
        },
        "mouseup": () => {
            cur.mouse.clicked = false;
        },
        "mousemove": (e) => {
            cur.mouse.coord.x = e.offsetX;
            cur.mouse.coord.y = e.offsetY;
        },
        "ArrowRight:keydown": () => {
            cur.keyboard.right = true;
        },
        "ArrowRight:keyup": () => {
            cur.keyboard.right = false;
        },
        "Control:keydown": () => {
            cur.keyboard.control = true;
        },
        "Control:keyup": () => {
            cur.keyboard.control = false;
        },
        "Shift:keydown": () => {
            cur.keyboard.shift = true;
        },
        "Shift:keyup": () => {
            cur.keyboard.shift = false;
        },
        "Backspace:keydown": () => {
            cur.keyboard.backspace = true;
        },
        "Backspace:keyup": () => {
            cur.keyboard.backspace = false;
        },
    };
};

export { makeMessageTable };
