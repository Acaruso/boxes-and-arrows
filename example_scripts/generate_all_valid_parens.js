function userFunction(logger) {
    function generateAllValidParens(n) {
        let out = [];

        function inner(str, numOpen, numClosed, parentId) {
            let id = logger.newNode(str, parentId);

            if (str.length === (n * 2)) {
                out.push(str);
                return;
            }

            if (numOpen < n) {
                inner(
                    str + "(",
                    numOpen + 1,
                    numClosed,
                    id
                );
            }

            if (numOpen > numClosed) {
                inner(
                    str + ")",
                    numOpen,
                    numClosed + 1,
                    id
                );
            }
        }

        inner("", 0, 0, null);

        return out;
    }

    const n = 3;
    const res = generateAllValidParens(n);
    console.log(res);
}
