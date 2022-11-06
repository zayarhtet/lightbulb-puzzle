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

function loadNewBoard(name) {
    return permaLoadJSON('boards')[name]
}

function saveBoard(name, board) {
    var boards = permaLoadJSON('boards')
    boards[name] = board
    permaSaveJSON('boards', boards)
}

function permaDeleteJSON(name){
    window.localStorage.removeItem(name)
}

function loadSavedGame(name) {
    return permaLoadJSON('savedGame')[name]
}

function saveGame(name, board, time) {
    var savedGame = permaLoadJSON('savedGame')
    savedGame[name] = {
        boardName: playerBoardName,
        board: board,
        time: time
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