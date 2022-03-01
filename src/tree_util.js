const getAllIdsInTree = (rootId, boxes) => {
    let nodes = [];
    let stack = [];
    stack.push(rootId);

    let childIds = null;
    let curId = null;

    while (stack.length > 0) {
        curId = stack.pop();
        nodes.push(curId);
        childIds = boxes.getConnections(curId);
        stack.push(...childIds);
    }

    return nodes;
}

const moveBoxes = (ids, coord, boxes) => {
    if (ids.length === 0) {
        return;
    }

    const rootId = ids[0];
    const rootBox = boxes.getBox(rootId);
    const xDelta = coord.x - rootBox.coord.x;
    const yDelta = coord.y - rootBox.coord.y;

    for (const id of ids) {
        const box = boxes.getBox(id);
        box.setCoord({
            x: box.coord.x + xDelta,
            y: box.coord.y + yDelta
        });
    }
}

export {
    getAllIdsInTree,
    moveBoxes,
};
