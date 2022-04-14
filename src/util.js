import { textConstants } from "./constants/text_constants";

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
        (kc === 13)                 // enter
        || (kc === 32)              // spacebar
        || (kc > 47 && kc < 58)     // number keys
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
    return [fileHandle, content];
};

const loadFileFromHandle = async (fileHandle) => {
    const file = await fileHandle.getFile();
    const content = await file.text();
    return content;
};

const getTextRect = (text, coord) => {
    let maxWidth = -1;

    for (const str of text) {
        const curWidth = getWidthOfText(
            str,
            textConstants.charWidth,
            textConstants.xPadding
        );

        maxWidth = Math.max(maxWidth, curWidth);
    }

    let rect = {
        x: coord.x,
        y: coord.y,
        w: maxWidth,
    };

    rect.h = (textConstants.charHeight * text.length) + textConstants.yPadding;

    return rect;
}

const getWidthOfText = (text, charWidth, xPadding) => {
    const len = text.length > 0 ? text.length : 1;
    return Math.floor(len * charWidth) + (xPadding * 2);
};

const firstElt = (arr) => {
    if (arr.length === 0) {
        return null;
    } else {
        return arr[0];
    }
}

const lastElt = (arr) => {
    if (arr.length === 0) {
        return null;
    } else {
        return arr[arr.length - 1];
    }
}

const clearArray = (arr) => {
    while (arr.length > 0) {
        arr.pop();
    }
}

export {
    getMidpoint,
    distanceBetweenCoords,
    rectsOverlap,
    isPrintableKeycode,
    saveFile,
    loadFile,
    loadFileFromHandle,
    getTextRect,
    getWidthOfText,
    firstElt,
    lastElt,
    clearArray,
};
