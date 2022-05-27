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

    function flipBit(x) {
        let id = logger.newNode("", null);

        if (~x === 0) {
            return n;
        }

        let curLen = 0;
        let prevLen = 0;
        let maxLen = 1;
        let bit = 1;

        for (let i = 0; i < n; i++) {
            pushStr("--------------------------------------------------------------------", id);
            pushArr(x, bit, id);

            if ((x & bit) !== 0) {
                curLen++;
                pushStr("curLen++", id);
                pushStr(`curLen: ${curLen}`, id);
            } else if ((x & bit) === 0) {
                if ((x & (bit << 1)) !== 0) {
                    prevLen = curLen;
                    pushStr("prevLen = curLen", id)
                    pushStr(`prevLen: ${prevLen}`, id);
                } else {
                    prevLen = 0;
                    pushStr("prevLen = 0", id);
                }

                curLen = 0;
                pushStr("curLen = 0", id);
            }
            maxLen = Math.max(maxLen, prevLen + curLen + 1);
            bit = bit << 1;
        }

        return maxLen;
    }

    const x = fromString("111011100111100");
    const res = flipBit(x);
}
