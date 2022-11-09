var body = document.body;
var newGame = document.getElementById('menu-new-game')
var savedGame = document.getElementById('menu-saved-game')
var playerNameShow = document.getElementById('player-name')
var elapsedTime = document.getElementById('elapsed-time')

playerName
    .addEventListener("keyup", function(event) {
    event.preventDefault();
    if (event.key === 'Enter') {
        startGame()
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
}

function unhideMenuPage() {
    document.getElementById('menu').classList.remove('hide')
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

function backToMenu() {
    hideBoardPage()
    hidePlayerNamePage()
    hideGameBoard()
    hideThreeButtons()
    hideScoreBoard()
    hideSavedGameList()
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
}

function newGamePage() {
    hideMenuPage()
    unhideBoardPage()
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

function showSavedGameList() {
    hideMenuPage()
    unhideSavedGameList()
    var scoreBoard = loadSavedGameList()
    generateSavedGameList(scoreBoard)
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
    tableHeader.append(date, playerNameHeader, boardName, elapsedTime)
    savedGameList.append(tableHeader)
    Object.keys(savedBoard).forEach(key => {
        var row = document.createElement('tr')
        var date = document.createElement('td')
        var playerName = document.createElement('td')
        var boardName = document.createElement('td')
        var elapsedTime = document.createElement('td')
        date.innerText = savedBoard[key].dateTime
        playerName.innerText = key
        boardName.innerText = savedBoard[key].boardName
        elapsedTime.innerText = savedBoard[key].elapsedTime

        row.addEventListener('click', () => {
            renderSavedBoard(key)
        })

        row.append(date, playerName, boardName, elapsedTime)
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

function showScoreBoard() {
    hideMenuPage()
    unhideScoreBoard()
    var scoreBoard = loadScoreBoard()
    generateScoreBoard(scoreBoard)
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
    playerNameHeader.innerText = 'Player Name'
    playerBoardNameHeader.innerText = 'Board Name'
    playerTimeHeader.innerText = 'Elapsed Time'
    playerDateTimeHeader.innerText = 'Date'
    scoreBoardHeader.appendChild(playerDateTimeHeader)
    scoreBoardHeader.appendChild(playerNameHeader)
    scoreBoardHeader.appendChild(playerBoardNameHeader)
    scoreBoardHeader.appendChild(playerTimeHeader)
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
        scoreTable.appendChild(tr)
    })
}

// function renderSavedBoard() {}