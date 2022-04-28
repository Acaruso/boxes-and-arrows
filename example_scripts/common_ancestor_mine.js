function userFunction(logger) {
    function __pushStr(str, id) {
        logger.appendToNode(`\n${str}`, id);
    }

    function nodeToStr(node) {
        if (node === null) {
            return "null";
        } else {
            return `${node.value}`;
        }
    }

    function commonAncestor(root, p, q) {
        if (p === q) {
            return p;
        }

        let commAn = null;

        function helper(root, parentId) {
            let id = logger.newNode(`helper(${nodeToStr(root)})`, parentId);

            if (commAn !== null) {
                __pushStr(`commAn !== null`, id);
                __pushStr(`\n-> false`, id);
                return false;
            }

            if (root === null) {
                __pushStr(`\n-> false`, id);
                return false;
            }

            const leftRes = helper(root.left, id);
            __pushStr(`leftRes = helper(${nodeToStr(root.left)}) \n-> ${leftRes}`, id);

            const rightRes = helper(root.right, id);
            __pushStr(`rightRes = helper(${nodeToStr(root.right)}) \n-> ${rightRes}`, id);

            const sawLeftAndRight = leftRes && rightRes;
            const sawLeftOrRight = leftRes || rightRes;
            const isRootPOrQ = root === p || root === q;

            if ((sawLeftAndRight || (sawLeftOrRight && isRootPOrQ)) && commAn === null) {
                // __pushStr(`commAn = ${root.value}`, id);
                commAn = root;
                __pushStr(`\n-> true`, id);
                return true;
            } else {
                __pushStr(`\n-> ${sawLeftOrRight || isRootPOrQ}`, id);
                return sawLeftOrRight || isRootPOrQ;
            }
        }

        helper(root, null);
        return commAn;
    }

    const n1 = { value: 1, left: null, right: null };
    const n2 = { value: 2, left: null, right: null };
    const n3 = { value: 3, left: null, right: null };
    const n4 = { value: 4, left: null, right: null };
    const n5 = { value: 5, left: null, right: null };
    const n6 = { value: 6, left: null, right: null };
    const n7 = { value: 7, left: null, right: null };

    n1.left = n2;
    n1.right = n3;
    n2.left = n4;
    n2.right = n5;
    n3.right = n6;

    // n1.left = n2;
    // n1.right = n3;
    // n3.right = n4;
    // n4.left = n6;
    // n4.right = n5;
    // n6.left = n7;

    const res = commonAncestor(n1, n4, n6);
    console.log(res);
}
