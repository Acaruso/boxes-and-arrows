function userFunction(logger) {
    function checkSubtree(node1, node2) {
        let q = [];
        q.push(node1);

        while (q.length !== 0) {
            let cur = q.shift();

            if (cur === null) {
                break;
            }

            if (cur.value === node2.value) {
                const res = compareTrees(cur, node2);
                if (res === true) {
                    return true;
                }
            } else {
                q.push(cur.left);
                q.push(cur.right);
            }
        }

        return false;
    }

    function compareTrees(node1, node2) {
        let s = [];
        s.push([node1, node2]);

        while (s.length !== 0) {
            const [cur1, cur2] = s.pop();

            if (!compareNodes(cur1, cur2)) {
                return false;
            } else {
                s.push([cur1.left, cur2.left]);
                s.push([cur1.right, cur2.right]);
            }
        }

        return true;
    }

    function compareNodes(node1, node2) {
        const value1 = node1 !== null ? node1.value : null;
        const value2 = node2 !== null ? node2.value : null;
        return value1 === value2;
    }
}
