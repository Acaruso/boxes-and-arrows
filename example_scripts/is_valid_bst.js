function userFunction(logger) {

    class TreeNode {
        constructor(value, left, right) {
            this.value = value;
            this.left = left;
            this.right = right;
        }
    }

    function isValidBST(node) {
        let isValid = true;

        function inner(node, parentId) {
            if (node === null) {
                logger.newNode(`isValidBST(null)\n\n-> null`, parentId);
                return null;
            }

            const id = logger.newNode(`isValidBST(${node.value})\n\n`, parentId);

            const leftRes = inner(node.left, id);
            logger.appendToNode(`isValidBST(node.left) -> ${JSON.stringify(leftRes)}\n`, id);
            
            const rightRes = inner(node.right, id);
            logger.appendToNode(`isValidBST(node.right) -> ${JSON.stringify(rightRes)}\n`, id);

            const curMin = getMin(node, leftRes, rightRes);
            const curMax = getMax(node, leftRes, rightRes);

            const isLeftValid = leftRes === null || node.value >= leftRes.max;
            const isRightValid = rightRes === null || node.value < rightRes.min;

            isValid = isLeftValid && isRightValid;
            logger.appendToNode(`isValid: ${isValid}\n`, id);

            const res = { min: curMin, max: curMax };
            logger.appendToNode(`\n-> ${JSON.stringify(res)}`, id);

            return res;
        }

        inner(node, null);
        return isValid;
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

    // invalid
    // const root = new TreeNode(
    //     1,
    //     new TreeNode(
    //         2,
    //         new TreeNode(4, null, null),
    //         new TreeNode(5, null, null)
    //     ),
    //     new TreeNode(
    //         3,
    //         new TreeNode(
    //             6,
    //             null,
    //             null
    //         ),
    //         null
    //     )
    // );

    // valid
    const root = new TreeNode(
        10,
        new TreeNode(
            5,
            new TreeNode(4, null, null),
            new TreeNode(6, null, null)
        ),
        new TreeNode(
            15,
            new TreeNode(
                11,
                null,
                null
            ),
            null
        )
    );

    const res = isValidBST(root, null);

    console.log(res);
}

