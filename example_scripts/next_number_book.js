function userFunction(logger) {
    const n = 16;

    function pushStr(str, id) {
        logger.pushString(`\n ${str}`, id);
    }

    function pushArr(x, id) {
        let arr = [];
        let colors = [];
        const str = toString(x);
        for (let i = 0; i < str.length; i++) {
            arr.push(" ");
            if (str[i] === "1") {
                colors.push(["dark blue", i]);
            }
        }
        logger.pushArray(arr, id, { colors, reverseIndex: true });
        logger.pushString("\n", id);
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

    // algo /////////////////////////////////////////////////////////

    function getNextSmallest(n) {
        let id = logger.newNode("", null);
        pushStr("n:", id);
        pushArr(n, id);

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

        let bitToFlip = numTrailingOnes + numZeros;

        pushStr("1 << bitToFlip:", id);
        pushArr(1 << bitToFlip, id);

        let zeroMask = -1 << (bitToFlip + 1);

        pushStr("zeroMask:", id);
        pushArr(zeroMask, id);

        n = n & zeroMask;

        pushStr("n & zeroMask:", id);
        pushArr(n, id);

        let oneMask = ~(-1 << (numTrailingOnes + 1)) << (numZeros - 1);

        pushStr("oneMask:", id);
        pushArr(oneMask, id);

        n = n | oneMask;

        pushStr("n | oneMask:", id);
        pushArr(n, id);

        return n;
    }

    function getNextLargest(n) {
        let id = logger.newNode("", null);
        pushStr("n:", id);
        pushArr(n, id);

        let temp = n;
        let numTrailingZeros = 0;
        let numOnes = 0;

        while ((temp & 1) === 0 && (temp !== 0)) {
            numTrailingZeros++;
            temp = temp >> 1;
        }

        while (((temp & 1) !== 0)) {
            numOnes++;
            temp = temp >> 1;
        }

        if (temp === 0) {
            return -1;
        }

        let bitToFlip = numTrailingZeros + numOnes;

        pushStr("1 << bitToFlip:", id);
        pushArr(1 << bitToFlip, id);

        n = n | (1 << bitToFlip);

        pushStr("n | bitToFlip:", id);
        pushArr(n, id);

        let zeroMask = -1 << bitToFlip;

        pushStr("zeroMask:", id);
        pushArr(zeroMask, id);

        n = n & zeroMask;

        pushStr("n & zeroMask:", id);
        pushArr(n, id);

        let oneMask = ~(-1 << (numOnes - 1));

        pushStr("oneMask:", id);
        pushArr(oneMask, id);

        n = n | oneMask;

        pushStr("n | oneMask:", id);
        pushArr(n, id);

        return n;
    }

    function getNextSmallestOptimizedMine(n) {
        let id = logger.newNode("", null);

        pushStr("n:", id);
        pushArr(n, id);

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

        let bitToFlip = numTrailingOnes + numZeros;

        let bitToFlipOne = 1 << bitToFlip

        pushStr("bitToFlipOne", id);
        pushArr(bitToFlipOne, id);

        let sub = (bitToFlipOne >> (numTrailingOnes + 1)) | ~(-1 << numTrailingOnes);

        n = n - sub;

        pushStr("(bitToFlipOne >> (numTrailingOnes + 1)) | ~(-1 << numTrailingOnes)", id);
        pushArr((bitToFlipOne >> (numTrailingOnes + 1)) | ~(-1 << numTrailingOnes), id);

        pushStr("n - sub:", id);
        pushArr(n, id);

        return n;
    }

    function getNextSmallestOptimized(n) {
        let n_ = n;

        let id = logger.newNode("", null);
        pushStr("n:", id);
        pushArr(n, id);

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

        pushStr("-(1 << numTrailingOnes)", id);
        pushArr(-(1 << numTrailingOnes), id);

        pushStr("-(1 << (numZeros - 1)) + 1", id);
        pushArr(-(1 << (numZeros - 1)) + 1, id);

        let sub = -(1 << numTrailingOnes) - (1 << (numZeros - 1)) + 1;

        pushStr(`sub: ${sub}`, id);

        n = n + sub;

        pushStr("(1 << numTrailingOnes) - ((1 << numZeros - 1)) + 1:", id);
        pushArr(sub, id);

        pushStr("n:", id);
        pushArr(n_, id);

        pushStr("n + sub:", id);
        pushArr(n, id);

        return n;
    }

    function getNextLargestOptimized(n) {
        let id = logger.newNode("", null);
        pushStr("n:", id);
        pushArr(n, id);

        let temp = n;
        let numTrailingZeros = 0;
        let numOnes = 0;

        while ((temp & 1) === 0 && (temp !== 0)) {
            numTrailingZeros++;
            temp = temp >> 1;
        }

        while (((temp & 1) !== 0)) {
            numOnes++;
            temp = temp >> 1;
        }

        if (temp === 0) {
            return -1;
        }

        pushStr("(1 << numOnes - 1) + ~(-1 << numTrailingZeros)", id);
        pushArr((1 << numOnes - 1) + ~(-1 << numTrailingZeros), id);

        pushStr("n", id);
        pushArr(n, id);

        n = n + (1 << numOnes - 1) + ~(-1 << numTrailingZeros);

        pushStr("n + (1 << numOnes - 1) + ~(-1 << numTrailingZeros)", id);
        pushArr(n, id);

        return n;
    }

    let x = null;

    x = fromString("10011110000011");
    // let nextSmallest = getNextSmallest(x);
    let nextSmallest = getNextSmallestOptimized(x);
    // let nextSmallest = getNextSmallestOptimizedMine(x);

    // x = fromString("0011011001111100");
    // let nextLargest = getNextLargest(x);
    // let nextLargest = getNextLargestOptimized(x);
}

// testcases from book:

// 0010011110000011
// get next smallest:
// 0010011101110000

// 0011011001111100
// get next largest:
// 0011011010001111
