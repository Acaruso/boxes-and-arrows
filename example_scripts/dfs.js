function userFunction(logger) {
    let nextId = 0;

    function drawTree(node) {
        let stack = [];
        stack.push([node, null]);

        while (stack.length > 0) {
            let [cur, parentId] = stack.pop();
            let id = logger.newNode(`${cur.value}`, parentId);

            for (let i = cur.children.length - 1; i >= 0; i--) {
                const child = cur.children[i];
                if (child.visited === false) {
                    child.visited = true;
                    stack.push([child, id]);
                }
            }
        }
    }

    function dfs(node) {
        let stack = [];
        stack.push([node, null]);

        while (stack.length > 0) {
            const da = stack.map(([elt, _]) => elt.value);
            console.log(da);
            let [cur, parentId] = stack.pop();
            let id = logger.newNode(`visiting: ${cur.value}`, parentId);
            logger.appendArrayToNode(da, [], id);

            for (const child of cur.children) {
                if (child.visited === false) {
                    child.visited = true;
                    stack.push([child, id]);
                }
            }
        }
    }

    function makeDisplayArr(stack) {
        return stack.map(elt => elt.value);
    }

    let root = makeNode([
        makeNode([
            makeNode(),
            makeNode()
        ]),
        makeNode()
    ]);

    dfs(root);
    // drawTree(root);

    function makeNode(children=[]) {
        const res = {
            value: nextId,
            visited: false,
            children: children
        };
        nextId++;
        return res;
    }
}
