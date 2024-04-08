function disksToStr(disks) {
    let s = "disks:\n";
    for (const disk of disks) {
        s += JSON.stringify(disk);
        s += "\n";
    }
    return s;
}

function userFunction(logger) {
    // const id = logger.newNode("", null);
    // logger.appendToNode("\ntest", id);
    // const arr = makeEmptyArray(7);
    // logger.appendArrayToNode(arr, [], id);

    function hanoi(disks) {
        function move(source, dest) {
            const temp = disks[source].pop();
            disks[dest].push(temp);
        }

        function inner(numDisks, start, end, temp, parentId) {
            const id = logger.newNode(disksToStr(disks), parentId);
            if (numDisks === 1) {
                logger.appendToNode(`\nmove(${start}, ${end})`, id);
                move(start, end);
                logger.appendToNode(`\n\n${disksToStr(disks)}`, id);
            } else {
                logger.appendToNode(`\ninner(${numDisks - 1}, ${start}, ${temp}, ${end})`, id);
                inner(numDisks - 1, start, temp, end, id);
                logger.appendToNode(`\n\n${disksToStr(disks)}`, id);
                
                logger.appendToNode(`\nmove(${start}, ${end})`, id);
                move(start, end);
                logger.appendToNode(`\n\n${disksToStr(disks)}`, id);

                logger.appendToNode(`\ninner(${numDisks - 1}, ${temp}, ${end}, ${start})`, id);
                inner(numDisks - 1, temp, end, start, id);
                logger.appendToNode(`\n\n${disksToStr(disks)}`, id);
            }
        }

        const numDisks = disks[0].length;
        inner(numDisks, 0, 1, 2, null);
    }

    const disks = [
        [4, 3, 2, 1],
        [],
        []
    ];

    hanoi(disks);

    console.log(disks);
}
