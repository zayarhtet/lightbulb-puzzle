
function generateBoard(dataMatrix) {
    var tableElem = document.createElement('table')
        var tableBodyElem = document.createElement('tbody')
        for (var i = 0; i< dataMatrix.length; i++) {
            var tableRowElem = document.createElement('tr')
                for (var j = 0; j < dataMatrix.length; j++) {
                    var tableDataElem = document.createElement('td')
                    if (dataMatrix[i][j] == 'obstacle') {
                        tableDataElem.classList.add('obstacle')
                    } else if (!isNaN(dataMatrix[i][j])) {
                        tableDataElem.innerText = dataMatrix[i][j]
                        var total = 0
                        if (i-1 >= 0 && dataMatrix[i-1][j] == 'bulb') total++
                        if (i+1 < dataMatrix.length && dataMatrix[i+1][j] == 'bulb') total++
                        if (j-1 >= 0 && dataMatrix[i][j-1] == 'bulb') total++
                        if (j+1 < dataMatrix.length && dataMatrix[i][j+1] == 'bulb') total++
                        if (total == dataMatrix[i][j]) {
                            tableDataElem.classList.add('passed')
                        } else if (total > dataMatrix[i][j]) {
                            tableDataElem.classList.add('error')
                        } else {
                            tableDataElem.classList.add('obstacle')
                        }
                    } else if (dataMatrix[i][j] == 'bulb') {
                        tableDataElem.classList.add('bulb-on')
                        tableDataElem.innerHTML = '<i class="fa-solid fa-lightbulb"></i>'
                    } else if (dataMatrix[i][j] == 'on') {
                        tableDataElem.classList.add('bulb-on')
                    } else if (dataMatrix[i][j] == 'plain') {
                        tableDataElem.innerHTML = ''
                        tableDataElem.classList.remove('bulb-on')
                    }
                    tableRowElem.appendChild(tableDataElem)
                }
            tableBodyElem.appendChild(tableRowElem)
        }
        tableBodyElem.id = 'boardBody'
    
    tableElem.appendChild(tableBodyElem)

    tableElem.id = 'board'
    tableElem.classList.add('board-style')

    mainBox.appendChild(tableElem)
}

function boardEventListener(event, ev) {
    const [row, col] = [
        ev.parentElement.rowIndex,
        ev.cellIndex
      ];

    var beginnerBoard = loadSavedGame(playerName.value)
    if (row === undefined || col === undefined) return; 
    if (ev.classList.contains('obstacle')) return;
    
    if (beginnerBoard[row][col] == 'bulb') {
        nonIlluminate(row, col, beginnerBoard)
        beginnerBoard[row][col] = 'plain'
    } else if (beginnerBoard[row][col] == 'plain') {
        illuminate(row, col, beginnerBoard)
        beginnerBoard[row][col] = 'bulb'
    }

    saveGame(playerName.value, beginnerBoard)
    mainBox.removeChild(document.getElementById('board'))
    generateBoard(beginnerBoard)
    var tableElem = document.getElementById('board')
    delegate(tableElem, 'td', 'click', boardEventListener)

}

