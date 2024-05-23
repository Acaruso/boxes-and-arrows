function userFunction(logger) {
    function findMaxSubarray(arr, id) {
        function f(i, considerElt, parentId) {
            const id = logger.newNode(`f(${i}, ${considerElt})`, parentId);

            if (i >= arr.length) {
                logger.pushString(`\nbase case`, id);
                if (considerElt) {
                    logger.pushString(`\n-> 0`, id);
                    return 0;
                } else {
                    logger.pushString(`\n-> -9999999`, id);
                    return -9999999;
                }
            }

            logger.pushString(`\ncur elt: ${arr[i]}`, id);

            if (considerElt) {
                const maxArg1_1 = arr[i];
                const maxArg1_2 = f(i + 1, true, id);
                logger.pushString(`\nf(${i + 1}, true) -> ${maxArg1_2}`, id);
                const maxArg2 = 0;
                logger.pushString(`\nMath.max(${maxArg1_1} + ${maxArg1_2}, ${maxArg2})`, id);
                const res = Math.max(maxArg1_1 + maxArg1_2, maxArg2);
                logger.pushString(`\n-> ${res}`, id);
                return res;
            } else {
                const maxArg1_1 = arr[i];
                const maxArg1_2 = f(i + 1, true, id);
                const maxArg2 = f(i + 1, false, id);
                logger.pushString(`\nf(${i + 1}, true) -> ${maxArg1_2}`, id);
                logger.pushString(`\nf(${i + 1}, false) -> ${maxArg2}`, id);
                logger.pushString(`\nMath.max(${maxArg1_1} + ${maxArg1_2}, ${maxArg2})`, id);
                const res = Math.max(maxArg1_1 + maxArg1_2, maxArg2);
                logger.pushString(`\n-> ${res}`, id);
                return res;
            }
        }

        return f(0, false, id);
    }

    const id = logger.newNode("", null);

    const arr = [1,4,-100,2,6];
    // const arr = [1,4,2,2];
    // const arr = [-1,-4,-2];

    const res = findMaxSubarray(arr, id);

    console.log("res: " + res);
}
