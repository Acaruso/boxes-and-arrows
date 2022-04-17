function userFunction(logger) {
    function pushStr(str, id) {
        logger.appendToNode(`\n${str}`, id);
    }

    function pushArr(arr, labels, id, colors) {
        logger.appendArrayToNode(arr, labels, id, colors);
    }

    function pushStrDetails(str, id) {
        logger.appendToNodeDetails(`\n${str}`, id);
    }

    function pushArrDetails(arr, labels, id, colors) {
        logger.appendArrayToNodeDetails(arr, labels, id, colors);
    }

    function arrDetails(arr, l, r, i, j, id) {
        pushArrDetails(
            arr, 
            [["l", l], ["r", r], ["i", i], ["j", j]], 
            id, 
            [["yellow", l], ["blue", l, i - 1], ["red", i, j - 1]]
        );
    }

    function swap(arr, i, j) {
        let temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }

    function quickSort(arr, l, r, parentId) {
        let id = logger.newNode("", parentId);
        pushArr(arr, [["l", l], ["r", r]], id, [["yellow", l], ["blue", l, r]]);

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
            arrDetails(arr, l, r, i, j, id);
            if (arr[j] < p) {
                pushStrDetails("\nswap i <-> j", id);
                swap(arr, i, j);
                arrDetails(arr, l, r, i, j, id);
                pushStrDetails("\ni++", id);
                i++;
                arrDetails(arr, l, r, i, j, id);
            }
            pushStrDetails("\nj++", id);
        }

        swap(arr, l, i - 1);
        pushStrDetails("final ----------------------------------", id);
        arrDetails(arr, l, r, i, j, id);
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
