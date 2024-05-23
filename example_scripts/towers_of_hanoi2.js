function userFunction(logger) {
    function logStacks(source, dest, temp, id, newLine) {
        let arr = [source, dest, temp];
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

    function strFnCall(numDisks, source, dest, temp) {
        return `hanoi(${numDisks}, source: ${source.id}, dest: ${dest.id}, temp: ${temp.id})`;
    }

    function hanoi(numDisks, source, dest, temp, parentId) {
        // const id = logger.newNode(`hanoi(${numDisks}, source, dest, temp)`, parentId);
        const id = logger.newNode(strFnCall(numDisks, source, dest, temp), parentId);

        logStacks(source, dest, temp, id, true);

        if (numDisks === 0) {
            return;
        } else if (numDisks === 1) {
            logger.pushLine(`moveOne(${source.id}, ${dest.id})`, id);
            moveOne(source, dest);
            logStacks(source, dest, temp, id, false);
        } else {
            hanoi(numDisks - 1, source, temp, dest, id);
            logger.pushLine(strFnCall(numDisks - 1, source, temp, dest), id);
            logStacks(source, dest, temp, id, true);

            moveOne(source, dest);
            logger.pushLine(`moveOne(${source.id}, ${dest.id})`, id);
            logStacks(source, dest, temp, id, true);

            hanoi(numDisks - 1, temp, dest, source, id);
            logger.pushLine(strFnCall(numDisks - 1, temp, dest, source), id);
            logStacks(source, dest, temp, id, false);
        }
    }

    function moveOne(source, dest) {
        const elt = source.arr.pop();
        dest.arr.push(elt);
    }

    let source = { id: 1, arr: [3, 2, 1] };
    let dest = { id: 2, arr: [] };
    let temp = { id: 3, arr: [] };

    hanoi(source.arr.length, source, dest, temp, null);

    console.log(source);
    console.log(dest);
    console.log(temp);
}
