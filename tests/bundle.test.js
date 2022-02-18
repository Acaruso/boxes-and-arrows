/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Box": () => (/* binding */ Box)
/* harmony export */ });
/* harmony import */ var _text_constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);


class Box {
    constructor(text, coord, id=0) {
        this.coord = { ...coord };
        this.id = id;
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

        this.rect = {
            x: this.coord.x,
            y: this.coord.y,
            w: Math.floor(length * _text_constants__WEBPACK_IMPORTED_MODULE_0__.textConstants.charWidth) + (_text_constants__WEBPACK_IMPORTED_MODULE_0__.textConstants.xPadding * 2),
            h: _text_constants__WEBPACK_IMPORTED_MODULE_0__.textConstants.charHeight + _text_constants__WEBPACK_IMPORTED_MODULE_0__.textConstants.yPadding
        };
    }
}




/***/ }),
/* 2 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "textConstants": () => (/* binding */ textConstants)
/* harmony export */ });
const charHeight = 14;

const textConstants = {
    textStyle: "Consolas",
    charHeight: charHeight,
    charWidth: charHeight * 0.55,
    xPadding: 4,
    yPadding: 6,
};




/***/ }),
/* 3 */,
/* 4 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Boxes": () => (/* binding */ Boxes)
/* harmony export */ });
/* harmony import */ var _box__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);


class Boxes {
    constructor() {
        this.boxes = [];
        this.nextId = 0;

        // key: id of source
        // value: array of ids of destinations
        this.connections = new Map();
    }

    addBox(text, coord) {
        const box = new _box__WEBPACK_IMPORTED_MODULE_0__.Box(text, coord, this.nextId);
        this.nextId++;
        this.boxes.push(box);
        this.connections.set(box.id, []);
        return box.id;
    }

    getLength() {
        return this.boxes.length;
    }

    loadBoxes(boxesStr) {
        const boxData = JSON.parse(boxesStr);
        let maxId = -1;

        for (const x of boxData) {
            const box = new _box__WEBPACK_IMPORTED_MODULE_0__.Box(x.text, x.coord, x.id);
            this.boxes.push(box);
            maxId = Math.max(maxId, x.id);
        }

        this.nextId = maxId + 1;
    }

    loadConnections(connStr) {
        this.connections = new Map(JSON.parse(connStr));
    }

    getBoxes() {
        return this.boxes;
    }

    getBox(id) {
        return this.boxes.find((box) => box.id === id);
    }

    deleteBox(id) {
        this.deleteConnections(id);
        this.boxes = this.boxes.filter((box) => box.id !== id);
    }

    deleteAll() {
        this.boxes.forEach(box => this.deleteBox(box.id));
    }

    addConnection(source, dest) {
        let destArr = this.connections.get(source);

        if (!destArr.includes(dest)) {
            destArr.push(dest);
        }
    }

    getConnections() {
        let out = [];

        for (const [source, destArr] of this.connections) {
            for (const dest of destArr) {
                out.push([
                    this.getBox(source),
                    this.getBox(dest)
                ]);
            }
        }

        return out;
    }

    deleteConnections(id) {
        this.connections.delete(id);
        for (let [source, destArr] of this.connections) {
            this.connections.set(source, destArr.filter(x => x !== id));
        }
    }

    forEach(fn) {
        this.boxes.forEach(fn);
    }
}




/***/ }),
/* 5 */,
/* 6 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Model": () => (/* binding */ Model)
/* harmony export */ });
/* harmony import */ var _boxes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4);
/* harmony import */ var _help_dialog__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7);



class Model {
    constructor() {
        this.boxes = new _boxes__WEBPACK_IMPORTED_MODULE_0__.Boxes();
        this.helpDialog = new _help_dialog__WEBPACK_IMPORTED_MODULE_1__.HelpDialog();

        this.selectedBoxIds = [];

        this.selectedBoxId = -1;
        this.draggingBoxes = false;
        this.draggingSelectedRegion = false;

        this.lineBegin = { x: 0, y: 0 };
        this.drawingLine = false;
        this.outBox = {};

        this.numLevels = 1;

        this.selectedRegion = { x: 0, y: 0, w: 0, h: 0, alpha: 0.3 };
    }

    anyBoxesSelected() {
        return this.selectedBoxIds.length > 0;
    }

    isBoxSelected(id) {
        return this.selectedBoxIds.includes(id);
    }

    addSelectedBoxId(id) {
        if (!this.selectedBoxIds.includes(id)) {
            this.selectedBoxIds.push(id);
        }
    }

    clearSelectedBoxIds() {
        while (this.selectedBoxIds.length > 0) {
            this.selectedBoxIds.pop();
        }
    }
}




/***/ }),
/* 7 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "HelpDialog": () => (/* binding */ HelpDialog)
/* harmony export */ });
/* harmony import */ var _text_constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(8);



