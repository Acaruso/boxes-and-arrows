function userFunction(logger) {
    // function robot(grid) {
    //     const targetRow = grid.length - 1;
    //     const targetCol = grid[0].length - 1;

    //     let path = [];
    //     let finalPath = null;

    //     function inner(row, col, parentId) {
    //         const id = logger.newNode(`inner(${row}, ${col})`, parentId);
    //         if (finalPath !== null) {
    //             logger.pushLine("finalPath !== null", id);
    //             return;
    //         }

    //         path.push([row, col]);

    //         logger.pushLine(`path.push([${row}, ${col}])`, id);

    //         logger.pushLine(`path: ${JSON.stringify(path)}`, id);

    //         if (row === targetRow && col === targetCol) {
    //             finalPath = [...path];
    //             return;
    //         }

    //         if (isValid(grid, row + 1, col)) {
    //             logger.pushLine(`inner(${row + 1}, ${col})`, id);
    //             inner(row + 1, col, id);
    //         }

    //         if (isValid(grid, row, col + 1)) {
    //             logger.pushLine(`inner(${row}, ${col + 1})`, id);
    //             inner(row, col + 1, id);
    //         }

    //         path.pop();

    //         logger.pushLine("path.pop()", id);

    //         logger.pushLine(`path: ${JSON.stringify(path)}`, id);
    //     }

    //     inner(0, 0, null);

    //     return finalPath;
    // }

    function robot(grid) {
        const targetRow = grid.length - 1;
        const targetCol = grid[0].length - 1;

        let path = [];
        let finalPath = null;

        function inner(row, col, parentId) {
            const id = logger.newNode(`inner(${row}, ${col})`, parentId);
            if (finalPath !== null) {
                logger.pushLine("finalPath !== null", id);
                return;
            }

            path.push([row, col]);

            logger.pushLine(`path.push([${row}, ${col}])`, id);
            logger.pushLine(`path: ${JSON.stringify(path)}`, id);

            if (row === targetRow && col === targetCol) {
                finalPath = path;
                return;
            }

            if (isValid(grid, row + 1, col)) {
                logger.pushLine(`inner(${row + 1}, ${col})`, id);
                inner(row + 1, col, id);
            }

            if (isValid(grid, row, col + 1)) {
                logger.pushLine(`inner(${row}, ${col + 1})`, id);
                inner(row, col + 1, id);
            }

            if (finalPath === null) {
                path.pop();
                logger.pushLine("path.pop()", id);
                logger.pushLine(`path: ${JSON.stringify(path)}`, id);
            }
        }

        inner(0, 0, null);

        return finalPath;
    }

    function isValid(grid, row, col) {
        return (
            (row >= 0) &&
            (row < grid.length) &&
            (col >= 0) &&
            (col < grid[0].length) &&
            (grid[row][col] === 0)
        );
    }

    const grid = [
        [0, 0, 0, 0, 0, 0],
        [0, 1, 0, 1, 1, 0],
        [0, 1, 0, 1, 1, 1],
        [1, 1, 0, 0, 0, 0],
        [0, 0, 0, 1, 1, 0],
        [0, 0, 0, 1, 1, 0],
    ];

    // const grid = [
    //     [0, 1, 1, 1],
    //     [0, 0, 0, 0],
    //     [0, 1, 1, 0],
    //     [0, 0, 1, 0],
    // ];

    const res = robot(grid);

    console.log(res);
}
