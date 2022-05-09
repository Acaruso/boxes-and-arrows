function userFunction(logger) {
    function __logStr(str, id) {
        logger.appendToNode(`\n${str}`, id);
    }

    class TreeNode {
        constructor(value, left, right) {
            this.value = value;
            this.left = left;
            this.right = right;
        }
    }

    function countSums(root, targetSum) {
        let pathCount = {};

        function inner(node, runningSum, parentId) {
            let s = `node: ${node ? node.value : 'null'}\n`;
            let id = logger.newNode(s, parentId);

            if (node === null) {
                __logStr(`-> 0`, id);
                return 0;
            }

            __logStr(`pathCount: ${JSON.stringify(pathCount)}`, id);

            runningSum += node.value;

            __logStr(`runningSum: ${runningSum}`, id);

            let sub = runningSum - targetSum;

            __logStr(`sub: ${sub}`, id);

            let totalPaths = get(pathCount, sub, 0);

            __logStr(`totalPaths = get(pathCount, ${sub}) -> ${totalPaths}`, id);

            if (runningSum === targetSum) {
                __logStr(`\ntotalPaths++`, id);
                totalPaths++;
            }

            increment(pathCount, runningSum);

            __logStr(`\nincrement(pathCount, ${runningSum})`, id);
            __logStr(`pathCount: ${JSON.stringify(pathCount)}`, id);

            const leftRes = inner(node.left, runningSum, id);
            __logStr(`\ninner(node.left, ${runningSum}) -> ${leftRes}`, id);
            const rightRes = inner(node.right, runningSum, id);
            __logStr(`inner(node.right, ${runningSum}) -> ${rightRes}`, id);

            totalPaths += leftRes + rightRes;

            decrement(pathCount, runningSum);

            __logStr(`\ndecrement(pathCount, ${runningSum})`, id);
            __logStr(`pathCount: ${JSON.stringify(pathCount)}`, id);

            __logStr(`\n-> ${totalPaths}`, id);
            return totalPaths;
        }

        return inner(root, 0, null);
    }

    function get(dict, key, default_) {
        return key in dict ? dict[key] : default_;
    }

    // function update(dict, key, delta) {
    //     let newCount = get(dict, key, 0) + delta;
    //     if (newCount === 0) {
    //         delete dict[key];
    //     } else {
    //         dict[key] = newCount;
    //     }
    // }

    function increment(dict, key) {
        let newCount = get(dict, key, 0) + 1;
        dict[key] = newCount;
    }

    function decrement(dict, key) {
        let newCount = get(dict, key, 0) - 1;
        if (newCount === 0) {
            delete dict[key];
        } else {
            dict[key] = newCount;
        }
    }

    let root = new TreeNode(
        7,
        new TreeNode(
            3,
            new TreeNode(0, null, null),
            new TreeNode(2, null, null)
        ),
        new TreeNode(
            1,
            new TreeNode(3, null, null),
            new TreeNode(
                2,
                new TreeNode(8, null, null),
                null
            )
        )
    );

    let res = countSums(root, 10);

    console.log(res);
}
