var body = document.body;
var newGame = document.getElementById('menu-new-game')
var savedGame = document.getElementById('menu-saved-game')
var playerNameShow = document.getElementById('player-name')
var elapsedTime = document.getElementById('elapsed-time')
var newBoardName = document.getElementById('new-board-name')

playerName
    .addEventListener("keyup", function(event) {
    event.preventDefault();
    if (event.key === 'Enter') {
        startGame()
    }
});

newBoardName
    .addEventListener("keyup", function(event) {
    event.preventDefault();
    if (event.key === 'Enter') {
        createAndRenderNewBoard()
    }
});

function hideBoardPage() {
    document.getElementById('boardList').classList.add('hide')
    document.getElementById('boardListMenu').classList.add('hide')
}

function unhideBoardPage() {
    document.getElementById('boardList').classList.remove('hide')
    document.getElementById('boardListMenu').classList.remove('hide')
}

function hideMenuPage() {
    document.getElementById('menu').classList.add('hide')
    document.getElementById('description').classList.add('hide')
}

function unhideMenuPage() {
    document.getElementById('menu').classList.remove('hide')
    document.getElementById('description').classList.remove('hide')
}

function hideGameBoard() {
    document.getElementById('gameBoard').classList.add('hide')
    if (mainBox.hasChildNodes('board'))
        mainBox.removeChild(document.getElementById('board'))
}

function unhideGameBoard() {
    document.getElementById('gameBoard').classList.remove('hide')
}

function hidePlayerNamePage() {
    document.getElementById('playerName').classList.add('hide')
}

function unhidePlayerNamePage() {
    document.getElementById('playerName').classList.remove('hide')
}

function hideScoreBoard() {
    document.getElementById('scoreBoard').classList.add('hide')
}

function unhideScoreBoard() {
    document.getElementById('scoreBoard').classList.remove('hide')
}

function hideThreeButtons() {
    document.getElementById('threeButtons').classList.add('hide')
}

function unHideThreeButtons() {
    hideGameBoard()
    clearInterval(stopWatch)
    document.getElementById('threeButtons').classList.remove('hide')
}

function hideSavedGameList() {
    document.getElementById('savedGame').classList.add('hide')
}
function unhideSavedGameList() {
    document.getElementById('savedGame').classList.remove('hide')
}

function hideClearAndRestartButton() {
    document.getElementById('clearBoard').classList.add('hide')
    document.getElementById('restartBoard').classList.add('hide')
}

function unhideClearAndRestartButton() {
    document.getElementById('clearBoard').classList.remove('hide')
    document.getElementById('restartBoard').classList.remove('hide')
}

function hideEditBoardPage() {
    document.getElementById('editBoardPage').classList.add('hide')
}

function unhideEditBoardPage() {
    document.getElementById('editBoardPage').classList.remove('hide')
}

function hideNewBoardPage() {
    document.getElementById('new-board-page').classList.add('hide')
}

function unhideNewBoardPage() {
    document.getElementById('new-board-page').classList.remove('hide')
}

function hideBoardList() {
    document.getElementById('newBoardList').classList.add('hide')
}

function unhideBoardList() {
    document.getElementById('newBoardList').classList.remove('hide')
}

function backToMenu() {
    hideBoardPage()
    hidePlayerNamePage()
    hideGameBoard()
    hideThreeButtons()
    hideScoreBoard()
    hideSavedGameList()
    hideNewBoardPage()
    hideBoardList()
    hideEditBoardPage()
    unhideClearAndRestartButton()
    unhideMenuPage()
    playerName.value = ''
    timer = 0
    elapsedTime.innerHTML = '0h 0m 0s'
    clearInterval(stopWatch)
}

function askPlayerName() {
    hideMenuPage()
    unhidePlayerNamePage()
}

function backToPlayerName() {
    hideBoardPage()
    unhidePlayerNamePage()
}

function startGame() {
    if (playerName.value == '') {
        alert('Please enter your name')
        return
    }
    hideMenuPage()
    hidePlayerNamePage()
    unhideBoardPage()
    generatePlayerBoardList()
}

function newGamePage() {
    hideMenuPage()
    unhideBoardPage()
}

