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
}

const isPrintableKeycode = (kc) => {
    return (
        (kc > 47 && kc < 58)        // number keys
        || (kc == 32 || kc == 13)   // spacebar & return key
        || (kc > 64 && kc < 91)     // letter keys
        || (kc > 95 && kc < 112)    // numpad keys
        || (kc > 185 && kc < 193)   // ;=,-./`
        || (kc > 218 && kc < 223)   // [\]'
    );
}
export { getMidpoint, distanceBetweenCoords, isPrintableKeycode };
