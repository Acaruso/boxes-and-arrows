function userFunction(logger) {
    function checkSubtree(node1, node2) {
        let s = [];
        s.push(node1);

        while (s.length !== 0) {
            let cur = s.pop();

            if (cur === null) {
                continue;
            }

            if (cur.value === node2.value) {
                const res = compareTrees(cur, node2);
                if (res === true) {
                    return true;
                }
            } else {
                s.push(cur.left);
                s.push(cur.right);
            }
        }

        return false;
    }

    function compareTrees(node1, node2) {
        let s = [];
        s.push([node1, node2]);

        while (s.length !== 0) {
            const [cur1, cur2] = s.pop();

            if (cur1 === null && cur2 === null) {
                continue
            } else if (cur1 === null || cur2 === null) {
                return false;
            } else if (cur1.value !== cur2.value) {
                return false;
            } else {
                s.push([cur1.left, cur2.left]);
                s.push([cur1.right, cur2.right]);
            }
        }

        return true;
    }

    const root1 = {
        value: 1,
        left: {
            value: 2,
            left: {
                value: 4,
                left: null,
                right: null
            },
            right: {
                value: 5,
                left: null,
                right: null
            }
        },
        right: {
            value: 3,
            left: null,
            right: null
        }
    };

    const root2 = {
        value: 2,
        left: {
            value: 4,
            left: null,
            right: null
        },
        right: {
            value: 5,
            left: null,
            right: null
        }
    };

    const res = checkSubtree(root1, root2);
    console.log(res);
}
