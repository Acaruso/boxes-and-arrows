function userFunction(logger) {
    const n = 16;

    function pushStr(str, id) {
        logger.pushString(`\n${str}`, id);
    }

    function pushArr(x, bit, id) {
        let arr = [];
        let colors = [];
        const str = toString(x);
        for (let i = 0; i < str.length; i++) {
            arr.push(" ");
            if (str[i] === "1") {
                colors.push(["blue", i]);
            }
        }
        const labels = [["i", bitToIdx(bit)]];
        logger.pushArray(arr, id, { colors, labels });
    }

    function bitToIdx(bit) {
        let i = 0;
        while (bit !== 0) {
            bit = bit >> 1;
            i++;
        }
        return (n - 1) - (i - 1);
    }

    function toString(x) {
        let str = "";
        let bit = 1;

        for (let i = 0; i < n; i++) {
            if ((x & bit) !== 0) {
                str = "1" + str;
            } else {
                str = "0" + str;
            }
            bit = bit << 1;
        }

        return str;
    }

    function fromString(str) {
        let x = 0;
        let bit = 1;
        for (let i = str.length - 1; i >= 0; i--) {
            if (str[i] === "1") {
                x = x | bit;
            }
            bit = bit << 1;
        }
        return x;
    }

    function log(s, x) {
        console.log(`${s}: \n${toString(x)}`)
    }

    // algo /////////////////////////////////////////////////////

    function getNextLargest(x) {
        let id = logger.newNode("", null);

        let numTrailingZeros = 0;
        let numOnes = 0;
        let bit = 1;

        pushArr(x, 0, id);

        // while ((x & bit) === 0) {
        //     numTrailingZeros++;
        //     bit = bit << 1;
        // }

        // for (
        //     ;
        //     (x & bit) === 0 && bit < (1 << n);
        //     bit = bit << 1
        // ) {
        //     numTrailingZeros++;
        // }

        for (
            let i = 0;
            (x & bit) === 0 && i < n;
            bit = bit << 1, i++
        ) {
            numTrailingZeros++;
        }

        // while ((x & bit) !== 0) {
        //     numOnes++;
        //     bit = bit << 1;
        // }

        for (
            ;
            (x & bit) !== 0 && bit < (1 << n);
            bit = bit << 1
        ) {
            numOnes++;
        }

        if (bit === (1 << n)) {
            return -1;
        }

        x = x | bit;

        x = x & ~(bit - 1);

        let mask = ((1 << (numOnes - 1)) - 1);

        x = x | mask;

        pushArr(x, 0, id);

        return x;
    }

    function getNextSmallest(x) {
        let numTrailingOnes = 0;
        let numZeros = 0;
        let bit = 1;

        while ((x & bit) !== 0) {
            numTrailingOnes++;
            bit = bit << 1;
        }

        while ((x & bit) === 0) {
            numZeros++;
            bit = bit << 1;
        }

        if (bit === (1 << n)) {
            return -1;
        }

        x = x & ~bit;

        x = x & ~(bit - 1);

        let mask = ((1 << (numTrailingOnes + 1)) - 1) << (numZeros - 1);

        x = x | mask;

        return x;
    }

    let x = null;

    x = fromString("0011011001111100");
    let nextLargest = getNextLargest(x);

    log("x", x);
    console.log("nextLargest:");
    console.log(toString(nextLargest));

    console.log("");

    // x = fromString("0010011110000011");
    // let nextSmallest = getNextSmallest(x);
    // log("x", x);
    // console.log("nextSmallest:");
    // console.log(toString(nextSmallest));
}

// testcases from book:

// 0011011001111100
// get next largest:
// 0011011010001111

// 0010011110000011
// get next smallest:
// 0010011101110000
