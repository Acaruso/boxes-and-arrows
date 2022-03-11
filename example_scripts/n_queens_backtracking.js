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

function printBoard(board) {
    const numRows = board.length;
    const numCols = board[0].length;
    let s = "";

    for (let i = 0; i < numRows; i++) {
        for (let k = 0; k < numCols; k++) {
            s += board[i][k];
        }
        s += "\n";
    }

    console.log(s);
}


function userFunction(logger) {
    const boardSize = 4;
    let board = makeBoard(boardSize);
    printBoard(board);

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
                if (
                    (i + k === row + col) || (i - k === row - col)
                ) {
                    if (board[i][k] === 1) {
                        return true;
                    }
                }
            }
        }

        return false;
    }

    function nQueens(n) {
        console.log(`nQueens(${n})`);
        if (n === 0) {
            return true;
        }

        for (let row = 0; row < boardSize; row++) {
            for (let col = 0; col < boardSize; col++) {
                if (!isAttacked(row, col) && board[row][col] !== 1) {
                    console.log(`placing ${row} ${col}`);
                    board[row][col] = 1;

                    if (nQueens(n - 1) === true) {
                        console.log(`nQueens(${n} - 1) === true`);
                        return true;
                    } else {
                        console.log(`removing ${row} ${col}`);
                        board[row][col] = 0;
                    }
                }
            }
        }

        return false;
    }

    nQueens(boardSize);

    printBoard(board);
}

