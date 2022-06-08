function userFunction(logger) {
    function logStacks(start, end, temp, id) {
        logger.pushLine("", id);
        logger.pushLine("stacks:", id);
        logger.pushLine(`start: ${str(start.arr)}`, id);
        logger.pushLine(`end: ${str(end.arr)}`, id);
        logger.pushLine(`temp: ${str(temp.arr)}`, id);
        logger.pushLine("", id);
    }

    function str(arr) {
        return JSON.stringify(arr);
    }

    function strFnCall(numDisks, start, end, temp) {
        return `hanoi(${numDisks}, start: ${start.id}, end: ${end.id}, temp: ${temp.id})`;
    }

    function hanoi(numDisks, start, end, temp, parentId) {
        // const id = logger.newNode(`hanoi(${numDisks}, start, end, temp)`, parentId);
        const id = logger.newNode(strFnCall(numDisks, start, end, temp), parentId);

        logStacks(start, end, temp, id);

        if (numDisks === 0) {
            return;
        } else if (numDisks === 1) {
            logger.pushLine(`moveOne(${start.id}, ${end.id})`, id);
            moveOne(start, end);
            logStacks(start, end, temp, id);
        } else {
            hanoi(numDisks - 1, start, temp, end, id);
            logger.pushLine(strFnCall(numDisks, start, end, temp), id);
            moveOne(start, end);
            logger.pushLine(`moveOne(${start.id}, ${end.id})`, id);
            logStacks(start, end, temp, id);
            hanoi(numDisks - 1, temp, end, start, id);
            logger.pushLine(strFnCall(numDisks, start, end, temp), id);
        }
    }

    function moveOne(start, end) {
        const elt = start.arr.pop();
        end.arr.push(elt);
    }

    let start = { id: 1, arr: [3, 2, 1] };
    let end = { id: 2, arr: [] };
    let temp = { id: 3, arr: []};

    hanoi(start.arr.length, start, end, temp, null);

    console.log(start);
    console.log(end);
    console.log(temp);
}