function showBoardList() {
    hideMenuPage()
    unhideBoardList()
    var boardList = loadBoardList()
    generateBoardList(boardList)
}

function showScoreBoard() {
    hideMenuPage()
    unhideScoreBoard()
    var scoreBoard = loadScoreBoard()
    generateScoreBoard(scoreBoard)
}

function backToBoard() {
    hideThreeButtons()
    unhideGameBoard()
    hideClearAndRestartButton()
    var scoreBoard = loadScoreBoard()
    var playerBoard = scoreBoard.find(x => x.player == playerName.value).board
    generateBoardWithEventListener(playerBoard)
}

function resetBoard() {
    clearInterval(stopWatch)
    timer = 0
    elapsedTime.innerText = '0h 0m 0s'
    clearBoard()
    calculateElapsedTime()
}

function showSavedGameList() {
    hideMenuPage()
    unhideSavedGameList()
    var scoreBoard = loadSavedGameList()
    generateSavedGameList(scoreBoard)
}

function createNewBoard() {
    hideBoardList()
    hideBoardPage()
    unhideNewBoardPage()
}

function editBoardPage() {
    hideBoardList()
    hideNewBoardPage()
    unhideEditBoardPage()
}

function backToBoardList() {
    hideNewBoardPage()
    hideEditBoardPage()
    showBoardList()
}

function renderNewBoard(boardName) {
    playerBoardName = boardName
    hideBoardPage()
    unhideGameBoard()

    playerNameShow.innerHTML = playerName.value
    calculateElapsedTime()

    var newBoard = loadNewBoard(boardName)
    saveGame(playerName.value, newBoard, timer)

    generateBoardWithEventListener(newBoard)
}

function generateSavedGameList(savedBoard) {
    var savedGameList = document.getElementById('saved-game-table')
    savedGameList.innerHTML = ''
    var tableHeader = document.createElement('tr')
    
    var date = document.createElement('th')
    date.innerText = 'Date'
    var playerNameHeader = document.createElement('th')
    playerNameHeader.innerText = 'Player Name'
    var boardName = document.createElement('th')
    boardName.innerText = 'Board Name'
    var elapsedTime = document.createElement('th')
    elapsedTime.innerText = 'Elapsed Time'
    var thDelete = document.createElement('th')
    var thEdit = document.createElement('th')
    tableHeader.append(date, playerNameHeader, boardName, elapsedTime, thEdit,thDelete)
    savedGameList.append(tableHeader)
    Object.keys(savedBoard).forEach(key => {
        var row = document.createElement('tr')
        var date = document.createElement('td')
        var playerName = document.createElement('td')
        var boardName = document.createElement('td')
        var elapsedTime = document.createElement('td')
        var tdEdit = document.createElement('td')
        var tdDelete = document.createElement('td')
        date.innerText = savedBoard[key].dateTime
        playerName.innerText = key
        boardName.innerText = savedBoard[key].boardName
        elapsedTime.innerText = savedBoard[key].elapsedTime

        var editButton = document.createElement('button')
        editButton.innerText = 'Resume'
        editButton.addEventListener('click', function() {
            renderSavedBoard(key)
        })
        tdEdit.append(editButton)

        var deleteButton = document.createElement('button')
        deleteButton.innerText = 'Delete'
        deleteButton.addEventListener('click', function() {
            removeSavedGame(key)
            generateSavedGameList(loadSavedGameList())
        })
        tdDelete.append(deleteButton)

        row.append(date, playerName, boardName, elapsedTime, tdEdit, tdDelete)
        savedGameList.appendChild(row)
    })
}

function renderSavedBoard(playername) {
    hideMenuPage()
    hideSavedGameList()
    unhideGameBoard()
    playerNameShow.innerHTML = playername
    playerName.value = playername
    var savedBoard = loadSavedGame(playername)
    playerBoardName = savedBoard.boardName
    elapsedTime.innerHTML = calculateTime(savedBoard.elapsedTime)
    timer = savedBoard.elapsedTime
    calculateElapsedTime()
    generateBoardWithEventListener(savedBoard.board)
}

