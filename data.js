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

var beginnerBoard = [['plain', 'plain', 'plain', 1, 'plain','plain','plain'],
                        ['plain',0,'plain','plain','plain',2,'plain'],
                        ['plain','plain','plain','plain','plain','plain','plain'],
                        ['obstacle','plain','plain','obstacle','plain','plain','obstacle'],
                        ['plain','plain','plain','plain','plain','plain','plain'],
                        ['plain','obstacle','plain','plain','plain',2,'plain'],
                        ['plain','plain','plain',3,'plain','plain','plain']
                    ]