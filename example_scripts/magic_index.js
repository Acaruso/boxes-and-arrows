function userFunction(logger) {
    function magicIndex(arr) {
        function inner(l, r, parentId) {
            let id = logger.newNode(`inner(${l}, ${r})`, parentId);

            if (l > r) {
                return -1;
            }

            let midIdx = Math.floor((l + r) / 2);
            let midElt = arr[midIdx];

            logger.pushArray(
                arr,
                id,
                { labels: [["l", l], ["r", r], ["m", midIdx]] }
            );

            if (midElt === midIdx) {
                logger.pushLine(`found: ${midIdx}`, id);
                return midIdx;
            }

            let leftIdx = Math.min(midIdx - 1, midElt);
            let left = inner(l, leftIdx, id);
            if (left >= 0) {
                return left;
            }

            let rightIdx = Math.max(midIdx + 1, midElt);
            let right = inner(rightIdx, r, id);

            return right;
        }

        return inner(0, arr.length - 1, null);
    }

    // let arr = [-1, 1, 1, 1, 1, 1, 9, 9, 9];
    let arr = [-9, -5, 2, 2, 2, 3, 4, 7, 9, 12, 13];

    let res = magicIndex(arr);

    console.log(res);
}