function clearBoard() {
    hideThreeButtons()
    var confirmPrompt = confirm('Are you sure you want to clear the board?')
    if (!confirmPrompt) return;
    console.log(playerBoardName)
    var playerBoard = loadNewBoard(playerBoardName)
    console.log(playerBoard)
    saveGame(playerName.value, playerBoard, timer)

    if (mainBox.hasChildNodes('board'))
        mainBox.removeChild(document.getElementById('board'))
    else {
        unhideGameBoard()
        clearInterval(stopWatch)
        timer = 0;
        elapsedTime.innerText = '0h 0m 0s'
        calculateElapsedTime()
    }
    generateBoardWithEventListener(playerBoard)
}

function generateScoreBoard(scoreBoard) {
    console.log("scoreBoard", scoreBoard)
    var scoreTable = document.getElementById('score-board-table')
    scoreTable.innerHTML = ''
    var scoreBoardHeader = document.createElement('tr')
    var playerNameHeader = document.createElement('th')
    var playerDateTimeHeader = document.createElement('th')
    var playerTimeHeader = document.createElement('th')
    var playerBoardNameHeader = document.createElement('th')
    var deleteRecord = document.createElement('th')
    playerNameHeader.innerText = 'Player Name'
    playerBoardNameHeader.innerText = 'Board Name'
    playerTimeHeader.innerText = 'Elapsed Time'
    playerDateTimeHeader.innerText = 'Date'

    scoreBoardHeader.appendChild(playerDateTimeHeader)
    scoreBoardHeader.appendChild(playerNameHeader)
    scoreBoardHeader.appendChild(playerBoardNameHeader)
    scoreBoardHeader.appendChild(playerTimeHeader)
    scoreBoardHeader.appendChild(deleteRecord)
    scoreTable.appendChild(scoreBoardHeader)
    scoreBoard.forEach(x => {
        var tr = document.createElement('tr')
        var tdDateTime = document.createElement('td')
        tdDateTime.innerText = x.dateTime
        tr.appendChild(tdDateTime)        
        var tdPlayerName = document.createElement('td')
        tdPlayerName.innerText = x.player
        tr.appendChild(tdPlayerName)
        var tdBoardName = document.createElement('td')
        tdBoardName.innerText = x.boardName
        tr.appendChild(tdBoardName)
        var tdElapsedTime = document.createElement('td')
        tdElapsedTime.innerText = x.elapsedTime
        tr.appendChild(tdElapsedTime)
        var tdDelete = document.createElement('td')
        var deleteButton = document.createElement('button')
        deleteButton.innerText = 'Delete'
        deleteButton.addEventListener('click', () => {
            deleteRecordFromScoreBoard(x.player)
            generateScoreBoard(loadScoreBoard())
        })
        tdDelete.appendChild(deleteButton)
        tr.appendChild(tdDelete)
        scoreTable.appendChild(tr)
    })
}

function generateBoardList(boardList) {
    var boardListTable = document.getElementById('board-list-table')
    boardListTable.innerHTML = ''
    var boardListHeader = document.createElement('tr')
    var boardNameHeader = document.createElement('th')
    var deleteBoard = document.createElement('th')
    boardNameHeader.innerText = 'Board Name'
    boardListHeader.appendChild(boardNameHeader)
    boardListHeader.appendChild(deleteBoard)
    boardListTable.appendChild(boardListHeader)
    Object.keys(boardList).forEach(key => {
        var tr = document.createElement('tr')
        var tdBoardName = document.createElement('td')
        tdBoardName.innerText = key
        tdBoardName.addEventListener('click', () => {
            editBoardPage()
            renderNewBoardPage(key,boardList[key])
        })
        tr.appendChild(tdBoardName)
        var tdDelete = document.createElement('td')
        var deleteButton = document.createElement('button')
        deleteButton.innerText = 'Delete'
        deleteButton.addEventListener('click', () => {
            deleteBoardFromBoardList(key)
            generateBoardList(loadBoardList())
        })
        tdDelete.appendChild(deleteButton)
        tr.appendChild(tdDelete)
        boardListTable.appendChild(tr)
    })
}

