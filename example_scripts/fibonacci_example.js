function userFunction(logger) {

    function fib(n, parentId) {
        var id = logger.newNode("fib(" + n + ")", parentId);
        var res = 0;
        if (n === 0) {
            res = 0;
        } else if (n === 1) {
            res = 1;
        } else {
            res = fib(n - 1, id) + fib(n - 2, id);
        }
        logger.appendToNode(" -> " + res, id);
        return res;
    }

    fib(6, null);
}
