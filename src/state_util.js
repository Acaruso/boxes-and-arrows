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
            cur.lastKey = "a";
        },
        "a:keyup": () => {
            cur.keyboard.a = false;
        },
        "b:keydown": () => {
            cur.keyboard.b = true;
            cur.lastKey = "b";
        },
        "b:keyup": () => {
            cur.keyboard.b = false;
        },
        "c:keydown": () => {
            cur.keyboard.c = true;
            cur.lastKey = "c";
        },
        "c:keyup": () => {
            cur.keyboard.c = false;
        },
        "d:keydown": () => {
            cur.keyboard.d = true;
            cur.lastKey = "d";
        },
        "d:keyup": () => {
            cur.keyboard.d = false;
        },
        "e:keydown": () => {
            cur.keyboard.e = true;
            cur.lastKey = "e";
        },
        "e:keyup": () => {
            cur.keyboard.e = false;
        },
        "f:keydown": () => {
            cur.keyboard.f = true;
            cur.lastKey = "f";
        },
        "f:keyup": () => {
            cur.keyboard.f = false;
        },
        "g:keydown": () => {
            cur.keyboard.g = true;
            cur.lastKey = "g";
        },
        "g:keyup": () => {
            cur.keyboard.g = false;
        },
        "h:keydown": () => {
            cur.keyboard.h = true;
            cur.lastKey = "h";
        },
        "h:keyup": () => {
            cur.keyboard.h = false;
        },
        "i:keydown": () => {
            cur.keyboard.i = true;
            cur.lastKey = "i";
        },
        "i:keyup": () => {
            cur.keyboard.i = false;
        },
        "j:keydown": () => {
            cur.keyboard.j = true;
            cur.lastKey = "j";
        },
        "j:keyup": () => {
            cur.keyboard.j = false;
        },
        "k:keydown": () => {
            cur.keyboard.k = true;
            cur.lastKey = "k";
        },
        "k:keyup": () => {
            cur.keyboard.k = false;
        },
        "l:keydown": () => {
            cur.keyboard.l = true;
            cur.lastKey = "l";
        },
        "l:keyup": () => {
            cur.keyboard.l = false;
        },
        "m:keydown": () => {
            cur.keyboard.m = true;
            cur.lastKey = "m";
        },
        "m:keyup": () => {
            cur.keyboard.m = false;
        },
        "n:keydown": () => {
            cur.keyboard.n = true;
            cur.lastKey = "n";
        },
        "n:keyup": () => {
            cur.keyboard.n = false;
        },
        "o:keydown": () => {
            cur.keyboard.o = true;
            cur.lastKey = "o";
        },
        "o:keyup": () => {
            cur.keyboard.o = false;
        },
        "p:keydown": () => {
            cur.keyboard.p = true;
            cur.lastKey = "p";
        },
        "p:keyup": () => {
            cur.keyboard.p = false;
        },
        "q:keydown": () => {
            cur.keyboard.q = true;
            cur.lastKey = "q";
        },
        "q:keyup": () => {
            cur.keyboard.q = false;
        },
        "r:keydown": () => {
            cur.keyboard.r = true;
            cur.lastKey = "r";
        },
        "r:keyup": () => {
            cur.keyboard.r = false;
        },
        "s:keydown": () => {
            cur.keyboard.s = true;
            cur.lastKey = "s";
        },
        "s:keyup": () => {
            cur.keyboard.s = false;
        },
        "t:keydown": () => {
            cur.keyboard.t = true;
            cur.lastKey = "t";
        },
        "t:keyup": () => {
            cur.keyboard.t = false;
        },
        "u:keydown": () => {
            cur.keyboard.u = true;
            cur.lastKey = "u";
        },
        "u:keyup": () => {
            cur.keyboard.u = false;
        },
        "v:keydown": () => {
            cur.keyboard.v = true;
            cur.lastKey = "v";
        },
        "v:keyup": () => {
            cur.keyboard.v = false;
        },
        "w:keydown": () => {
            cur.keyboard.w = true;
            cur.lastKey = "w";
        },
        "w:keyup": () => {
            cur.keyboard.w = false;
        },
        "x:keydown": () => {
            cur.keyboard.x = true;
            cur.lastKey = "x";
        },
        "x:keyup": () => {
            cur.keyboard.x = false;
        },
        "y:keydown": () => {
            cur.keyboard.y = true;
            cur.lastKey = "y";
        },
        "y:keyup": () => {
            cur.keyboard.y = false;
        },
        "z:keydown": () => {
            cur.keyboard.z = true;
            cur.lastKey = "z";
        },
        "z:keyup": () => {
            cur.keyboard.z = false;
        },
    };
};

const makeState = () => {
    return {
        mouse: {
            clicked: false,
            coord: { x: 0, y: 0 },
        },
        keyboard: {
            lastKey: '',
            right: false,
            left: false,
            control: false,
            shift: false,
            backspace: false,
            a: false,
            b: false,
            c: false,
            d: false,
            e: false,
            f: false,
            g: false,
            h: false,
            i: false,
            j: false,
            k: false,
            l: false,
            m: false,
            n: false,
            o: false,
            p: false,
            q: false,
            r: false,
            s: false,
            t: false,
            u: false,
            v: false,
            w: false,
            x: false,
            y: false,
            z: false,
        },
    };
}

export { makeMessageTable, makeState };
