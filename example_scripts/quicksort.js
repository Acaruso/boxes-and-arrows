// function userFunction(logger) {
//     let id = logger.newNode("", null);
//     logger.appendToNode("", id);
// }

// pushArr(arr, [["s", start], ["e", end], ["m", mid]], id);

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
        logger.appendToNodeDetails(`\n${str}`, id);
    }

    function pushArr(arr, labels, id) {
        logger.appendArrayToNodeDetails(arr, labels, id);
    }

    let count = 0;

    function quickSort(arr, l, r, parentId) {
        let id = logger.newNode(`l: ${l}, r: ${r}`, parentId);
        count++;
        console.log(arr);
        console.log(l);
        console.log(r);
        console.log();
        if (l >= r || count > 5) {
            return;
        } else {
            const pivotIdx = partition(arr, l, r, id);
            console.log(`pivotIdx: ${pivotIdx}`);
            quickSort(arr, l, pivotIdx - 1, id);
            quickSort(arr, pivotIdx + 1, r, id);
        }
    }

    function partition(arr, l, r, id) {
        let p = arr[l];
        let i = l;
        let j = 0;

        // let id = logger.newNode(``, null);

        while (arr[i] < p) {
            i++;
        }

        j = i + 1;

        for (; j <= r; j++) {
            pushStr("----------------------------------", id);
            // pushStr("\nj++", id);
            pushArr(arr, [["i", i], ["j", j]], id);
            if (arr[j] < p) {
                // pushStr("\nswap i <-> j", id);
                swap(arr, i, j);
                // pushArr(arr, [["i", i], ["j", j]], id);
                // pushStr("\ni++", id);
                i++;
                // pushArr(arr, [["i", i], ["j", j]], id);
            }
        }

        swap(arr, l, i - 1);
        // pushStr("final ----------------------------------", id);
        // pushArr(arr, [], id);
    
        return i - 1;
    }

    // function partition(arr) {
    //     let p = arr[0];
    //     let i = 1;
    //     let j = 1;

    //     let id = logger.newNode(``, null);

    //     while (arr[i] < p) {
    //         i++;
    //     }

    //     j = i + 1;

    //     for (; j < arr.length; j++) {
    //         pushStr("----------------------------------", id);
    //         pushStr("\nj++", id);
    //         pushArr(arr, [["i", i], ["j", j]], id);
    //         if (arr[j] < p) {
    //             pushStr("\nswap i <-> j", id);
    //             swap(arr, i, j);
    //             pushArr(arr, [["i", i], ["j", j]], id);
    //             pushStr("\ni++", id);
    //             i++;
    //             pushArr(arr, [["i", i], ["j", j]], id);
    //         }
    //     }

    //     swap(arr, 0, i - 1);
    //     pushStr("final ----------------------------------", id);
    //     pushArr(arr, [], id);
    
    //     return i - 1;
    // }

    // const arr = [];
    // for (let i = 0; i < 10; i++) {
    //     arr.push(getRand());
    // }

    const arr = [5,3,5,0,6,9,6,3,8,6]
    // const res = partition(arr);
    quickSort(arr, 0, arr.length - 1, null);
    console.log(arr);
}
