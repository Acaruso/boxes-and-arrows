function userFunction(logger) {
    function str(arr) {
        let strs = [];
        for (const elt of arr) {
            strs.push(`w: ${elt.width}, h: ${elt.height}, d: ${elt.depth}`);
        }
        return strs.join("\n");
    }

    function boxes(arr) {
        let maxHeight = -1;
        let stack = [];

        function inner(curHeight, parentId) {
            const id = logger.newNode(`curHeight: ${curHeight}\n${str(stack)}`, parentId);

            maxHeight = Math.max(maxHeight, curHeight);

            for (const box of arr) {
                if (box.flag === true && isValid(box, top(stack))) {
                    box.flag = false;
                    stack.push(box);
                    inner(curHeight + box.height, id);
                    stack.pop();
                    box.flag = true;
                }
            }
        }

        inner(0, null);

        return maxHeight;
    }

    // can box1 stack on top of box2
    function isValid(box1, box2) {
        if (box2 === null) {
            return true;
        }

        return (
            box1.width < box2.width
            && box1.height < box2.height
            && box1.depth < box2.depth
        );
    }

    function top(stack) {
        if (stack.length === 0) {
            return null;
        } else {
            return stack[stack.length - 1];
        }
    }

    const boxArr = [
        { width: 1, height: 1, depth: 1, flag: true },
        { width: 2, height: 2, depth: 2, flag: true },
        { width: 3, height: 3, depth: 3, flag: true },
    ];

    const res = boxes(boxArr);

    console.log(res);
}
