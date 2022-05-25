function userFunction(logger) {
    function toString(x) {
        let str = "";
        while (x !== 0) {
            if ((x & 1) === 1) {
                str = "1" + str;
            } else {
                str = "0" + str;
            }
            x = x >> 1;
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

    function pushStr(str, id) {
        logger.appendToNode(`\n${str}`, id);
    }

    function pushArr(x, id) {
        let arr = [];
        let colors = [];
        const str = toString(x);
        for (let i = 0; i < str.length; i++) {
            arr.push(str[i]);
            if (str[i] === "1") {
                colors.push(["blue", i]);
            }
        }
        logger.appendArrayToNode(arr, [], id, colors);
    }

    function flipBit(x) {
        let id = logger.newNode("", null);

        if (~x === 0) {
            return 32;
        }

        let curLen = 0;
        let prevLen = 0;
        let maxLen = 1;

        pushArr(x, id);
        pushStr(`curLen: ${curLen}`, id);
        pushStr(`prevLen: ${prevLen}`, id);
        pushStr(`maxLen: ${maxLen}`, id);
        pushStr(`\n----------------------------------------------\n`, id);

        while (x !== 0) {
            pushArr(x, id);

            if ((x & 1) === 1) {
                curLen++;
            } else if ((x & 1) === 0) {
                if ((x & 2) === 2) {
                    prevLen = curLen;
                } else {
                    prevLen = 0;
                }
                curLen = 0;
            }
            maxLen = Math.max(maxLen, prevLen + curLen + 1);
            x = x >> 1;


            pushStr(`curLen: ${curLen}`, id);
            pushStr(`prevLen: ${prevLen}`, id);
            pushStr(`maxLen: ${maxLen}`, id);
            pushStr(`\n----------------------------------------------\n`, id);
        }

        return maxLen;
    }

    // const x = fromString("011011");
    const x = fromString("111011100111100");
    console.log(flipBit(x));
}
