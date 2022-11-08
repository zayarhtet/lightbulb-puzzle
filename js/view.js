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
    // document.getElementById('menu-new-game').classList.add('hide')
    // document.getElementById('menu-score-board').classList.add('hide')
    // document.getElementById('menu-saved-game').classList.add('hide')
}

function unhideMenuPage() {
    document.getElementById('menu').classList.remove('hide')
    // document.getElementById('menu-new-game').classList.remove('hide')
    // document.getElementById('menu-score-board').classList.remove('hide')
    // document.getElementById('menu-saved-game').classList.remove('hide')
}

function unhideGameBoard() {
    document.getElementById('gameBoard').classList.remove('hide')
}

function hideGameBoard() {
    document.getElementById('gameBoard').classList.add('hide')
    // console.log(mainBox)
    if (mainBox.hasChildNodes('board'))
        mainBox.removeChild(document.getElementById('board'))
    // savedGame()
}

function hidePlayerNamePage() {
    document.getElementById('playerName').classList.add('hide')
}

function unhidePlayerNamePage() {
    document.getElementById('playerName').classList.remove('hide')
}

function backToMenu() {
    hideBoardPage()
    hidePlayerNamePage()
    hideGameBoard()
    hideThreeButtons()
    hideScoreBoard()
    unhideMenuPage()
    playerName.value = ''
    timer = 0
    elapsedTime.innerHTML = '0h 0m 0s'
    clearInterval(stopWatch)

}

function hideScoreBoard() {
    document.getElementById('scoreBoard').classList.add('hide')
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
    // console.log(document.getElementById('playerName'))
    if (playerName.value == '') {
        alert('Please enter your name')
        return
    }
    hideMenuPage()
    hidePlayerNamePage()
    unhideBoardPage()
    //renderboardPage() // render board page
}

function newGamePage() {
    hideMenuPage()
    unhideBoardPage()
}

function unHideThreeButtons() {
    hideGameBoard()
    clearInterval(stopWatch)
    document.getElementById('threeButtons').classList.remove('hide')
}

function hideThreeButtons() {
    document.getElementById('threeButtons').classList.add('hide')
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

}

function renderSavedBoard(playername) {
    hideMenuPage()
    unhideBoardPage()
    var savedBoard = loadSavedBoard(playername)
    generateBoard(savedBoard)
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

function unhideScoreBoard() {
    document.getElementById('scoreBoard').classList.remove('hide')
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