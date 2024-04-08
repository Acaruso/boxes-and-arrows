function userFunction(logger) {
    function log(node, arr, choices, parentId) {
        const id = logger.newNode(`inner(${node.value})`, parentId);
        logArr(arr, id);
        logChoices(choices, id);
        logger.pushLine("", id);
        return id;
    }

    function logArr(arr, id) {
        logger.pushLine(`arr: ${arrToStr(arr)}`, id);
    }

    function logChoices(choices, id) {
        logger.pushLine(`choices: ${choicesToStr(choices)}`, id);
    }

    function logArrn(arr, id) {
        logger.pushLine(`arr: ${arrToStr(arr)}\n`, id);
    }

    function logChoicesn(choices, id) {
        logger.pushLine(`choices: ${choicesToStr(choices)}\n`, id);
    }

    function arrToStr(arr) {
        return "[" + arr.join(", ") + "]";
    }

    function choicesToStr(choices) {
        const newChoices = choices.filter(x => x.flag).map(x => x.node.value);
        return arrToStr(newChoices);
    }

    function bstSequences(root) {
        let n = getSize(root);
        let res = [];
        let choices = [];

        let count = 0;

        function inner(node, arr, parentId) {
            if (count > 40) {
                return;
            }
            count++

            const id = log(node, arr, choices, parentId);

            arr.push(node.value);

            logger.pushLine(`arr.push(${node.value})`, id);
            logArrn(arr, id);

            if (arr.length === n) {
                logger.pushLine("res.push([...arr])", id);
                res.push([...arr]);
                return;
            }

            if (node.left) {
                choices.push({ node: node.left, flag: true });
                logger.pushLine(`choices.push(${node.left.value})`, id);
                logChoicesn(choices, id);
            }

            if (node.right) {
                choices.push({ node: node.right, flag: true });
                logger.pushLine(`choices.push(${node.right.value})`, id);
                logChoicesn(choices, id);
            }

            for (let choice of choices) {
                if (choice.flag) {
                    choice.flag = false;
                    logger.pushLine(`remove choice: ${choice.node.value}`, id);
                    logChoicesn(choices, id);

                    logger.pushLine(`inner(${choice.node.value})\n`, id);
                    inner(choice.node, arr, id);

                    choice.flag = true;
                    logger.pushLine(`re-add choice: ${choice.node.value}`, id);
                    logChoicesn(choices, id);

                    arr = arr.filter(x => x !== choice.node.value);
                    logger.pushLine(`remove choice from arr: ${choice.node.value}`, id);
                    logArrn(arr, id);
                }
            }

            // arr = arr.filter(x => x !== node.value);
        }

        inner(root, [], null);

        return res;
    }

    function getSize(root) {
        let size = 0;
        let s = [root];

        while (s.length > 0) {
            let cur = s.pop();
            size++;
            if (cur.left) {
                s.push(cur.left);
            }
            if (cur.right) {
                s.push(cur.right);
            }
        }

        return size;
    }

    let n1 = { value: 1, left: null, right: null };
    let n2 = { value: 2, left: null, right: null };
    let n3 = { value: 3, left: null, right: null };
    let n4 = { value: 4, left: null, right: null };
    let n5 = { value: 5, left: null, right: null };
    let n6 = { value: 6, left: null, right: null };
    let n7 = { value: 7, left: null, right: null };

    // n1.left = n2;
    // n1.right = n3;

    // n2.left = n4;
    // n2.right = n5

    // n3.left = n6;
    // n3.right = n7;

    n1.left = n2;
    n1.right = n3;
    n2.left = n4;

    const res = bstSequences(n1);

    console.log(res);
}
