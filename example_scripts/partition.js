function userFunction(logger) {
    function pushStr(str, id) {
        logger.pushString(`\n${str}`, id);
    }

    function getColors(arr) {
        let colors = [["yellow", 0]];
        for (let i = 1; i < arr.length; i++) {
            if (arr[i] < arr[0]) {
                colors.push(["blue", i])
            } else {
                colors.push(["red", i])
            }
        }
        return colors;
    }

    function pushArrInit(arr, id) {
        const colors = getColors(arr);
        logger.pushArray(arr, [], id, colors);
    }

    function pushArr(arr, i, j, id) {
        const labels = [["i", i], ["j", j]];
        const colors = getColors(arr);
        logger.pushArray(arr, labels, id, colors);
    }

    function pushArrFinal(arr, i, j, id) {
        const labels = [["i", i], ["j", j]];
        const colors = [["yellow", i - 1], ["blue", 0, i - 2], ["red", i, arr.length]];
        logger.pushArray(arr, labels, id, colors);
    }

    function swap(arr, i, j) {
        let temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }

    function partition(arr) {
        let id = logger.newNode("initial state:", null);
        pushArrInit(arr, id);

        let p = arr[0];
        let i = 1;

        while (arr[i] < p) {
            i++;
        }

        let j = i + 1;

        pushStr("\ni = first elt >= p:", id);
        pushStr("\nj = i + 1:", id);
        pushArr(arr, i, j, id);

        for (; j < arr.length; j++) {
            pushStr("----------------------------------------", id);
            pushArr(arr, i, j, id);
            if (arr[j] < p) {
                pushStr("\nswap i <-> j:", id);
                swap(arr, i, j);
                pushArr(arr, i, j, id);
                pushStr("\ni++:", id);
                i++;
                pushArr(arr, i, j, id);
            }
            pushStr("\nj++:", id);
        }

        pushStr("final ----------------------------------", id);
        pushArr(arr, i, j, id);
        pushStr("\nswap 0 <-> (i - 1):", id);
        swap(arr, 0, i - 1);
        pushArrFinal(arr, i, j, id);
        pushStr(`-> pivot: ${i - 1}`, id);

        return i - 1;
    }

    const arr = [5,3,5,0,6,1,2,3,8,6];
    // const arr = [5, 3, 5, 6, 0, 1];
    // const arr = [5,6,3,1,7];
    partition(arr);
}
