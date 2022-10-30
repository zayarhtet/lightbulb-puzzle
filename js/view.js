var body = document.body;
newGame = document.getElementById('menu-new-game'),
savedGame = document.getElementById('menu-saved-game')

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

function unhideGameBoard(board) {
    document.getElementById('gameBoard').classList.remove('hide')
}

function hideGameBoard() {
    document.getElementById('gameBoard').classList.add('hide')
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

    unhideMenuPage()

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
    hideMenuPage()
    hidePlayerNamePage()
    unhideBoardPage()
    //renderboardPage() // render board page
}

function newGamePage() {
    hideMenuPage()
    unhideBoardPage()
}

function renderNewBoard(boardName) {
    hideBoardPage()
    unhideGameBoard()
    var newBoard = loadNewBoard(boardName)
    console.log(newBoard)
    console.log(playerName.value)
    saveGame(playerName.value, newBoard)
    generateBoard(newBoard)
    var tableElem = document.getElementById('board')
    delegate(tableElem, 'td', 'click', boardEventListener)
}

function renderSavedBoard(playername) {
    hideMenuPage()
    unhideBoardPage()
    var savedBoard = loadSavedBoard(playername)
    generateBoard(savedBoard)
    var tableElem = document.getElementById('board')
    delegate(tableElem, 'td', 'click', boardEventListener)
}

// function renderSavedBoard() {}