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
        console.log(`${s}: \n${toString(x)}\n`)
    }

    function getNextSmallest(n) {
        let id = logger.newNode("", null);

        let temp = n;
        let numZeros = 0;
        let numTrailingOnes = 0;

        while (temp & 1 === 1) {
            numTrailingOnes++;
            temp = temp >> 1;
        }

        if (temp === 0) {
            return -1;
        }

        while (((temp & 1) === 0) && (temp !== 0)) {
            numZeros++;
            temp = temp >> 1;
        }

        let bitToFlip = numZeros + numTrailingOnes;

        pushStr("bitToFlip: " + bitToFlip, id);

        pushArr(n, 0, id);

        // let mask1 = ((~0) << (bitToFlip + 1));
        let mask1 = ~((1 << (bitToFlip + 1)) - 1);

        n = n & mask1;

        pushStr("mask1:", id);
        pushArr(mask1, 0, id);
        pushArr(n, 0, id);

        let mask = (1 << (numTrailingOnes + 1)) - 1;

        pushArr(mask, 0, id);

        n = n | mask << (numZeros - 1);

        pushArr(n, 0, id);

        return n;
    }

    // let s = "1111100000111000";
    let s = "10011110000011";
    let x = fromString(s);

    let nextSmallest = getNextSmallest(x);
    log("nextSmallest", nextSmallest);

    // let nextLargest = getNextLargest(x);
    // log("nextLargest", nextLargest);
}

// testcases from book:

// 0010011110000011
// get next smallest:
// 0010011101110000

// 0011011001111100
// get next largest:
// 0011011010001111