class HelpDialog {
    constructor() {
        this.visible = true;

        this.text = [
            "Welcome to Boxes and Lines",
            "",
            "Controls:",
            "Create a box: double click",
            "Create a connection: Ctrl-click within a box,",
            "    then drag to another box",
            "Duplicate a box: Alt-click within a box",
            "Delete selected boxes: Delete",
            "Horizontally align selected boxes: Ctrl-H",
            "Vertically align selected boxes: Ctrl-V",
            "Save file: Ctrl-S",
            "Load file: Ctrl-L",
        ];

        let maxWidth = -1;

        for (const s of this.text) {
            const curWidth = (0,_util__WEBPACK_IMPORTED_MODULE_1__.getWidthOfText)(
                s,
                _text_constants__WEBPACK_IMPORTED_MODULE_0__.textConstants.charWidth,
                _text_constants__WEBPACK_IMPORTED_MODULE_0__.textConstants.xPadding
            );

            maxWidth = Math.max(maxWidth, curWidth);
        }

        this.rect = {
            x: 5,
            y: 5,
            w: maxWidth,
            color: "#A3BFFF",
        };

        this.rect.h = this.rect.y + (_text_constants__WEBPACK_IMPORTED_MODULE_0__.textConstants.charHeight * this.text.length);

        const cbW = _text_constants__WEBPACK_IMPORTED_MODULE_0__.textConstants.charHeight;

        this.closeButtonRect = {
            x: (this.rect.x + this.rect.w) - (cbW + _text_constants__WEBPACK_IMPORTED_MODULE_0__.textConstants.yPadding),
            y: this.rect.y + _text_constants__WEBPACK_IMPORTED_MODULE_0__.textConstants.yPadding,
            w: cbW,
            h: _text_constants__WEBPACK_IMPORTED_MODULE_0__.textConstants.charHeight,
        };
    }
}




/***/ }),
/* 8 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getMidpoint": () => (/* binding */ getMidpoint),
/* harmony export */   "distanceBetweenCoords": () => (/* binding */ distanceBetweenCoords),
/* harmony export */   "rectsOverlap": () => (/* binding */ rectsOverlap),
/* harmony export */   "isPrintableKeycode": () => (/* binding */ isPrintableKeycode),
/* harmony export */   "saveFile": () => (/* binding */ saveFile),
/* harmony export */   "loadFile": () => (/* binding */ loadFile),
/* harmony export */   "getWidthOfText": () => (/* binding */ getWidthOfText)
/* harmony export */ });
const getMidpoint = (rect) => {
    return {
        x: rect.x + (rect.w / 2),
        y: rect.y + (rect.h / 2)
    };
};

const distanceBetweenCoords = (coord1, coord2) => {
    const a = Math.abs(coord1.x - coord2.x);
    const b = Math.abs(coord1.y - coord2.y);
    return Math.sqrt(a*a + b*b);
};

const handleNegs = (rect) => {
    let newRect = { ...rect };

    if (newRect.w < 0) {
        newRect.x += newRect.w;
        newRect.w = Math.abs(newRect.w);
    }

    if (newRect.h < 0) {
        newRect.y += newRect.h;
        newRect.h = Math.abs(newRect.h)
    }

    return newRect;
};

const rectsOverlap = (rect1, rect2) => {
    rect1 = handleNegs(rect1);
    rect2 = handleNegs(rect2);

    return (
        rect1.x < rect2.x + rect2.w &&
        rect1.x + rect1.w > rect2.x &&
        rect1.y < rect2.y + rect2.h &&
        rect1.y + rect1.h > rect2.y
    );
};

const isPrintableKeycode = (kc) => {
    return (
        (kc > 47 && kc < 58)        // number keys
        || (kc == 32)               // spacebar
        || (kc > 64 && kc < 91)     // letter keys
        || (kc > 95 && kc < 112)    // numpad keys
        || (kc > 185 && kc < 193)   // ;=,-./`
        || (kc > 218 && kc < 223)   // [\]'
    );
};

// see: https://web.dev/file-system-access/
const saveFile = async (content) => {
    const options = {
        types: [{
            description: 'Text Files',
            accept: { 'text/plain': ['.txt'] }
        }]
    };

    const fileHandle = await window.showSaveFilePicker(options);
    const writable = await fileHandle.createWritable();
    await writable.write(content);
    await writable.close();
};

const loadFile = async () => {
    const [fileHandle] = await window.showOpenFilePicker();
    const file = await fileHandle.getFile();
    const content = await file.text();
    return content;
};

// const loadFile = async (cb) => {
//     const [fileHandle] = await window.showOpenFilePicker();
//     const file = await fileHandle.getFile();
//     const content = await file.text();
//     cb(content);
//     // return content;
// };

const getWidthOfText = (text, charWidth, xPadding) => {
    return Math.floor(text.length * charWidth) + (xPadding * 2);
};




