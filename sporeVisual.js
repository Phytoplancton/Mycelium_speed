const SporeVisual = (()=>{
    const SV = {}


    SV.drawPlayerScore = ()=>{
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
    SV.drawScoreDiff = ()=>{
        var scoreDiff = SporeData.calcScoreDiff()
        Canvas.scoreCtx.font = Settings.font
        Canvas.scoreCtx.fillStyle = Settings.playerColors[SporeData.calcLeadingPlayer()]
        if (scoreDiff === 0 ){Canvas.scoreCtx.fillStyle = Settings.neutralColor}
        
        Canvas.scoreCtx.fillText(
            `the point difference is: ${scoreDiff} points`,
            Settings.textMarginLeft,
            window.innerHeight - Settings.textMarginBottom - Settings.textZSpace)    
        
    }

    SV.drawAllSpores = function(){
        SporeData.loopOverAllSpores(function(spore){
                var shiftedX = BoardShiftX.changeCoords(spore.x)
                var shiftedY = BoardShiftY.changeCoords(spore.y)
                Canvas.boardCtx.beginPath()
                Canvas.boardCtx.lineWidth = 0
                Canvas.boardCtx.fillStyle = Settings.playerColors[spore.player]
                Canvas.boardCtx.arc(shiftedX,shiftedY,Settings.sporeRadius,0,Math.PI*2,false)

                Canvas.boardCtx.fill()
            }
        )
    }
    SV.drawAllLines = function(){
        SporeData.loopOverAllSpores(function(spore1){
            var shiftedX = BoardShiftX.changeCoords(spore1.x)
            if(shiftedX<0 || shiftedX>window.innerWidth){return}
            var shiftedY = BoardShiftY.changeCoords(spore1.y)
            if(shiftedY<0 || shiftedY>window.innerHeight){return}
            SporeData.loopOverLinkedSpores(spore1,(spore1,spore2)=>{
                Canvas.boardCtx.beginPath()
                SporeData.checkIfColorsAreEqual(spore1,spore2)
                Canvas.boardCtx.lineWidth = Settings.lineWidth
                Canvas.boardCtx.moveTo(shiftedX,shiftedY)
                Canvas.boardCtx.lineTo(BoardShiftX.changeCoords(spore2.x),BoardShiftY.changeCoords(spore2.y))
                Canvas.boardCtx.stroke()
            })
        })
    }
    SV.drawSporesInRange = ()=>{
        SporeData.loopOverAllSpores(function(spore1){
            var distToOtherSpore = SporeData.calcDistance(
                spore1.x,spore1.y,
                SporeData.tileifyCoord(BoardShiftX.changeCoords(MousePosX,true)),
                SporeData.tileifyCoord(BoardShiftY.changeCoords(MousePosY,true))
            )          

            if (distToOtherSpore < Settings.outerRadius){
                Canvas.boardCtx.beginPath()
                Canvas.boardCtx.strokeStyle = Settings.playerColors[spore1.player]
                Canvas.boardCtx.lineWidth = Settings.markingWidth
                Canvas.boardCtx.arc(BoardShiftX.changeCoords(spore1.x),BoardShiftY.changeCoords(spore1.y),Settings.sporeRadius,0,Math.PI*2,false)
                Canvas.boardCtx.stroke()
            }
        })
    }

    SV.drawProvisionalGrid = ()=>{
        for ( var x = 0; x<Settings.horizontalTileCount; x++){
            for (var y = 0 ; y<Settings.verticalTileCount; y++){
                Canvas.boardCtx.fillStyle = Settings.gridColor
                Canvas.boardCtx.fillRect(
                    BoardShiftX.changeCoords(Settings.tileLength * (x-Settings.tileMarkingLengthFactor),false), 
                    BoardShiftY.changeCoords(Settings.tileLength *(y-Settings.tileMarkingLengthFactor),false), 
                    Settings.tileLength * Settings.tileMarkingLengthFactor* 2,
                    Settings.tileLength * Settings.tileMarkingLengthFactor* 2,
                )
            }
        }
    }
    

    return SV
})()