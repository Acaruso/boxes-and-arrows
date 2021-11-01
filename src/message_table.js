const makeMessageTable = (cur) => {
    return {
        // mouse //////////////////////////////////////////

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

        // control keys ///////////////////////////////////

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

        // letter keys ////////////////////////////////////

        "a:keydown": () => {
            cur.keyboard.a = true;
        },
        "a:keyup": () => {
            cur.keyboard.a = false;
        },
        "b:keydown": () => {
            cur.keyboard.b = true;
        },
        "b:keyup": () => {
            cur.keyboard.b = false;
        },
        "c:keydown": () => {
            cur.keyboard.c = true;
        },
        "c:keyup": () => {
            cur.keyboard.c = false;
        },
        "d:keydown": () => {
            cur.keyboard.d = true;
        },
        "d:keyup": () => {
            cur.keyboard.d = false;
        },
        "e:keydown": () => {
            cur.keyboard.e = true;
        },
        "e:keyup": () => {
            cur.keyboard.e = false;
        },
        "f:keydown": () => {
            cur.keyboard.f = true;
        },
        "f:keyup": () => {
            cur.keyboard.f = false;
        },
        "g:keydown": () => {
            cur.keyboard.g = true;
        },
        "g:keyup": () => {
            cur.keyboard.g = false;
        },
        "h:keydown": () => {
            cur.keyboard.h = true;
        },
        "h:keyup": () => {
            cur.keyboard.h = false;
        },
        "i:keydown": () => {
            cur.keyboard.i = true;
        },
        "i:keyup": () => {
            cur.keyboard.i = false;
        },
        "j:keydown": () => {
            cur.keyboard.j = true;
        },
        "j:keyup": () => {
            cur.keyboard.j = false;
        },
        "k:keydown": () => {
            cur.keyboard.k = true;
        },
        "k:keyup": () => {
            cur.keyboard.k = false;
        },
        "l:keydown": () => {
            cur.keyboard.l = true;
        },
        "l:keyup": () => {
            cur.keyboard.l = false;
        },
        "m:keydown": () => {
            cur.keyboard.m = true;
        },
        "m:keyup": () => {
            cur.keyboard.m = false;
        },
        "n:keydown": () => {
            cur.keyboard.n = true;
        },
        "n:keyup": () => {
            cur.keyboard.n = false;
        },
        "o:keydown": () => {
            cur.keyboard.o = true;
        },
        "o:keyup": () => {
            cur.keyboard.o = false;
        },
        "p:keydown": () => {
            cur.keyboard.p = true;
        },
        "p:keyup": () => {
            cur.keyboard.p = false;
        },
        "q:keydown": () => {
            cur.keyboard.q = true;
        },
        "q:keyup": () => {
            cur.keyboard.q = false;
        },
        "r:keydown": () => {
            cur.keyboard.r = true;
        },
        "r:keyup": () => {
            cur.keyboard.r = false;
        },
        "s:keydown": () => {
            cur.keyboard.s = true;
        },
        "s:keyup": () => {
            cur.keyboard.s = false;
        },
        "t:keydown": () => {
            cur.keyboard.t = true;
        },
        "t:keyup": () => {
            cur.keyboard.t = false;
        },
        "u:keydown": () => {
            cur.keyboard.u = true;
        },
        "u:keyup": () => {
            cur.keyboard.u = false;
        },
        "v:keydown": () => {
            cur.keyboard.v = true;
        },
        "v:keyup": () => {
            cur.keyboard.v = false;
        },
        "w:keydown": () => {
            cur.keyboard.w = true;
        },
        "w:keyup": () => {
            cur.keyboard.w = false;
        },
        "x:keydown": () => {
            cur.keyboard.x = true;
        },
        "x:keyup": () => {
            cur.keyboard.x = false;
        },
        "y:keydown": () => {
            cur.keyboard.y = true;
        },
        "y:keyup": () => {
            cur.keyboard.y = false;
        },
        "z:keydown": () => {
            cur.keyboard.z = true;
        },
        "z:keyup": () => {
            cur.keyboard.z = false;
        },
    };
};

export { makeMessageTable };
