function getRand() {
    return Math.floor(Math.random() * 10);
}

function swap(arr, i, j) {
    let temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
}

function userFunction(logger) {
    function pushStr(str, id) {
        logger.appendToNode(`\n${str}`, id);
    }

    function pushArr(arr, labels, id) {
        logger.appendArrayToNode(arr, labels, id);
    }

    function pushStrDetails(str, id) {
        logger.appendToNodeDetails(`\n${str}`, id);
    }

    function pushArrDetails(arr, labels, id) {
        logger.appendArrayToNodeDetails(arr, labels, id);
    }

    function quickSort(arr, l, r, parentId) {
        let id = logger.newNode("", parentId);
        pushArr(arr, [["l", l], ["r", r]], id);

        if (l >= r) {
            return;
        } else {
            const pivotIdx = partition(arr, l, r, id);
            pushStr(`partition(arr, ${l}, ${r}) -> ${pivotIdx}`, id);
            quickSort(arr, l, pivotIdx - 1, id);
            quickSort(arr, pivotIdx + 1, r, id);
        }
    }

    function partition(arr, l, r, id) {
        let p = arr[l];
        let i = l + 1;
        let j = 0;

        while (arr[i] < p) {
            i++;
        }

        j = i + 1;

        // pushArrDetails(arr, [["i", i], ["j", j]], id);

        for (; j <= r; j++) {
            pushStrDetails("----------------------------------", id);
            pushArrDetails(arr, [["l", l], ["r", r], ["i", i], ["j", j]], id);
            if (arr[j] < p) {
                pushStrDetails("\nswap i <-> j", id);
                swap(arr, i, j);
                pushArrDetails(arr, [["l", l], ["r", r], ["i", i], ["j", j]], id);
                pushStrDetails("\ni++", id);
                i++;
                pushArrDetails(arr, [["l", l], ["r", r], ["i", i], ["j", j]], id);
            }
            pushStrDetails("\nj++", id);
        }

        swap(arr, l, i - 1);
        pushStrDetails("final ----------------------------------", id);
        pushArrDetails(arr, [["l", l], ["r", r], ["pivot", i - 1]], id);
        pushStrDetails(`-> ${i - 1}`, id);
    
        return i - 1;
    }

    const arr = [5,3,5,0,6,9,6,3,8,6]

    // const arr = [];
    // for (let i = 0; i < 10; i++) {
    //     arr.push(getRand());
    // }

    quickSort(arr, 0, arr.length - 1, null);
    console.log(arr);
}
