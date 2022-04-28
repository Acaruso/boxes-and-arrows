function userFunction(logger) {

    function isEven(x) {
        return x % 2 === 0;
    }

    function swap(arr, i, k) {
        const temp = arr[i];
        arr[i] = arr[k];
        arr[k] = temp;
    }

    function heap(arr) {
        let out = [];

        function generate(k, parentId) {
            const id = logger.newNode(`k: ${k}`, parentId);
            logger.appendArrayToNode(arr, [], id, []);

            if (k === 1) {
                out.push(arr);
            } else {
                logger.appendToNode(`\ngenerate(${k - 1})`, id);
                generate(k - 1, id);
            }

            for (let i = 0; i < k - 1; i++) {
                if (isEven(k)) {
                    logger.appendToNode(`\nswap(${i}, ${k - 1})`, id);
                    swap(arr, i, k - 1);
                    logger.appendArrayToNode(arr, [], id, []);
                } else {
                    logger.appendToNode(`\nswap(${0}, ${k - 1})`, id);
                    swap(arr, 0, k - 1);
                    logger.appendArrayToNode(arr, [], id, []);
                }
                logger.appendToNode(`\ngenerate(${k - 1})`, id);
                generate(k - 1, id);
            }
        }

        generate(arr.length, null);

        return out;
    }

    const arr = [1,2,3];
    const res = heap(arr);
    console.log(res);
}
