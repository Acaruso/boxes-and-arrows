function userFunction(logger) {
    function pushStr(str, id) {
        logger.pushString(`\n${str}`, id);
    }

    function pushArr(arr, p, l, r, id) {
        const labels = [["l", l], ["r", r]];
        const colors = [["yellow", p], ["blue", l, r]];
        logger.pushArray(arr, id, { labels, colors});
    }

    function pushStrDetails(str, id) {
        logger.pushStringDetails(`\n${str}`, id);
    }

    function getColors(arr, l, r) {
        let colors = [["yellow", l]];
        for (let i = l + 1; i <= r; i++) {
            if (arr[i] < arr[l]) {
                colors.push(["blue", i])
            } else {
                colors.push(["red", i])
            }
        }
        return colors;
    }

    function getColorsFinal(arr, l, r, p) {
        let colors = [["yellow", p]];
        let pivot = arr[p];
        for (let i = l; i <= r; i++) {
            if (arr[i] < pivot) {
                colors.push(["blue", i])
            } else {
                colors.push(["red", i])
            }
        }
        return colors;
    }

    function pushArrDetails(arr, l, r, i, j, id) {
        const labels = [["l", l], ["r", r], ["i", i], ["j", j]];
        const colors = getColors(arr, l, r);
        logger.pushArrayDetails(arr, id, { labels, colors});
    }

    function pushArrDetailsFinal(arr, l, r, i, j, id) {
        const labels = [["l", l], ["r", r], ["i", i], ["j", j]];
        const colors = getColorsFinal(arr, l, r, i - 1);
        logger.pushArrayDetails(arr, id, { labels, colors});
    }

    function swap(arr, i, j) {
        let temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }

    function quickSort(arr, l, r, parentId) {
        let id = logger.newNode("", parentId);
        pushArr(arr, l, l, r, id);

        if (l >= r) {
            return;
        } else {
            const pivotIdx = partition(arr, l, r, id);
            pushStr(`\npartition(arr, ${l}, ${r}) -> ${pivotIdx}\n`, id);
            pushArr(arr, pivotIdx, l, r, id);
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

        pushStrDetails("init -----------------------------", id);
        pushStrDetails("\ni = first elt >= p", id);
        pushStrDetails("\nj = i + 1", id);
        pushArrDetails(arr, l, r, i, j, id);

        for (; j <= r; j++) {
            pushStrDetails("----------------------------------", id);
            pushArrDetails(arr, l, r, i, j, id);
            if (arr[j] < p) {
                pushStrDetails("\nswap i <-> j", id);
                swap(arr, i, j);
                pushArrDetails(arr, l, r, i, j, id);
                pushStrDetails("\ni++", id);
                i++;
                pushArrDetails(arr, l, r, i, j, id);
            }
            pushStrDetails("\nj++", id);
        }

        pushStrDetails("final ----------------------------------", id);
        swap(arr, l, i - 1);
        pushStrDetails("\nswap l <-> (i - 1)", id);
        pushArrDetailsFinal(arr, l, r, i, j, id);
        pushStrDetails(`-> ${i - 1}`, id);

        return i - 1;
    }

    // const arr = [1,4,3,2,5,8,4,6,2];
    const arr = [5,3,5,0,6,9,6,3,8,6];
    // const arr = [3,4,2,1,3];

    quickSort(arr, 0, arr.length - 1, null);
    console.log(arr);
}
