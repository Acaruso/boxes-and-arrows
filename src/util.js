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

export { getMidpoint, distanceBetweenCoords };
