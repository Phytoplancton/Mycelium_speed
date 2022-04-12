import * as settings from "./settings.js";
import * as sporeData from "./sporeData.js";
import * as boardShift from "./boardShift.js";
import * as mousePos from "./mousePos.js";
import * as canvas from "./canvas.js";


const drawPlayerScore = ()=>{
    for (var i = 0; i < settings.playerCount; i ++){
        canvas.scoreCtx.font = settings.font
        canvas.scoreCtx.fillStyle = settings.neutralColor
        var TextBlockheight = settings.textZSpace*settings.playerCount
        canvas.scoreCtx.fillText(
            `${settings.playerNames[i]} player has ${sporeData.playerPointCount[i]} points`,
            window.innerWidth - settings.textMarginRight,
            window.innerHeight - settings.textMarginBottom 
            - TextBlockheight + settings.textZSpace*i)        
    }

}
const drawScoreDiff = ()=>{
    var scoreDiff = sporeData.calcScoreDiff()
    canvas.scoreCtx.font = settings.font
    canvas.scoreCtx.fillStyle = settings.playerColors[sporeData.calcLeadingPlayer()]
    if (scoreDiff === 0 ){canvas.scoreCtx.fillStyle = settings.neutralColor}
    
    canvas.scoreCtx.fillText(
        `the point difference is: ${scoreDiff} points`,
        settings.textMarginLeft,
        window.innerHeight - settings.textMarginBottom - settings.textZSpace)    
    
}

const drawAllSpores = ()=>{
    sporeData.loopOverAllSpores(function(spore){
            var shiftedX = boardShift.x.changeCoords(spore.x)
            var shiftedY = boardShift.y.changeCoords(spore.y)
            canvas.boardCtx.beginPath()
            canvas.boardCtx.lineWidth = 0
            canvas.boardCtx.fillStyle = settings.playerColors[spore.player]
            canvas.boardCtx.arc(shiftedX,shiftedY,settings.sporeRadius,0,Math.PI*2,false)

            canvas.boardCtx.fill()
        }
    )
}
const drawAllLines = ()=>{
    sporeData.loopOverAllSpores(function(spore1){
        var shiftedX = boardShift.x.changeCoords(spore1.x)
        if(shiftedX<0 || shiftedX>window.innerWidth){return}
        var shiftedY = boardShift.y.changeCoords(spore1.y)
        if(shiftedY<0 || shiftedY>window.innerHeight){return}
        sporeData.loopOverLinkedSpores(spore1,(spore1,spore2)=>{
            canvas.boardCtx.beginPath()
            sporeData.checkIfColorsAreEqual(spore1,spore2)
            canvas.boardCtx.lineWidth = settings.lineWidth
            canvas.boardCtx.moveTo(shiftedX,shiftedY)
            canvas.boardCtx.lineTo(boardShift.x.changeCoords(spore2.x),boardShift.y.changeCoords(spore2.y))
            canvas.boardCtx.stroke()
        })
    })
}
const markSporesInRange = ()=>{
    sporeData.loopOverAllSpores(function(spore1){
        var distToOtherSpore = sporeData.calcDistance(
            spore1.x,spore1.y,
            sporeData.tileifyCoord(boardShift.x.changeCoords(mousePos.x,true)),
            sporeData.tileifyCoord(boardShift.y.changeCoords(mousePos.y,true))
        )          

        if (distToOtherSpore < settings.outerRadius){
            canvas.timerCtx.beginPath()
            canvas.timerCtx.strokeStyle = settings.playerColors[spore1.player]
            canvas.timerCtx.lineWidth = settings.markingWidth
            canvas.timerCtx.arc(boardShift.x.changeCoords(spore1.x),boardShift.y.changeCoords(spore1.y),settings.sporeRadius,0,Math.PI*2,false)
            canvas.timerCtx.stroke()
        }
    })
}

const drawProvisionalGrid = ()=>{
    for ( var x = 0; x<settings.horizontalTileCount; x++){
        for (var y = 0 ; y<settings.verticalTileCount; y++){
            canvas.boardCtx.fillStyle = settings.gridColor
            canvas.boardCtx.fillRect(
                boardShift.x.changeCoords(settings.tileLength * (x-settings.tileMarkingLengthFactor),false), 
                boardShift.y.changeCoords(settings.tileLength *(y-settings.tileMarkingLengthFactor),false), 
                settings.tileLength * settings.tileMarkingLengthFactor* 2,
                settings.tileLength * settings.tileMarkingLengthFactor* 2,
            )
        }
    }
}

const drawBoard = ()=>{
    canvas.boardCtx.clearRect(0,0,window.innerWidth,window.innerHeight)
    drawAllLines()
    drawAllSpores()
}
const drawScore = ()=>{
    canvas.scoreCtx.clearRect(0,0,window.innerWidth,window.innerHeight)
    drawPlayerScore()
    drawScoreDiff()
}

export {
    drawBoard,
    drawScore,
    markSporesInRange
}
