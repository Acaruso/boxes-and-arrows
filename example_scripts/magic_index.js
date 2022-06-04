function userFunction(logger) {
    function pushArray(arr, l, r, m, id) {
        logger.pushArray(
            arr,
            id,
            { labels: [["l", l], ["r", r], ["m", m]] }
        );
    }

    function magicIndex(arr) {
        let result = null;

        function inner(l, r) {
            if (l > r || l < 0 || r >= arr.length || result !== null) {
                return;
            }

            let midIdx = Math.floor((l + r) / 2);
            let midElt = arr[midIdx];

            if (midElt === midIdx) {
                result = midElt;
            } else if (midIdx < midElt) {
                // recurse left
                inner(l, midIdx - 1);
            } else if (midIdx > midElt) {
                // recurse right
                inner(midIdx + 1, r);
            }
        }

        inner(0, arr.length - 1);

        return result;
    }

    // books:
    // function magicIndexNotUnique(arr) {
    //     let res = null;

    //     function inner(l, r, parentId) {
    //         let id = logger.newNode(`inner(${l}, ${r})`, parentId);

    //         if (l > r || res !== null) {
    //             return;
    //         }

    //         let midIdx = Math.floor((l + r) / 2);
    //         let midElt = arr[midIdx];

    //         pushArray(arr, l, r, midIdx, id);

    //         if (midElt === midIdx) {
    //             logger.pushLine(`found: ${midIdx}`, id);
    //             res = midIdx;
    //             return;
    //         }

    //         let newR = Math.min(midIdx - 1, midElt);
    //         inner(l, newR, id);
    //         logger.pushLine(`inner(${l}, ${newR})`, id);

    //         let newL = Math.max(midIdx + 1, midElt);
    //         inner(newL, r, id);

    //         logger.pushLine(`inner(${newL}, ${r})`, id);
    //     }

    //     inner(0, arr.length - 1, null);

    //     return res;
    // }

    // mine:
    function magicIndexNotUnique(arr) {
        let res = null;

        function inner(l, r, parentId) {
            let id = logger.newNode(`inner(${l}, ${r})`, parentId);

            if (l > r || res !== null) {
                return;
            }

            let m = Math.floor((l + r) / 2);

            pushArray(arr, l, r, m, id);

            if (arr[m] === m) {
                logger.pushLine(`found: ${m}`, id);
                res = m;
                return;
            } else if (arr[m] < m) {

                // left
                inner(l, arr[m], id);

                // right
                inner(m + 1, r, id);

            } else if (arr[m] > m) {
                
                // left
                inner(l, m - 1, id);

                // right
                inner(arr[m], r, id);
            }
        }

        inner(0, arr.length - 1, null);

        return res;
    }


    // let arr = [-1, 1, 1, 1, 1, 1, 9, 9, 9];

    // non-unique example from book:
    let arr = [-9, -5, 2, 2, 2, 3, 4, 7, 9, 12, 13];

    // let arr = [-11, -1, -1, 2, 7, 8, 9, 9, 9, 9, 10, 10, 13, 15, 17, 17, 22];

    // let arr = [-1, 0, 1, 2, 3, 5, 7];

    // let arr = [1, 2, 2, 4, 4, 5];

    // let arr = [-2, -1, 0, 1, 4  , 10, 11];

    // let arr = [1, 2, 2, 4, 4, 6];

    // let arr = [-2, -1, 2, 2, 2, 3, 4, 7, 9, 12, 13];

    let res = magicIndexNotUnique(arr);

    console.log(res);
}
