function userFunction(logger) {
    let str = "\nhello world\ntest";
    let id = logger.newNode("", null);
    logger.appendToNode(str, id);
    logger.appendToNode("\n", id);
    logger.appendToNode("\n", id);
    logger.appendToNode("more test", id);
}

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

    function resToStr(res) {
        return `{ node: ${nodeToStr(res.node)}, isAncestor: ${res.isAncestor} }`;
    }

    function commonAncestor(root, p, q) {
        if (p === q) {
            return p;
        }

        function helper(root, parentId) {
            let id = logger.newNode(`helper(${nodeToStr(root)})`, parentId);

            if (root === null) {
                const res = {
                    node: null,
                    isAncestor: false
                };
                __pushStr(`\n-> ${resToStr(res)}`, id);
                return res;
            } else {
                const leftRes = helper(root.left, id);
                __pushStr(`leftRes = helper(${nodeToStr(root.left)}) \n-> ${resToStr(leftRes)}`, id);
                if (leftRes.isAncestor) {
                    __pushStr(`\n-> ${resToStr(leftRes)}`, id);
                    return leftRes;
                }

                const rightRes = helper(root.right, id);
                __pushStr(`rightRes = helper(${nodeToStr(root.right)}) \n-> ${resToStr(rightRes)}`, id);
                if (rightRes.isAncestor) {
                    __pushStr(`\n-> ${resToStr(rightRes)}`, id);
                    return rightRes;
                }

                if (leftRes.node !== null && rightRes.node !== null) {
                    const res = {
                        node: root,
                        isAncestor: true
                    };
                    __pushStr(`\n-> ${resToStr(res)}`, id);
                    return res;
                } else if (root === p || root === q) {
                    const isAncestor = (leftRes.node !== null || rightRes.node !== null);
                    const res = {
                        node: root,
                        isAncestor
                    };
                    __pushStr(`\n-> ${resToStr(res)}`, id);
                    return res;
                } else {
                    if (leftRes.node !== null) {
                        const res = {
                            node: leftRes.node,
                            isAncestor: false
                        };
                        __pushStr(`\n-> ${resToStr(res)}`, id);
                        return res;
                    } else {
                        const res = {
                            node: rightRes.node,
                            isAncestor: false
                        };
                        __pushStr(`\n-> ${resToStr(res)}`, id);
                        return res;
                    }
                }
            }
        }

        const res = helper(root, null);

        if (res.isAncestor) {
            return res.node;
        } else {
            return null;
        }
    }

    const n1 = { value: 1, left: null, right: null };
    const n2 = { value: 2, left: null, right: null };
    const n3 = { value: 3, left: null, right: null };
    const n4 = { value: 4, left: null, right: null };
    const n5 = { value: 5, left: null, right: null };
    const n6 = { value: 6, left: null, right: null };

    n1.left = n2;
    n1.right = n3;

    n2.left = n4;
    n2.right = n5;

    n3.right = n6;

    const res = commonAncestor(n1, n4, n2);
    console.log(res);
}
