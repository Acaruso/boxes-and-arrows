function userFunction(logger) {
    function pushStr(str, id) {
        logger.appendToNode(`\n${str}`, id);
    }

    function getColors(arr) {
        let colors = [["yellow", 0]];
        for (let i = 1; i < arr.length; i++) {
            if (arr[i] < arr[0]) {
                colors.push(["blue", i])
            } else {
                colors.push(["pink", i])
            }
        }
        return colors;
    }

    function pushArr1(arr, id) {
        // const colors = [["yellow", 0]];
        const colors = getColors(arr);
        logger.appendArrayToNode(arr, [], id, colors);
    }

    function pushArr2(arr, i, id) {
        const labels = [["i", i]];
        // const colors = [["yellow", 0], ["blue", 1, i - 1], ["pink", i]];
        const colors = getColors(arr);
        logger.appendArrayToNode(arr, labels, id, colors);
    }

    // function pushArr3(arr, i, j, id) {
    //     const labels = [["i", i], ["j", j]];
    //     const colors = [["yellow", 0], ["blue", 1, i - 1], ["pink", i, j - 1]];
    //     logger.appendArrayToNode(arr, labels, id, colors);
    // }

    function pushArr3(arr, i, j, id) {
        const labels = [["i", i], ["j", j]];

        let colors = [["yellow", 0]];
        for (let i = 1; i < arr.length; i++) {
            if (arr[i] < arr[0]) {
                colors.push(["blue", i])
            } else {
                colors.push(["pink", i])
            }
        }

        logger.appendArrayToNode(arr, labels, id, colors);
    }

    function pushArr4(arr, i, j, id) {
        const labels = [["i", i], ["j", j]];
        const colors = [["yellow", i - 1], ["blue", 0, i - 2], ["pink", i, arr.length]];
        logger.appendArrayToNode(arr, labels, id, colors);
    }

    function swap(arr, i, j) {
        let temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }
    
    function partition(arr) {
        let id = logger.newNode("initial state:", null);

        pushArr1(arr, id);

        let p = arr[0];
        let i = 1;
        let j = 1;

        while (arr[i] < p) {
            i++;
        }

        pushStr("\nfind first elt >= p:", id);
        pushArr2(arr, i, id);

        for (j = i + 1; j < arr.length; j++) {
            pushStr("----------------------------------------", id);
            pushStr("\nj++:", id);
            pushArr3(arr, i, j, id);
            if (arr[j] < p) {
                pushStr("\nswap i <-> j:", id);
                swap(arr, i, j);
                pushArr3(arr, i, j, id);
                pushStr("\ni++:", id);
                i++;
                pushArr3(arr, i, j, id);
            }
        }

        pushStr("final ----------------------------------", id);
        pushArr3(arr, i, j, id);
        pushStr("\nswap 0 <-> (i - 1):", id);
        swap(arr, 0, i - 1);
        pushArr4(arr, i, j, id);
        pushStr(`-> pivot: ${i - 1}`, id);
    
        return i - 1;
    }

    // const arr = [5, 3, 5, 6, 0, 1];
    const arr = [5,3,5,0,6,1,2,3,8,6];
    partition(arr);
}
