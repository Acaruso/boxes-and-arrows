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
    const arr = makeEmptyArray(7);
    logger.pushArray(arr, id);
}
