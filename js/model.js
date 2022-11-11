var documentBodyElem = document.body;
var mainBox = document.getElementById('main-box')
var playerName = document.getElementById('playerNameInput')
var timer = 0
var stopWatch
var playerBoardName

function delegate(parent, child, when, what){
    function eventHandlerFunction(event){
        let eventTarget  = event.target
        let eventHandler = this
        let closestChild = eventTarget.closest(child)

        if(eventHandler.contains(closestChild)){
            what(event, closestChild)
        }
    }
    parent.addEventListener(when, eventHandlerFunction)
}

function permaSaveJSON(name, value){
    window.localStorage.setItem(name, JSON.stringify(value))
}

function permaLoadJSON(name){
    return JSON.parse(window.localStorage.getItem(name))
}

function permaDeleteJSON(name){
    window.localStorage.removeItem(name)
}

function loadNewBoard(name) {
    return permaLoadJSON('boards')[name]
}

function saveBoard(name, board) {
    var boards = permaLoadJSON('boards')
    boards[name] = board
    permaSaveJSON('boards', boards)
}

function loadSavedGameList() {
    return permaLoadJSON('savedGame')
}

function loadSavedGame(name) {
    return permaLoadJSON('savedGame')[name]
}

function loadScoreBoard() {
    return permaLoadJSON('scoreBoard')
}

function saveScoreBoard(scoreBoard) {
    permaSaveJSON('scoreBoard', scoreBoard)
}

function removeSavedGame(name) {
    var savedGame = permaLoadJSON('savedGame')
    delete savedGame[name]
    permaSaveJSON('savedGame', savedGame)
}

function saveGame(name, board, time) {
    var savedGame = permaLoadJSON('savedGame')
    var m = new Date();
    var dateString = m.getUTCFullYear() +"/"+ (m.getUTCMonth()+1) +"/"+ m.getUTCDate() + " " + m.getUTCHours() + ":" + m.getUTCMinutes() + ":" + m.getUTCSeconds();
    savedGame[name] = {
        dateTime: dateString,
        boardName: playerBoardName,
        board: board,
        elapsedTime: time
    }
    permaSaveJSON('savedGame', savedGame)
}

function removeBoard(name) {
    var boards = permaLoadJSON('boards')
    delete boards[name]
    permaSaveJSON('boards', boards)
}

function loadData() {
    if (permaLoadJSON('boards') == null) {
        permaSaveJSON('boards', {})
        saveBoard('beginnerBoard',  beginnerBoard)
        saveBoard('intermediateBoard', intermediateBoard)
        saveBoard('advancedBoard', advancedBoard)
        console.log('boards loaded')
    }
    if (permaLoadJSON('savedGame') == null) {
        permaSaveJSON('savedGame', {})
    }
    if (permaLoadJSON('scoreBoard') == null) {
        permaSaveJSON('scoreBoard', [])
    }
}

function recordTheScore() {
    var beginnerBoard = loadSavedGame(playerName.value)
    var time = beginnerBoard['elapsedTime']
    var boardName = beginnerBoard['boardName']
    var board = beginnerBoard['board']
    var player = playerName.value
    var scoreBoard = loadScoreBoard()
    var m = new Date();
    var dateString = m.getUTCFullYear() +"/"+ (m.getUTCMonth()+1) +"/"+ m.getUTCDate() + " " + m.getUTCHours() + ":" + m.getUTCMinutes() + ":" + m.getUTCSeconds();
    scoreBoard.push({
        'player':player, 
        'boardName': boardName, 
        'elapsedTime': time, 
        'board': board,
        'dateTime': dateString})
    console.log("was here")
    saveScoreBoard(scoreBoard)
}

function loadBoardList() {
    return permaLoadJSON('boards')
}

function saveBoardList(boardList) {
    permaSaveJSON('boards', boardList)
}

var advancedBoard = [
    ['plain','obstacle','plain','plain','plain','plain','plain','plain','plain','plain'],
    ['plain','plain','plain','plain','plain',3,'plain',2,'plain','obstacle'],
    ['plain',0,'obstacle','plain','plain','plain','plain','obstacle','plain','plain'],
    ['plain','plain','plain','plain','obstacle','plain','plain','plain','plain','plain'],
    ['plain',1,'plain','plain','obstacle',1,'obstacle','plain','plain','plain'],
    ['plain','plain','plain','obstacle','obstacle','obstacle','plain','plain',3,'plain'],
    ['plain','plain','plain','plain','plain','obstacle','plain','plain','plain','plain'],
    ['plain','plain',1,'plain','plain','plain','plain',0,'obstacle','plain'],
    [3,'plain','obstacle','plain',0,'plain','plain','plain','plain','plain'],
    ['plain','plain','plain','plain','plain','plain','plain','plain',0,'plain']
]

var intermediateBoard = [
    ['plain','plain',0,'plain','obstacle','plain','plain'],
    ['plain','plain','plain','plain','plain','plain','plain'],
    ['obstacle','plain', 'obstacle','plain',3,'plain','obstacle'],
    ['plain','plain','plain',1,'plain','plain','plain'],
    [2,'plain', 'obstacle','plain','obstacle','plain','obstacle'],
    ['plain','plain','plain','plain','plain','plain','plain'],
    ['plain','plain','obstacle','plain',2,'plain','plain'],
]

var beginnerBoard = [
    ["plain","plain","plain",1,"plain","plain","plain"],
    ["plain",0,"plain","plain","plain",2,"plain"],
    ["plain","plain","plain","plain","plain","plain","plain"],
    ["obstacle","plain","plain","obstacle","plain","plain","obstacle"],
    ["plain","plain","plain","plain","plain","plain","plain"],
    ["plain","obstacle","plain","plain","plain",2,"plain"],
    ["plain","plain","plain",3,"plain","plain","plain"]
]

loadData()