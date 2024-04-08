function userFunction(logger) {

    function nQueens(n) {
        let rows = new Array(n).fill(-1);
        let out = [];

        function str(arr) {
            return JSON.stringify(arr);
        }

        function boardToStr(rows) {
            let s = "";
            for (let row = 0; row < n; row++) {
                for (let col = 0; col < n; col++) {
                    if (rows[row] === col) {
                        s += "Q";
                    } else {
                        s += ".";
                    }
                }
                s += "\n";
            }
            return s;
        }

        function inner(row, parentId) {
            const id = logger.newNode(`inner(${row})\n`, parentId);

            if (row === n) {
                logger.pushLine(`out.push(${str(rows)})`, id);
                out.push([...rows]);
                return;
            }

            for (let col = 0; col < n; col++) {
                if (isValid(rows, row, col)) {
                    rows[row] = col;
                    logger.pushLine(`rows[${row}] = ${col}`, id);
                    logger.pushLine(boardToStr(rows), id);
                    logger.pushLine(`inner(${row + 1})\n`, id);
                    inner(row + 1, id);
                    rows[row] = -1;
                }
            }
        }

        inner(0, null);

        return out;
    }

    function isValid(rows, row1, col1) {
        for (let row2 = 0; row2 < row1; row2++) {
            let col2 = rows[row2];

            if (col1 === col2) {
                return false;
            }

            let colDist = Math.abs(col2 - col1);
            let rowDist = row1 - row2;

            if (colDist === rowDist) {
                return false;
            }
        }

        return true;
    }

    const out = nQueens(4);
    console.log(out);
}

// testcase:
// n = 4 -> [[1, 3, 0, 2], [2, 0, 3, 1]]
