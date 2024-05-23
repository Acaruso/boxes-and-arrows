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

    function getHeight(node, parentId) {
        if (node === null) {
            const id = logger.newNode(`getHeight(null)\n\n-> -1`, parentId);
            return -1;
        }

        const id = logger.newNode(`getHeight(${node.value})\n\n`, parentId);

        const leftHeight = getHeight(node.left, id);
        logger.pushString(`getHeight(node.left) -> ${leftHeight}\n`, id);

        const rightHeight = getHeight(node.right, id);
        logger.pushString(`getHeight(node.right) -> ${rightHeight}\n`, id);

        const curHeight = Math.max(leftHeight, rightHeight) + 1;

        logger.pushString(`\ncurHeight = max(${leftHeight}, ${rightHeight}) + 1 -> ${curHeight}\n`, id);

        logger.pushString(`\n-> ${curHeight}`, id);

        return curHeight;
    }

    // function getHeight(node, parentId) {
    //     const id = logger.newNode(`getHeight(${node.value})\n\n`, parentId);

    //     const leftRes = node.left ? getHeight(node.left, id) : 0;
    //     const rightRes = node.right ? getHeight(node.right, id) : 0;

    //     const res = Math.max(leftRes, rightRes) + 1;
    //     logger.pushString(`-> ${res}`, id);
    //     return res;
    // }

    const res = getHeight(root, null);

    console.log(res);
}

