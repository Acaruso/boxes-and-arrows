function makeBoard(n) {
    let board = [];

    for (let i = 0; i < n; i++) {
        let elt = []
        for (let k = 0; k < n; k++) {
            elt.push(0);
        }
        board.push(elt);
    }

    return board;
}

function boardToString(board) {
    const numRows = board.length;
    const numCols = board[0].length;
    let s = "";

    for (let i = 0; i < numRows; i++) {
        for (let k = 0; k < numCols; k++) {
            s += board[i][k];
        }
        s += "\n";
    }

    return s;
}

function printBoard(board) {
    const s = boardToString(board);
    console.log(s);
}

function userFunction(logger) {
    function logEntrypoint(n, parentId) {
        let str = `nQueens(${n})\n`;
        str += "\nboard: \n" + boardToString(board);
        const id = logger.newNode(str, parentId);
        return id;
    }

    function logBoard(id) {
        let str = "\n \nboard: \n" + boardToString(board);
        logger.appendToNode("\n" + str + " \n", id);
    }

    function append(val, id) {
        logger.appendToNode("\n" + val, id);
    }

    const boardSize = 4;
    let board = makeBoard(boardSize);

    function isAttacked(row, col) {
        // check if there is a queen in row or col
        for (let i = 0; i < boardSize; i++) {
            if (board[row][i] === 1 || board[i][col] === 1) {
                return true;
            }
        }

        // check diagonals
        for (let i = 0; i < boardSize; i++) {
            for (let k = 0; k < boardSize; k++) {
                if ((i + k === row + col) || (i - k === row - col)) {
                    if (board[i][k] === 1) {
                        return true;
                    }
                }
            }
        }

        return false;
    }

    function nQueens(n, parentId) {
        const id = logEntrypoint(n, parentId);
        if (n === 0) {
            return true;
        }

        for (let row = 0; row < boardSize; row++) {
            for (let col = 0; col < boardSize; col++) {
                if (!isAttacked(row, col) && board[row][col] !== 1) {
                    append(`setting board[${row}][${col}]`, id);
                    board[row][col] = 1;

                    append(`nQueens(${n - 1})`, id)
                    if (nQueens(n - 1, id) === true) {
                        logBoard(id);
                        append("return true", id);
                        return true;
                    } else {
                        append(`unsetting board[${row}][${col}]`, id);
                        board[row][col] = 0;
                    }
                }
            }
        }

        logBoard(id);
        append("return false", id);
        return false;
    }

    nQueens(boardSize, null);

    printBoard(board);
}

