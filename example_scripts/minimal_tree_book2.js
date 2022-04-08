// given an array where each element is a unique integer, and the array is
// sorted in ascending order,
// create a binary search tree of the data, with minimal height

function drawTree(root, logger) {

    function inner(node, parentId) {
        const id = logger.newNode("" + node.value, parentId);

        if (node.left) {
            inner(node.left, id);
        }

        if (node.right) {
            inner(node.right, id);
        }
    }

    inner(root, null);
}

function minimalTree(arr, logger) {
    function newNode(str, parentId) {
        return logger.newNode(str, parentId);
    }

    function pushStr(str, id) {
        logger.appendToNode(str, id);
    }

    function pushArr(arr, labels, id) {
        logger.appendArrayToNode(arr, labels, id);
    }

    function inner(start, end, parentId) {
        const id = newNode(`inner(start: ${start}, end: ${end})`, parentId)

        if (start > end) {
            pushStr("\n-> null", id);
            return null;
        }

        let mid = Math.floor((start + end) / 2);
        let midNode = { value: arr[mid] };

        // pushStr(`\nmid: ${mid}`, id);

        pushArr(arr, [["s", start], ["e", end], ["m", mid]], id);

        midNode.left = inner(start, mid - 1, id);
        midNode.right = inner(mid + 1, end, id);

        pushStr(`\n-> ${midNode.value}`, id);
        return midNode;
    }

    return inner(0, arr.length - 1, null);
}

function userFunction(logger) {
    const arr = [1, 4, 13, 16, 18, 19, 33, 56, 999];
    // logger.disable();
    const root = minimalTree(arr, logger);
    // logger.enable();
    logger.disable();
    drawTree(root, logger);
}
