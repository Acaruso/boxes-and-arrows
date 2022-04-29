function userFunction(logger) {
    function _append(str, id) {
        logger.appendToNode(str, id);
    }

    function _appendArr(arr, id) {
        logger.appendArrayToNode(arr, [], id, []);
    }

    function isEven(x) {
        return x % 2 === 0;
    }

    function swap(arr, i, k, id) {
        _append(`\nswap(${i}, ${k})`, id);
        _append("\nbefore:", id);
        _appendArr(arr, id);

        const temp = arr[i];
        arr[i] = arr[k];
        arr[k] = temp;

        _append("\nafter:", id);
        _appendArr(arr, id);
        _append("\n", id);
    }

    function heap(arr) {
        let out = [];

        function generate(k, parentId) {
            const id = logger.newNode(`k: ${k}`, parentId);
            _append(`\nisEven(${k}) -> ${isEven(k)}`, id);
            _append("\n\n", id);

            if (k === 1) {
                _append("\npush:", id);
                _appendArr(arr, id);
                out.push(arr);
            } else {
                _append(`\ngenerate(${k - 1})\n`, id);
                generate(k - 1, id);
            }

            for (let i = 0; i < k - 1; i++) {
                if (isEven(k)) {
                    swap(arr, i, k - 1, id);
                } else {
                    swap(arr, 0, k - 1, id);
                }
                _append(`\ngenerate(${k - 1})\n`, id);
                generate(k - 1, id);
            }
        }

        generate(arr.length, null);

        return out;
    }

    const arr = [1,2,3,4];
    const res = heap(arr);
    console.log(res);
}
