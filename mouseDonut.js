const MouseDonut = (()=>{
    const draw = ()=>{
        Canvas.donutCtx.beginPath()
        Canvas.donutCtx.strokeStyle = Settings.playerColors[Settings.currentPlayer]
        Canvas.donutCtx.lineWidth = Settings.outerRadius - Settings.innerRadius
        Canvas.donutCtx.arc(
            UserInput.BoardShiftX.changeCoords(SporeData.tileifyCoord(UserInput.BoardShiftX.changeCoords(UserInput.getMousePosX(),true),false)),
            UserInput.BoardShiftY.changeCoords(SporeData.tileifyCoord(UserInput.BoardShiftY.changeCoords(UserInput.getMousePosY(),true),false)),
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

