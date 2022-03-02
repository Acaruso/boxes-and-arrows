const depthFirstTraversal = (rootId, boxes, fn) => {
    let stack = [];
    stack.push(rootId);

    let childIds = null;
    let curId = null;

    while (stack.length > 0) {
        curId = stack.pop();
        fn(curId);
        childIds = boxes.getConnections(curId);
        stack.push(...childIds);
    }
}

const getAllIdsInTree = (rootId, boxes) => {
    let nodes = [];
    const fn = (id) => nodes.push(id);
    depthFirstTraversal(rootId, boxes, fn);
    return nodes;
}

const isTree = (rootId, boxes) => {
    let stack = [];
    let set = new Set();
    stack.push(rootId);

    let childIds = null;
    let curId = null;

    while (stack.length > 0) {
        curId = stack.pop();
        if (set.has(curId)) {
            return false;
        } else {
            set.add(curId);
        }
        childIds = boxes.getConnections(curId);
        stack.push(...childIds);
    }

    return true;
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

const moveBoxesByDelta = (ids, xDelta, yDelta, boxes) => {
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
    isTree,
    moveBoxes,
    moveBoxesByDelta,
};
