import * as settings from "./settings.js";
import * as sporeVisual from "./sporeVisual.js";
import * as canvas from "./canvas.js";
import * as sporeData from "./sporeData.js";
import * as boardShift from "./boardShift.js";
import * as mouseDonut from "./mouseDonut.js";
import * as timer from "./timer.js";
import * as mousePos from "./mousePos.js";
import * as winningAlert from "./winningAlert.js";

const drawStaticCanvases = ()=>{
    sporeVisual.drawBoard()
    sporeVisual.drawScore()
}

const resize = ()=>{
    canvas.resize()
    drawStaticCanvases()
    settings.setBoardDimensions()

    console.log('canvas is resized!')

}

const placeNewSpore = ()=>{
    timer.startReduction();
    sporeData.addNewSpore(
        boardShift.x.changeCoords( 
            sporeData.tileifyCoord(
                boardShift.x.changeCoords(mousePos.x,true)
            ),false),
        boardShift.y.changeCoords( sporeData.tileifyCoord(boardShift.y.changeCoords(mousePos.y,true),false))
    )
    sporeData.checkSporesIfDead()
    sporeData.calculatePlayerPointCount()
    drawStaticCanvases()
    winningAlert.checkWinner()

    // console.log('clickEvent')
    
}

const animateDonutAndSporeCanvas = ()=>{
    canvas.donutCtx.clearRect(0,0,window.innerWidth,window.innerHeight)
    mouseDonut.draw()
    timer.drawTimer()
    sporeVisual.markSporesInRange()
    sporeVisual.drawBoard()
    
    requestAnimationFrame(animateDonutAndSporeCanvas)
}



const initalizeListeners = (()=>{
    resize()
    
    window.addEventListener('resize',resize) 
    animateDonutAndSporeCanvas()
    window.addEventListener('keydown',(event)=>{
        console.log('keydown - ' + event.code)
        if (event.code == settings.newSporeKey){
            placeNewSpore()
        }
        if (event.key === settings.undeLastActionKey){
            console.log('undoLastAction')
        }
    })
    console.log('animate is running!')
})()

