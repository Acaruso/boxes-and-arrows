function userFunction(logger) {

    class TreeNode {
        constructor(value, left, right) {
            this.value = value;
            this.left = left;
            this.right = right;
        }
    }
    
    function getHeight(node) {
        if (node === null) {
            return 0
        }

        const leftHeight = getHeight(node.left);
        const rightHeight = getHeight(node.right);

        const curHeight = Math.max(leftHeight, rightHeight);

        return curHeight;
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

    const res = getHeight(root);
    console.log(res);
}

