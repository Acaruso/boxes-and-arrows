function userFunction(logger) {
    function pushStr(str, id) {
        logger.appendToNode(`\n${str}`, id);
    }

    function pushArr(arr, labels, id) {
        logger.appendArrayToNode(arr, labels, id);
    }

    function swap(arr, i, j) {
        let temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }
    
    function partition(arr) {
        let id = logger.newNode("initial state:", null);

        pushArr(arr, [], id);

        let p = arr[0];
        let i = 1;
        let j = 1;

        while (arr[i] < p) {
            i++;
        }

        pushStr("\nfind first elt >= p:", id);
        pushArr(arr, [["i", i]], id);

        for (j = i + 1; j < arr.length; j++) {
            pushStr("----------------------------------------", id);
            pushArr(arr, [["i", i], ["j", j]], id);
            if (arr[j] < p) {
                pushStr("\nswap i <-> j:", id);
                swap(arr, i, j);
                pushArr(arr, [["i", i], ["j", j]], id);
                pushStr("\ni++:", id);
                i++;
                pushArr(arr, [["i", i], ["j", j]], id);
            }
        }

        swap(arr, 0, i - 1);
        pushStr("final ----------------------------------", id);
        pushArr(arr, [["i", i], ["j", j]], id);
        pushStr(`-> ${i - 1}`, id);
    
        return i - 1;
    }

    const arr = [5, 3, 5, 6, 0, 1];
    partition(arr);
}
