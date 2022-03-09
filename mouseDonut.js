const MouseDonut = (()=>{
    const draw = ()=>{
        Canvas.donutCtx.beginPath()
        Canvas.donutCtx.strokeStyle = Settings.playerColors[Settings.currentPlayer]
        Canvas.donutCtx.lineWidth = Settings.outerRadius - Settings.innerRadius
        Canvas.donutCtx.arc(
            BoardShift.x.changeCoords(SporeData.tileifyCoord(BoardShift.x.changeCoords(MousePos.getX(),true),false)),
            BoardShift.y.changeCoords(SporeData.tileifyCoord(BoardShift.y.changeCoords(MousePos.getY(),true),false)),
            Settings.innerRadius + (Settings.outerRadius-Settings.innerRadius)/2 - Settings.sporeRadius,
            0,Math.PI*2,false
        )
        
        Canvas.donutCtx.stroke()
    }

    return {
        draw
    }
})()
function drawMouseDonut(){
    

}

