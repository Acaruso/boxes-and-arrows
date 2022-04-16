// function userFunction(logger) {
//     let id = logger.newNode("", null);
//     logger.appendToNode("", id);
// }

// pushArr(arr, [["s", start], ["e", end], ["m", mid]], id);

function swap(arr, i, j) {
    let temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
}

function userFunction(logger) {
    function pushArr(arr, labels, id) {
        logger.appendArrayToNode(arr, labels, id);
    }

    function partition(arr) {
        let p = arr[0];
        let i = 1;
        let j = 1;

        let id = logger.newNode(`asdf`, null);
        // pushArr(arr, [["i", i], ["j", j]], id);

        while (arr[i] < p) {
            i++;
        }

        pushArr(arr, [["i", i], ["j", j]], id);

        for (j = i + 1; j < arr.length; j++) {
            if (arr[j] < p) {
                swap(arr, i, j);
                i++;
            }
        }

        swap(arr, 0, i - 1);
        return i - 1;
    }

    const arr = [4, 11, 3, 6, 2, 1];
    const res = partition(arr);
    console.log(arr);
    console.log(res);
}
