function userFunction(logger) {
    function __logStr(str, id) {
        logger.appendToNode(`\n${str}`, id);
    }

    function fillArr(arr, n) {
        for (let i = 0; i < n; i++) {
            arr.push(0);
        }
    }

    function fib(n) {
        let arr = [];
        fillArr(arr, n + 1);

        function inner(n, parentId) {
            let id = logger.newNode(`fib(${n})\n`, parentId);

            if (n === 0) {
                __logStr('-> 0', id);
                return 0;
            } else if (n === 1) {
                __logStr('-> 1', id);
                return 1;
            } else if (arr[n] !== 0) {
                __logStr(`-> arr[${n}]`, id);
                return arr[n];
            } else {
                let leftRes = inner(n - 1, id);
                let rightRes = inner(n - 2, id);
                let res = leftRes + rightRes;
                arr[n] = res;
                __logStr(`fib(${n - 1}) -> ${leftRes}`, id);
                __logStr(`fib(${n - 2}) -> ${rightRes}`, id);
                __logStr(`arr[${n}] = ${res}`, id);
                __logStr(`\n-> ${res}`, id);
                return res;
            }
        }

        return inner(n, null);
    }

    let res = fib(5);
    console.log(res);
}
