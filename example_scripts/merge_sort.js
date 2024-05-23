function userFunction(logger) {
    function pushArr(arr, left, mid, right, id) {
        const labels = [["l", left], ["m", mid], ["r", right]];
        logger.pushArray(arr, id, { labels });
    }

    function pushTempArrDetails(temp, left, right, mid, tempLeft, tempRight, id) {
        const labels = [["l", left], ["r", right], ["m", mid], ["tl", tempLeft], ["tr", tempRight]];
        const colors = [["blue", left, right]];
        logger.pushArrayDetails(temp, id, { labels, colors });
    }

    function pushArrDetails(arr, left, right, cur, id) {
        const labels = [["cur", cur]];
        const colors = [["blue", left, right]];
        logger.pushArrayDetails(arr, id, { labels, colors });
    }

    function mergeSort(arr) {
        let temp = new Array(arr.length).fill(0);

        function inner(left, right, parentId) {
            const id = logger.newNode(`inner(${left}, ${right})`, parentId);

            if (left < right) {
                const mid = Math.floor((left + right) / 2);
                pushArr(arr, left, mid, right, id);
                inner(left, mid, id);
                inner(mid + 1, right, id);
                merge(left, mid, right, id);
            }
        }

        function merge(left, mid, right, id) {
            for (let i = left; i <= right; i++) {
                temp[i] = arr[i];
            }

            let tempLeft = left;
            let tempRight = mid + 1;
            let cur = left;

            while (tempLeft <= mid && tempRight <= right) {
                pushTempArrDetails(temp, left, right, mid, tempLeft, tempRight, id);
                pushArrDetails(arr, left, right, cur, id);

                if (temp[tempLeft] <= temp[tempRight]) {
                    arr[cur] = temp[tempLeft];
                    tempLeft++;
                    logger.pushLineDetails("temp[tl] -> arr[cur]", id);
                } else {
                    arr[cur] = temp[tempRight];
                    tempRight++;
                    logger.pushLineDetails("temp[tr] -> arr[cur]", id);
                }
                cur++;
                logger.pushLineDetails("-----------------------------", id);
            }

            let remaining = mid - tempLeft;

            logger.pushLineDetails(`loop end`, id);
            logger.pushStringDetails(`\nremaining: ${remaining}`, id);

            for (let i = 0; i <= remaining; i++) {
                pushTempArrDetails(temp, left, right, mid, tempLeft, tempRight, id);
                pushArrDetails(arr, left, right, cur, id);
                logger.pushLineDetails("-----------------------------", id);

                arr[cur] = temp[tempLeft];
                tempLeft++;
                cur++;
            }

            // logger.pushLineDetails(`final`, id);
            pushTempArrDetails(temp, left, right, mid, tempLeft, tempRight, id);
            pushArrDetails(arr, left, right, cur, id);
        }

        inner(0, arr.length - 1, null);
    }

    // let arr = [4, 83, 7, 5, 9, 27];
    // let arr = [38,4,7,57,67,43,92,01,9,33,1];
    let arr = [99,3,75,0,32,8,9,41,2];

    mergeSort(arr);

    console.log(arr);
}
