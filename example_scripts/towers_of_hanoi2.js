function userFunction(logger) {
    function logStacks(start, end, temp, id, newLine) {
        let arr = [start, end, temp];
        arr.sort((a, b) => a.id - b.id);

        console.log("arr");
        console.log(arr);

        logger.pushLine("", id);
        logger.pushLine("stacks:", id);
        logger.pushLine(`1: ${str(arr[0].arr)}`, id);
        logger.pushLine(`2: ${str(arr[1].arr)}`, id);
        logger.pushLine(`3: ${str(arr[2].arr)}`, id);
        if (newLine) {
            logger.pushLine("", id);
        }
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

        logStacks(start, end, temp, id, true);

        if (numDisks === 0) {
            return;
        } else if (numDisks === 1) {
            logger.pushLine(`moveOne(${start.id}, ${end.id})`, id);
            moveOne(start, end);
            logStacks(start, end, temp, id, false);
        } else {
            hanoi(numDisks - 1, start, temp, end, id);

            logger.pushLine(strFnCall(numDisks, start, temp, end), id);
            logStacks(start, end, temp, id, true);

            moveOne(start, end);

            logger.pushLine(`moveOne(${start.id}, ${end.id})`, id);
            logStacks(start, end, temp, id, true);

            hanoi(numDisks - 1, temp, end, start, id);
            logger.pushLine(strFnCall(numDisks, temp, end, start), id);
            logStacks(start, end, temp, id, false);
        }
    }

    function moveOne(source, dest) {
        const elt = source.arr.pop();
        dest.arr.push(elt);
    }

    let start = { id: 1, arr: [3, 2, 1] };
    let end = { id: 2, arr: [] };
    let temp = { id: 3, arr: [] };

    hanoi(start.arr.length, start, end, temp, null);

    console.log(start);
    console.log(end);
    console.log(temp);
}
