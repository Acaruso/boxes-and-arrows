function userFunction(logger) {
    function logStacks(stack1, stack2, temp, id) {
        logger.pushLine(`temp:   ${temp}`, id);
        logger.pushLine(`stack1: ${str(stack1)}`, id);
        logger.pushLine(`stack2: ${str(stack2)}`, id);
        logger.pushLine("", id);
    }

    function pushLine(str, id) {
        logger.pushLine(str, id);
        logger.pushLine("", id);
    }

    function str(arr) {
        return JSON.stringify(arr);
    }

    function sortStack(stack1) {
        const id = logger.newNode(`input: ${str(stack1)}\n`, null);

        let stack2 = [];
        let temp = 0;

        logStacks(stack1, stack2, temp, id);

        moveOne(stack1, stack2);

        pushLine(`moveOne(stack2, stack1)`, id);
        logStacks(stack1, stack2, temp, id);

        while (stack1.length > 0) {
            temp = stack1.pop();
            pushLine(`temp = stack1.pop()`, id);

            logStacks(stack1, stack2, temp, id);

            if (temp >= peek(stack2)) {
                stack2.push(temp);
                pushLine(`stack2.push(${temp})`, id);
                logStacks(stack1, stack2, temp, id);
            } else {
                while (stack2.length > 0 && temp < peek(stack2)) {
                    moveOne(stack2, stack1);
                    pushLine(`moveOne(stack2, stack1)`, id);
                    logStacks(stack1, stack2, temp, id);
                }

                stack2.push(temp);
                pushLine(`stack2.push(${temp})`, id);
                logStacks(stack1, stack2, temp, id);
            }
        }

        pushLine("final:", id);
        logStacks(stack1, stack2, temp, id);

        while (stack2.length > 0) {
            moveOne(stack2, stack1);
        }
    }

    function peek(arr) {
        if (arr.length === 0) {
            return null;
        } else {
            return arr[arr.length - 1];
        }
    }

    function moveOne(source, dest) {
        const elt = source.pop();
        dest.push(elt);
    }

    // const stack = [9, 4, 8, 5, 1];
    // const stack = [9, 0, 4, 8, 5, 1];

    const stack = [3, 4, 5];

    sortStack(stack);
    console.log(stack);
}
