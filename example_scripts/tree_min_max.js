function userFunction(logger) {

    class TreeNode {
        constructor(value, left, right) {
            this.value = value;
            this.left = left;
            this.right = right;
        }
    }

    const root = new TreeNode(
        1,
        new TreeNode(
            2,
            new TreeNode(4, null, null),
            new TreeNode(5, null, null)
        ),
        new TreeNode(
            3,
            new TreeNode(
                6,
                null,
                null
            ),
            null
        )
    );

    function minMax(node, parentId) {
        if (node === null) {
            logger.newNode(`minMax(null)\n\n-> 0`, parentId);
            return null;
        }

        const id = logger.newNode(`minMax(${node.value})\n\n`, parentId);

        const leftRes = minMax(node.left, id);
        logger.appendToNode(`minMax(node.left) -> ${JSON.stringify(leftRes)}\n`, id);
        
        const rightRes = minMax(node.right, id);
        logger.appendToNode(`minMax(node.right) -> ${JSON.stringify(rightRes)}\n`, id);

        const curMin = getMin(node, leftRes, rightRes);
        const curMax = getMax(node, leftRes, rightRes);

        const res = { min: curMin, max: curMax };
        logger.appendToNode(`\n-> ${JSON.stringify(res)}`, id);

        return res;
    }

    function getMin(node, leftRes, rightRes) {
        let arr = [node.value];
        if (leftRes) {
            arr.push(leftRes.min);
        }
        if (rightRes) {
            arr.push(rightRes.min);
        }
        return Math.min(...arr);
    }

    function getMax(node, leftRes, rightRes) {
        let arr = [node.value];
        if (leftRes) {
            arr.push(leftRes.max);
        }
        if (rightRes) {
            arr.push(rightRes.max);
        }
        return Math.max(...arr);
    }

    const res = minMax(root, null);

    console.log(res);
}