function renderNewBoardPage(name, dataMatrix) {
    var newBoardBox = document.getElementById('new-board-box')
    newBoardBox.innerHTML = ''
    var h2 = document.createElement('h2')
    h2.innerText = name
    h2.id = 'existing-board-name'
    h2.classList.add('board-name-style')
    newBoardBox.appendChild(h2)
    generateBoard(dataMatrix, newBoardBox, 'newBoard')
    delegate(document.getElementById('newBoard'), 'td', 'click', newBoardEventListener)
}

function newBoardEventListener(event, ev) {
    const [row, col] = [
        ev.parentElement.rowIndex,
        ev.cellIndex
      ];
    
    var newBoardName = document.getElementById('existing-board-name').innerText
    var boardList = loadBoardList()
    var dataMatrix = boardList[newBoardName]

    if (dataMatrix[row][col] == 'plain') dataMatrix[row][col] = 'obstacle'
    else if (dataMatrix[row][col] == 'obstacle') dataMatrix[row][col] = 0
    else if (dataMatrix[row][col] == 0) dataMatrix[row][col] = 1
    else if (dataMatrix[row][col] == 1) dataMatrix[row][col] = 2
    else if (dataMatrix[row][col] == 2) dataMatrix[row][col] = 3
    else if (dataMatrix[row][col] == 3) dataMatrix[row][col] = 4
    else if (dataMatrix[row][col] == 4) dataMatrix[row][col] = 'plain'

    boardList[newBoardName] = dataMatrix
    saveBoardList(boardList)
    var newBoardBox = document.getElementById('new-board-box')
    newBoardBox.removeChild(document.getElementById('newBoard'))
    generateBoard(dataMatrix, newBoardBox, 'newBoard')
    delegate(document.getElementById('newBoard'), 'td', 'click', newBoardEventListener)
}

function generatePlayerBoardList() {
    var boardList = loadBoardList()
    var playerBoardList = document.getElementById('player-board-list')
    playerBoardList.innerHTML = ''
    Object.keys(boardList).forEach(key => {
        var div = document.createElement('div')
        div.classList.add('board')

        var h2 = document.createElement('h2')
        h2.innerText = key
        h2.classList.add('board-name-style')
        div.appendChild(h2)

        var button = document.createElement('button')
        button.classList.add('board-box')
        button.setAttribute('onclick', `renderNewBoard('${key}')`)

        var img = document.createElement('img')
        img.setAttribute('src', `resources/${key}.png`)
        img.setAttribute('alt', key)
        img.classList.add('board-img')
        button.appendChild(img)

        div.appendChild(button)
        playerBoardList.appendChild(div)
    })
}

function createAndRenderNewBoard() {
    var boardName = document.getElementById('new-board-name').value;
    if (boardName == '') {
        alert('Please enter a board name')
        return
    }
    document.getElementById('new-board-name').value = ''
    var boardSizeInput = document.getElementById('board-size').value;
    console.log(boardSizeInput)
    var dataMatrix = []
    for (var i = 0; i < boardSizeInput; i++) {
        var row = []
        for (var j = 0; j < boardSizeInput; j++) {
            row.push('plain')
        }
        dataMatrix.push(row)
    }
    var boardList = loadBoardList()
    boardList[boardName] = dataMatrix
    saveBoardList(boardList)
    editBoardPage()
    renderNewBoardPage(boardName, dataMatrix)
}

function resetNewBoard() {
    var boardName = document.getElementById('existing-board-name').innerText
    var boardList = loadBoardList()
    var dataMatrix = boardList[boardName]
    var newBoardBox = document.getElementById('new-board-box')
    newBoardBox.removeChild(document.getElementById('newBoard'))
    var len = dataMatrix.length;
    dataMatrix = []
    
    for (var i = 0; i < len; i++) {
        var row = []
        for (var j = 0; j < len; j++) row.push('plain')
        dataMatrix.push(row)
    }
    boardList[boardName] = dataMatrix
    saveBoardList(boardList)
    generateBoard(dataMatrix, newBoardBox, 'newBoard')
    delegate(document.getElementById('newBoard'), 'td', 'click', newBoardEventListener)
}