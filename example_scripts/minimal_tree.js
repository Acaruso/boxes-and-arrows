// given an array where each element is a unique integer, and the array is
// sorted in ascending order,
// create a binary search tree of the data, with minimal height

function makeTree(n) {
    let count = 0;

    let queue = [];
    let root = {};
    queue.push(root);
    count++;

    while (queue.length !== 0) {
        let cur = queue.shift();

        if (count < n) {
            cur.left = {};
            queue.push(cur.left);
            count++;
        }

        if (count < n) {
            cur.right = {};
            queue.push(cur.right);
            count++;
        }
    }

    return root;
}

function userFunction(logger) {
    function minimalTree(arr) {
        const n = arr.length;
        let root = makeTree(n);

        let i = 0;

        function traverse(node) {
            if (node.left) {
                traverse(node.left);
            }

            node.value = arr[i];
            i++;

            if (node.right) {
                traverse(node.right);
            }
        }

        traverse(root);

        // draw tree on screen
        function makeNodes(node, parentId) {
            const id = logger.newNode("" + node.value, parentId);

            if (node.left) {
                makeNodes(node.left, id);
            }

            if (node.right) {
                makeNodes(node.right, id);
            }
        }

        makeNodes(root, null);
    }

    const arr = [1,4,13,16,18,19,33,56,999];
    const res = minimalTree(arr);
}
