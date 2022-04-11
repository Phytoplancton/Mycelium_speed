const Animate = (()=>{
    drawStaticCanvases = ()=>{
        SporeVisual.drawBoard()
        SporeVisual.drawScore()
    }
    
    resize = ()=>{
        Canvas.resize()
        drawStaticCanvases()
        Settings.setBoardDimensions()
    
        console.log('canvas is resized!')
    
    }
    
    placeNewSpore = ()=>{
        Timer.startReduction();
        SporeData.addNewSpore(
            BoardShift.x.changeCoords( SporeData.tileifyCoord(BoardShift.x.changeCoords(MousePos.x,true)),false),
            BoardShift.y.changeCoords( SporeData.tileifyCoord(BoardShift.y.changeCoords(MousePos.y,true),false))
        )
        SporeData.checkSporesIfDead()
        SporeData.calculatePlayerPointCount()
        drawStaticCanvases()
        WinningAlert.checkWinner()
    
        // console.log('clickEvent')
        
    }
    
    animateDonutAndSporeCanvas = ()=>{
        Canvas.donutCtx.clearRect(0,0,window.innerWidth,window.innerHeight)
        MouseDonut.draw()
        Timer.drawTimer()
        SporeVisual.markSporesInRange()
        SporeVisual.drawBoard()
        
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
            }
        })
        console.log('animate is running!')
    
    })()
    
    
})()

