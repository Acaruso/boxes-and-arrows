function makeEmptyArray(n) {
    let arr = [];
    for (let i = 0; i < n; i++) {
        arr.push('');
    }
    return arr;
}

function userFunction(logger) {
    const id = logger.newNode("", null);
    logger.pushString("\ntest", id);
    // const arr = makeEmptyArray(11);
    // const arr = [-2, -1, 1, 2, 4, 8, 9, 9, 9, 9, 13];
    const arr = [-3, -2, -1, 2, 4, 8];
    logger.pushArray(arr, id);
}
