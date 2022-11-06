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
    document.getElementById('menu-new-game').classList.add('hide')
    document.getElementById('menu-saved-game').classList.add('hide')
}

function unhideMenuPage() {
    document.getElementById('menu-new-game').classList.remove('hide')
    document.getElementById('menu-saved-game').classList.remove('hide')
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
    unhideMenuPage()
    playerName.value = ''
    console.log('heheh')
    console.log(timer)
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
    var playerBoard = loadSavedGame(playerName.value)['board']
    generateBoardWithEventListener(playerBoard)
}

function resetBoard() {
    clearInterval(stopWatch)
    timer = 0
    elapsedTime.innerText = '0h 0m 0s'
    clearBoard()
    calculateElapsedTime()
}

// function renderSavedBoard() {}