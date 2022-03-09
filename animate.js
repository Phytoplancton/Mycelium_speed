

function drawStaticCanvases(){
    SporeVisual.drawBoard()
    SporeVisual.drawScore()
}

function resize(){
    Canvas.resize()
    drawStaticCanvases()
    Settings.setBoardDimensions()

    console.log('canvas is resized!')

}

function placeNewSpore() {
    Timer.startReduction();
    let newSporeX = BoardShift.x.changeCoords( SporeData.tileifyCoord(BoardShift.x.changeCoords(MousePos.getX,true)),false);
    SporeData.addNewSpore(
        newSporeX,
        BoardShift.y.changeCoords( SporeData.tileifyCoord(BoardShift.y.changeCoords(MousePos.getY,true),false))
    )
    SporeData.checkSporesIfDead()
    SporeData.calculatePlayerPointCount()
    drawStaticCanvases()
    WinningAlert.checkWinner()

    // console.log('clickEvent')
    
}

function animateDonutAndSporeCanvas(){
    Canvas.donutCtx.clearRect(0,0,window.innerWidth,window.innerHeight)
    MouseDonut.draw()
    Timer.drawTimer()
    SporeVisual.markSporesInRange()
    
    requestAnimationFrame(animateDonutAndSporeCanvas)
}



(initalizeListeners = ()=>{
    resize()
    window.addEventListener('resize',resize) 
    animateDonutAndSporeCanvas()
    window.addEventListener('keydown',(event)=>{
        console.log('keydown - ' + event.code)
        if (event.code == Settings.newSporeKey){
            placeNewSpore()
        }
        if (event.key === Settings.undeLastActionKey){
            console.log('undoLastAction')
            SporeData.undoLastAction()
        }
    })
    console.log('animate is running!')

})()

