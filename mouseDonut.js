function drawMouseDonut(){
    Canvas.donutCtx.beginPath()
    Canvas.donutCtx.strokeStyle = Settings.playerColors[Settings.currentPlayer]
    Canvas.donutCtx.lineWidth = Settings.outerRadius - Settings.innerRadius
    // console.log(Settings.playerColors[Settings.currentPlayer])
    Canvas.donutCtx.arc(
        // MousePosX, MousePosY,
        BoardShiftX.changeCoords( SporeData.tileifyCoord(BoardShiftX.changeCoords(MousePosX,true)),false),
        BoardShiftY.changeCoords( SporeData.tileifyCoord(BoardShiftY.changeCoords(MousePosY,true),false)),
        Settings.innerRadius + (Settings.outerRadius-Settings.innerRadius)/2 - Settings.sporeRadius,
        0,Math.PI*2,false
    )
    Canvas.donutCtx.stroke()

}