/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other entry modules.
(() => {
var __webpack_exports__ = {};
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _src_box__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);


describe("Box", () => {
    // test("", () => {
    //     expect().toEqual();
    // });

    test("append chars", () => {
        const box = new _src_box__WEBPACK_IMPORTED_MODULE_0__.Box("", { x: 0, y: 0 }, 1);
        box.appendChar("a");
        box.appendChar("b");
        box.appendChar("c");
        expect(box.text).toEqual("abc");
    });

    test("delete chars", () => {
        const box = new _src_box__WEBPACK_IMPORTED_MODULE_0__.Box("", { x: 0, y: 0 }, 1);
        box.appendChar("a");
        box.appendChar("b");
        box.appendChar("c");
        box.deleteChar();
        box.deleteChar();
        expect(box.text).toEqual("a");
    });

    test("delete more chars than exist", () => {
        const box = new _src_box__WEBPACK_IMPORTED_MODULE_0__.Box("", { x: 0, y: 0 }, 1);
        box.appendChar("a");
        box.deleteChar();
        box.deleteChar();
        expect(box.text).toEqual("");
    });

    test("update coord", () => {
        const box = new _src_box__WEBPACK_IMPORTED_MODULE_0__.Box("", { x: 0, y: 0 }, 1);
        box.setCoord({ x: 10, y: 20 });
        expect(box.coord).toEqual({ x: 10, y: 20 });
    });

    test("update coord, should update rect", () => {
        const box = new _src_box__WEBPACK_IMPORTED_MODULE_0__.Box("", { x: 0, y: 0 }, 1);
        box.setCoord({ x: 10, y: 20 });
        expect(box.rect.x).toEqual(10);
        expect(box.rect.y).toEqual(20);
    });

});

})();

// This entry need to be wrapped in an IIFE because it need to be isolated against other entry modules.
(() => {
var __webpack_exports__ = {};
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _src_boxes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4);


describe("Boxes", () => {
    test("add box, boxes length should be 1", () => {
        const boxes = new _src_boxes__WEBPACK_IMPORTED_MODULE_0__.Boxes();
        boxes.addBox("test box", { x: 0, y: 0 });
        expect(boxes.getLength()).toEqual(1);
    });

    test("add and delete box, boxes length should be 0", () => {
        const boxes = new _src_boxes__WEBPACK_IMPORTED_MODULE_0__.Boxes();
        const id = boxes.addBox("test box", { x: 0, y: 0 });
        boxes.deleteBox(id);
        expect(boxes.getLength()).toEqual(0);
    });

    test("add boxes, delete all boxes, boxes length should be 0", () => {
        const boxes = new _src_boxes__WEBPACK_IMPORTED_MODULE_0__.Boxes();
        boxes.addBox("1", { x: 43, y: 2 });
        boxes.addBox("2", { x: 34, y: 7 });
        boxes.addBox("3", { x: 87, y: 34 });
        boxes.deleteAll();
        expect(boxes.getLength()).toEqual(0);
    });

    test("create connection, connection should exist", () => {
        const boxes = new _src_boxes__WEBPACK_IMPORTED_MODULE_0__.Boxes();
        const id1 = boxes.addBox("1", { x: 0, y: 0 });
        const id2 = boxes.addBox("1", { x: 13, y: 1414 });
        boxes.addConnection(id1, id2);
        const connections = boxes.getConnections(id1, id2);
        expect(connections[0][0].id).toEqual(id1);
        expect(connections[0][1].id).toEqual(id2);
    });

    test("create connection, delete source, connection should be deleted", () => {
        const boxes = new _src_boxes__WEBPACK_IMPORTED_MODULE_0__.Boxes();
        const id1 = boxes.addBox("1", { x: 0, y: 0 });
        const id2 = boxes.addBox("1", { x: 13, y: 1414 });
        boxes.addConnection(id1, id2);
        boxes.deleteBox(id1);
        const connections = boxes.getConnections(id1, id2);
        expect(connections.length).toEqual(0);
    });

    test("create connection, delete destination, connection should be deleted", () => {
        const boxes = new _src_boxes__WEBPACK_IMPORTED_MODULE_0__.Boxes();
        const id1 = boxes.addBox("1", { x: 0, y: 0 });
        const id2 = boxes.addBox("1", { x: 13, y: 1414 });
        boxes.addConnection(id1, id2);
        boxes.deleteBox(id2);
        const connections = boxes.getConnections(id1, id2);
        expect(connections.length).toEqual(0);
    });

});

})();

// This entry need to be wrapped in an IIFE because it need to be isolated against other entry modules.
(() => {
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _src_model__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6);


describe("Model", () => {
    test("add box", () => {
        const model = new _src_model__WEBPACK_IMPORTED_MODULE_0__.Model();
        model.boxes.addBox("test box", { x: 0, y: 0 });
        expect(model.boxes.boxes.length).toEqual(1);
    });
});

})();

/******/ })()
;