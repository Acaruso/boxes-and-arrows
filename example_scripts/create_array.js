function makeEmptyArray(n) {
    let arr = [];
    for (let i = 0; i < n; i++) {
        arr.push('');
    }
    return arr;
}

// function userFunction(logger) {
//     const id = logger.newNode("", null);
//     const arr = makeEmptyArray(10);
//     const labels = [['l', 0], ['r', 9], ['m', 4]];
//     logger.appendArrayToNode(arr, labels, id);
// }

// function userFunction(logger) {
//     const id = logger.newNode("", null);
//     const arr = makeEmptyArray(10);
//     const labels = [['l', 0], ['r', 3], ['m', 1]];
//     logger.appendArrayToNode(arr, labels, id);
// }

// function userFunction(logger) {
//     const id = logger.newNode("", null);
//     const arr = makeEmptyArray(10);
//     const labels = [['l', 5], ['r', 9], ['m', 7]];
//     logger.appendArrayToNode(arr, labels, id);
// }

function userFunction(logger) {
    const id = logger.newNode("", null);
    logger.appendToNode("\ntest", id);
    const arr = makeEmptyArray(5);
    // const labels = [['m', 3]];
    logger.appendArrayToNode(arr, [], id);
    logger.appendToNode("\ntest", id);
}
