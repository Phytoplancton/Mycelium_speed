const SporeVisual = (()=>{

    const drawPlayerScore = ()=>{
        for (var i = 0; i < Settings.playerCount; i ++){
            Canvas.scoreCtx.font = Settings.font
            Canvas.scoreCtx.fillStyle = Settings.neutralColor
            var TextBlockheight = Settings.textZSpace*Settings.playerCount
            Canvas.scoreCtx.fillText(
                `${Settings.playerNames[i]} player has ${SporeData.playerPointCount[i]} points`,
                window.innerWidth - Settings.textMarginRight,
                window.innerHeight - Settings.textMarginBottom 
                - TextBlockheight + Settings.textZSpace*i)        
        }

    }
    const drawScoreDiff = ()=>{
        var scoreDiff = SporeData.calcScoreDiff()
        Canvas.scoreCtx.font = Settings.font
        Canvas.scoreCtx.fillStyle = Settings.playerColors[SporeData.calcLeadingPlayer()]
        if (scoreDiff === 0 ){Canvas.scoreCtx.fillStyle = Settings.neutralColor}
        
        Canvas.scoreCtx.fillText(
            `the point difference is: ${scoreDiff} points`,
            Settings.textMarginLeft,
            window.innerHeight - Settings.textMarginBottom - Settings.textZSpace)    
        
    }

    const drawAllSpores = ()=>{
        SporeData.loopOverAllSpores(function(spore){
                var shiftedX = BoardShift.x.changeCoords(spore.x)
                var shiftedY = BoardShift.y.changeCoords(spore.y)
                Canvas.boardCtx.beginPath()
                Canvas.boardCtx.lineWidth = 0
                Canvas.boardCtx.fillStyle = Settings.playerColors[spore.player]
                Canvas.boardCtx.arc(shiftedX,shiftedY,Settings.sporeRadius,0,Math.PI*2,false)

                Canvas.boardCtx.fill()
            }
        )
    }
    const drawAllLines = ()=>{
        SporeData.loopOverAllSpores(function(spore1){
            var shiftedX = BoardShift.x.changeCoords(spore1.x)
            if(shiftedX<0 || shiftedX>window.innerWidth){return}
            var shiftedY = BoardShift.y.changeCoords(spore1.y)
            if(shiftedY<0 || shiftedY>window.innerHeight){return}
            SporeData.loopOverLinkedSpores(spore1,(spore1,spore2)=>{
                Canvas.boardCtx.beginPath()
                SporeData.checkIfColorsAreEqual(spore1,spore2)
                Canvas.boardCtx.lineWidth = Settings.lineWidth
                Canvas.boardCtx.moveTo(shiftedX,shiftedY)
                Canvas.boardCtx.lineTo(BoardShift.x.changeCoords(spore2.x),BoardShift.y.changeCoords(spore2.y))
                Canvas.boardCtx.stroke()
            })
        })
    }
    const markSporesInRange = ()=>{
        SporeData.loopOverAllSpores(function(spore1){
            console.log('marksporesInRange')
            var distToOtherSpore = SporeData.calcDistance(
                spore1.x,spore1.y,
                SporeData.tileifyCoord(BoardShift.x.changeCoords(MousePos.getX,true)),
                SporeData.tileifyCoord(BoardShift.y.changeCoords(MousePos.getY,true))
            )          

            if (distToOtherSpore < Settings.outerRadius){
                Canvas.timerCtx.beginPath()
                Canvas.timerCtx.strokeStyle = Settings.playerColors[spore1.player]
                Canvas.timerCtx.lineWidth = Settings.markingWidth
                Canvas.timerCtx.arc(BoardShift.x.changeCoords(spore1.x),BoardShift.y.changeCoords(spore1.y),Settings.sporeRadius,0,Math.PI*2,false)
                Canvas.timerCtx.stroke()
            }
        })
    }

    const drawProvisionalGrid = ()=>{
        for ( var x = 0; x<Settings.horizontalTileCount; x++){
            for (var y = 0 ; y<Settings.verticalTileCount; y++){
                Canvas.boardCtx.fillStyle = Settings.gridColor
                Canvas.boardCtx.fillRect(
                    BoardShift.x.changeCoords(Settings.tileLength * (x-Settings.tileMarkingLengthFactor),false), 
                    BoardShift.y.changeCoords(Settings.tileLength *(y-Settings.tileMarkingLengthFactor),false), 
                    Settings.tileLength * Settings.tileMarkingLengthFactor* 2,
                    Settings.tileLength * Settings.tileMarkingLengthFactor* 2,
                )
            }
        }
    }

    const drawBoard = ()=>{
        Canvas.boardCtx.clearRect(0,0,window.innerWidth,window.innerHeight)
        drawAllLines()
        drawAllSpores()
    }
    const drawScore = ()=>{
        Canvas.scoreCtx.clearRect(0,0,window.innerWidth,window.innerHeight)
        drawPlayerScore()
        drawScoreDiff()
    }

    return {
        drawBoard,
        drawScore,
        markSporesInRange
    }
})()