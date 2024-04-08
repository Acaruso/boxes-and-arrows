function userFunction(logger) {
    const n = 16;

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

    function bitToIdx(bit) {
        let i = 0;
        while (bit !== 0) {
            bit = bit >> 1;
            i++;
        }
        return (n - 1) - (i - 1);
    }

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

    // algo //////////////////////////////////////////////////

    function flipBit(x) {
        let id = logger.newNode("", null);

        if (~x === 0) {
            return 32;
        }

        let insideSegment = false;
        let prevLen = 0;
        let curLen = 0;
        let maxLen = 1;
        let bit = 1;

        for (let i = 0; i < n; i++) {
            pushArr(x, bit, id);

            if ((x & bit) !== 0) {
                curLen++;
                insideSegment = true;
                pushStr("insideSegment = true", id);
                pushStr("curLen++", id);
            } else if ((x & bit) === 0) {
                if (insideSegment === true) {
                    maxLen = Math.max(maxLen, prevLen + curLen + 1);
                    pushStr("maxLen = Math.max(maxLen, prevLen + curLen + 1)", id);
                }

                insideSegment = false;
                prevLen = curLen;
                curLen = 0;
                pushStr("insideSegment = false", id);
                pushStr("prevLen = curLen", id);
                pushStr("curLen = 0", id);
            }

            pushStr(`prevLen: ${prevLen}`, id);
            pushStr(`curLen: ${curLen}`, id);

            bit = bit << 1;
        }

        maxLen = Math.max(maxLen, prevLen + curLen + 1);
        pushStr(`maxLen: ${maxLen}`, id);
        return maxLen;
    }

    // const x = fromString("011011");
    const x = fromString("11011100111100");
    console.log(flipBit(x));
}
