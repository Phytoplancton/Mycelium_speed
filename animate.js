

function drawBoardCanvas(){
    Canvas.boardCtx.clearRect(0,0,window.innerWidth,window.innerHeight)
    // SporeVisual.drawProvisionalGrid()
    SporeVisual.drawAllLines()
    SporeVisual.drawAllSpores()
    SporeVisual.drawSporesInRange()
}

function drawScoreCanvas(){
    Canvas.scoreCtx.clearRect(0,0,window.innerWidth,window.innerHeight)
    SporeVisual.drawPlayerScore()
    SporeVisual.drawScoreDiff()
}

function drawStaticCanvases(){
    drawBoardCanvas()
    drawScoreCanvas()
}

function resize(){
    Canvas.resize()
    drawStaticCanvases()
    Settings.setBoardDimensions()

    console.log('canvas is resized!')

}

function placeNewSpore() {
    Timer.startReduction();
    SporeData.addNewSpore(
        BoardShiftX.changeCoords( SporeData.tileifyCoord(BoardShiftX.changeCoords(MousePosX,true),false)),
        BoardShiftY.changeCoords( SporeData.tileifyCoord(BoardShiftY.changeCoords(MousePosY,true),false))
    )
    SporeData.checkSporesIfDead()
    SporeData.calculatePlayerPointCount()
    drawStaticCanvases()
    WinningAlert.checkWinner()

    // console.log('clickEvent')
    
}

function animateDonutAndSporeCanvas(){
    Canvas.donutCtx.clearRect(0,0,window.innerWidth,window.innerHeight)
    drawMouseDonut()
    drawBoardCanvas()
    
    requestAnimationFrame(animateDonutAndSporeCanvas)
}



(initalizeListeners = ()=>{
    resize()
    window.addEventListener('resize',resize) 
    animateDonutAndSporeCanvas()
    document.addEventListener('keydown',(event)=>{
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

