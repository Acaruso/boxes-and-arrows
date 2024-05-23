function userFunction(logger) {
    const id = logger.newNode(" ", null);

    function sortColors(arr) {
        let a = 0;
        let b = 0
        let c = arr.length - 1;

        logArray(arr, a, b, c);

        while (b <= c) {
            if (arr[b] === "a") {
                logger.pushString("\nswap(arr, a, b)", id);
                logger.pushString("\na++", id);
                logger.pushString("\nb++", id);
                swap(arr, a, b);
                a++;
                b++;
            } else if (arr[b] === "b") {
                logger.pushString("\nb++", id);
                b++;
            } else {  // arr[b] === "c"
                logger.pushString("\nswap(arr, b, c)", id);
                logger.pushString("\nc--", id);
                swap(arr, b, c);
                c--
            }

            logArray(arr, a, b, c);
        }
    }

    function swap(arr, i, k) {
        const temp = arr[i];
        arr[i] = arr[k];
        arr[k] = temp;
    }

    function logArray(arr, a, b, c) {
        const labels = getLabels(a, b, c);
        logger.pushArray(arr, id, { labels })
    }

    function getLabels(a, b, c) {
        return [["a", a], ["b", b], ["c", c]];
    }

    function printArr(arr) {
        console.log(arr.join(", "));
    }

    function test1() {
        // const arr = ["a","b","c","b","c","c","b","a","b","c","b"];
        const arr = "baabccbc".split("");
        sortColors(arr);
    }

    test1();
}




















