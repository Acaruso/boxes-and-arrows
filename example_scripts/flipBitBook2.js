function userFunction(logger) {
    const n = 16;

    function toString(x, n) {
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

    function bitToIdx(bit, n) {
        let i = 0;

        while (bit !== 0) {
            bit = bit >> 1;
            i++;
        }

        let res = n - (i - 1);
        console.log("res: " + res);
    }

    function pushStr(str, id) {
        logger.pushString(`\n${str}`, id);
    }

    function pushArr(x, i, id) {
        let arr = [];
        let colors = [];
        const str = toString(x, n);
        for (let i = 0; i < str.length; i++) {
            arr.push(" ");
            if (str[i] === "1") {
                colors.push(["blue", i]);
            }
        }
        const labels = [["i", i]];
        logger.pushArray(arr, id, { colors, labels });
    }

    function flipBit(x) {
        let id = logger.newNode("", null);

        if (~x === 0) {
            return 32;
        }

        let curLen = 0;
        let prevLen = 0;
        let maxLen = 1;
        let bit = 1;

        for (let i = 0; i <= 32; i++) {
            pushArr(x, i, id);

            if ((x & bit) !== 0) {
                curLen++;
            } else if ((x & bit) === 0) {
                if ((x & (bit << 1)) !== 0) {
                    prevLen = curLen;
                } else {
                    prevLen = 0;
                }
                curLen = 0;
            }
            maxLen = Math.max(maxLen, prevLen + curLen + 1);
            bit = bit << 1;
        }

        pushArr(x, id);
        pushStr(`curLen: ${curLen}`, id);
        pushStr(`prevLen: ${prevLen}`, id);
        pushStr(`maxLen: ${maxLen}`, id);
        pushStr(`\n----------------------------------------------\n`, id);

        return maxLen;
    }

    // const x = fromString("011011");
    const x = fromString("111011100111100");
    console.log(flipBit(x));
}
