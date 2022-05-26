function userFunction(logger) {
    function __logStr(str, id) {
        logger.pushString(`\n${str}`, id);
    }

    function tripleStep(n) {
        let count = 0;

        function f(n, parentId) {
            let id = logger.newNode(`f(${n})`, parentId);
            if (n === 0) {
                __logStr("\ncount++", id)
                count++;
                return;
            }

            f(n - 1, id);
            if (n - 2 >= 0) {
                f(n - 2, id);
            }
            if (n - 3 >= 0) {
                f(n - 3, id);
            }
        }

        f(n, null);
        return count;
    }

    function tripleStepTopDown(n) {
        let dict = {};

        function f(n) {
            if (n === 0) {
                return 1;
            } else if (n in dict) {
                return dict[n];
            } else {
                let res = 0;
                res += f(n - 1);
                if (n - 2 >= 0) {
                    res += f(n - 2);
                }
                if (n - 3 >= 0) {
                    res += f(n - 3);
                }
                dict[n] = res;
                return res;
            }

        }

        return f(n);
    }

    function tripleStepBottomUp(n) {
        let dict = {};
        dict[0] = 1;
        dict[1] = 1;
        dict[2] = 2;
        dict[3] = 4;

        if (n <= 3) {
            return dict[n];
        } else {
            for (let i = 4; i <= n; i++) {
                dict[i] = dict[i - 1] + dict[i - 2] + dict[i - 3];
            }

            return dict[n];
        }
    }

    let res = tripleStep(4);
    console.log(res);
}
