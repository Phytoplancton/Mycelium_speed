import * as settings from "./settings.js";
import * as canvas from "./canvas.js";
import * as boardShift from "./boardShift.js";
import * as mousePos from "./mousePos.js";
import * as sporeData from "./sporeData.js";


const draw = ()=>{
    canvas.donutCtx.beginPath()
    canvas.donutCtx.strokeStyle = settings.playerColors[settings.currentPlayer]
    canvas.donutCtx.lineWidth = settings.outerRadius - settings.innerRadius
    canvas.donutCtx.arc(
        boardShift.x.changeCoords(sporeData.tileifyCoord(
            boardShift.x.changeCoords(mousePos.x,true),false)),
        boardShift.y.changeCoords(sporeData.tileifyCoord(
            boardShift.y.changeCoords(mousePos.y,true),false)),
        settings.innerRadius 
        + (settings.outerRadius-settings.innerRadius)/2 
        - settings.sporeRadius,
        0,Math.PI*2,false
    )
    
    canvas.donutCtx.stroke()

}


export {
    draw
}


