function userFunction(logger) {
    function str(box) {
        if (box === null) {
            return "null";
        } else {
            return `{w: ${box.width}, h: ${box.height}, d: ${box.depth}}`;
        }
    }

    // function createStack(boxes) {
    //     boxes.sort((a, b) => b.height - a.height);
    //     let cache = new Array(boxes.length).fill(-1);

    //     function inner(height, prevBoxIdx, parentId) {
    //         const prevBox = prevBoxIdx === -1 ? null : boxes[prevBoxIdx];
    //         const id = logger.newNode(
    //             `height: ${height}\nprevBoxIdx: ${prevBoxIdx}\nprevBox: ${str(prevBox)}\n`,
    //             parentId
    //         );

    //         if (prevBoxIdx !== -1 && cache[prevBoxIdx] !== -1) {
    //             logger.pushLine(`cache hit`, id);
    //             logger.pushLine(`-> ${cache[prevBoxIdx]}`, id);
    //             return cache[prevBoxIdx];
    //         }

    //         let curMax = height;

    //         for (let i = prevBoxIdx + 1; i < boxes.length; i++) {
    //             const box = boxes[i];
    //             if (isValid(boxes, i, prevBoxIdx)) {
    //                 logger.pushLine(`adding box: ${str(box)}`, id);
    //                 const res = inner(height + box.height, i, id);
    //                 logger.pushLine(`inner(${height + box.height}, ${i}) -> ${res}`, id);
    //                 curMax = Math.max(curMax, res);
    //             }
    //         }

    //         // logger.pushLine(`cache[${prevBoxIdx}] = ${curMax}`, id);
    //         // cache[prevBoxIdx] = curMax;

    //         logger.pushLine(`cache[${prevBoxIdx}] = ${curMax}`, id);
    //         cache[prevBoxIdx] = curMax;

    //         logger.pushLine(`\n-> ${curMax}`, id);
    //         return curMax;
    //     }

    //     return inner(0, -1, null);
    // }

    function createStack(boxes) {
        boxes.sort((a, b) => b.height - a.height);
        let cache = new Array(boxes.length).fill(-1);

        function inner(prevBoxIdx, parentId) {
            const prevBox = prevBoxIdx === -1 ? null : boxes[prevBoxIdx];
            const id = logger.newNode(
                `prevBoxIdx: ${prevBoxIdx}\nprevBox: ${str(prevBox)}\n`,
                parentId
            );

            if (prevBoxIdx !== -1 && cache[prevBoxIdx] !== -1) {
                logger.pushLine(`cache hit`, id);
                logger.pushLine(`-> ${cache[prevBoxIdx]}`, id);
                return cache[prevBoxIdx];
            }

            let curMax = 0;

            for (let i = prevBoxIdx + 1; i < boxes.length; i++) {
                const box = boxes[i];
                if (isValid(boxes, i, prevBoxIdx)) {
                    logger.pushLine(`adding box: ${str(box)}`, id);
                    let res = inner(i, id);
                    logger.pushLine(`inner(${i}) -> ${res}`, id);
                    logger.pushLine(`res = ${res} + ${box.height}`, id);
                    res += box.height;

                    curMax = Math.max(curMax, res);
                }
            }

            // logger.pushLine(`cache[${prevBoxIdx}] = ${curMax}`, id);
            // cache[prevBoxIdx] = curMax;

            logger.pushLine(`cache[${prevBoxIdx}] = ${curMax}`, id);
            cache[prevBoxIdx] = curMax;

            logger.pushLine(`\n-> ${curMax}`, id);
            return curMax;
        }

        return inner(-1, null);
    }

    // can boxes[idx1] be on top of boxes[idx2]
    function isValid(boxes, idx1, idx2) {
        if (idx2 === -1) {
            return true;
        }

        const box1 = boxes[idx1];
        const box2 = boxes[idx2];

        return (
            box1.width < box2.width
            && box1.height < box2.height
            && box1.depth < box2.depth
        );
    }

    // const boxArr = [
    //     { width: 1, height: 1, depth: 1 },
    //     { width: 2, height: 2, depth: 2 },
    //     { width: 3, height: 3, depth: 3 },
    // ];

    const boxArr = [
        { width: 1, height: 1, depth: 1 },
        { width: 2, height: 2, depth: 2 },
        { width: 3, height: 3, depth: 3 },
        { width: 4, height: 4, depth: 4 },
        { width: 2, height: 5, depth: 2 },
        { width: 1, height: 3, depth: 3 },
        { width: 5, height: 2, depth: 1 },
    ];

    const res = createStack(boxArr);
    console.log(res);
}