function nonIlluminate(row, col, board) {
    // row
    var rowLeft = col-1; var rowRight = col+1;
    while (rowLeft >= 0 && (board[row][rowLeft] != 'obstacle' && isNaN(board[row][rowLeft]))) {
        board[row][rowLeft] = 'plain'
        // find a blub
        var rowLeftUp = row-1; var rowLeftDown = row+1;
        while (rowLeftUp >= 0 && (board[rowLeftUp][rowLeft] != 'obstacle' && isNaN(board[rowLeftUp][rowLeft]))) {
            if (board[rowLeftUp][rowLeft] == 'bulb') {
                illuminate(rowLeftUp, rowLeft, board)
                break;
            }
            rowLeftUp--;
        } 
        while (rowLeftDown < board.length && (board[rowLeftDown][rowLeft] != 'obstacle' && isNaN(board[rowLeftDown][rowLeft]))) {
            if (board[rowLeftDown][rowLeft] == 'bulb') {
                illuminate(rowLeftDown, rowLeft, board)
                break;
            }
            rowLeftDown++;
        }

        rowLeft--;
    }
    while (rowRight < board.length && (board[row][rowRight] != 'obstacle' && isNaN(board[row][rowRight]))) {
        board[row][rowRight] = 'plain'

        // find a blub
        var rowRightUp = row-1; var rowRightDown = row+1;
        while (rowRightUp >= 0 && (board[rowRightUp][rowRight] != 'obstacle' && isNaN(board[rowRightUp][rowRight]))) {
            if (board[rowRightUp][rowRight] == 'bulb') {
                illuminate(rowRightUp, rowRight, board)
                break;
            }
            rowRightUp--;
        }
        while (rowRightDown < board.length && (board[rowRightDown][rowRight] != 'obstacle' && isNaN(board[rowRightDown][rowRight]))) {
            if (board[rowRightDown][rowRight] == 'bulb') {
                illuminate(rowRightDown, rowRight, board)
                break;
            }
            rowRightDown++;
        }
        rowRight++;
    }

    // col
    var colUp = row-1; var colDown = row+1;
    while (colUp >= 0 && (board[colUp][col] != 'obstacle' && isNaN(board[colUp][col]))) {
        board[colUp][col] = 'plain'
        // find a blub
        var colUpLeft = col-1; var colUpRight = col+1;
        while (colUpLeft >= 0 && (board[colUp][colUpLeft] != 'obstacle' && isNaN(board[colUp][colUpLeft]))) {
            if (board[colUp][colUpLeft] == 'bulb') {
                illuminate(colUp, colUpLeft, board)
                break;
            }
            colUpLeft--;
        }
        while (colUpRight < board.length && (board[colUp][colUpRight] != 'obstacle' && isNaN(board[colUp][colUpRight]))) {
            if (board[colUp][colUpRight] == 'bulb') {
                illuminate(colUp, colUpRight, board)
                break;
            }
            colUpRight++;
        }
        colUp--;
    }
    while (colDown < board.length && (board[colDown][col] != 'obstacle' && isNaN(board[colDown][col]))) {
        board[colDown][col] = 'plain'
        // find a blub
        var colDownLeft = col-1; var colDownRight = col+1;
        while (colDownLeft >= 0 && (board[colDown][colDownLeft] != 'obstacle' && isNaN(board[colDown][colDownLeft]))) {
            if (board[colDown][colDownLeft] == 'bulb') {
                illuminate(colDown, colDownLeft, board)
                break;
            }
            colDownLeft--;
        }
        while (colDownRight < board.length && (board[colDown][colDownRight] != 'obstacle' && isNaN(board[colDown][colDownRight]))) {
            if (board[colDown][colDownRight] == 'bulb') {
                illuminate(colDown, colDownRight, board)
                break;
            }
            colDownRight++;
        }
        colDown++;
    } 
}

function illuminate(row, col, board) {
    // row
    var rowLeft = col-1; var rowRight = col+1;
    while (rowLeft >= 0 && (board[row][rowLeft] != 'obstacle' && isNaN(board[row][rowLeft]))) board[row][rowLeft--] = 'on'
    while (rowRight < board.length && (board[row][rowRight] != 'obstacle' && isNaN(board[row][rowRight]))) board[row][rowRight++] = 'on'
    // col
    var colUp = row-1; var colDown = row+1;
    while (colUp >= 0 && (board[colUp][col] != 'obstacle' && isNaN(board[colUp][col]))) board[colUp--][col] = 'on'
    while (colDown < board.length && (board[colDown][col] != 'obstacle' && isNaN(board[colDown][col]))) board[colDown++][col] = 'on'
}

// generateBoard(beginnerBoard)
// var tableElem = document.getElementById('board')
// delegate(tableElem, 'td', 'click', boardEventListener)

