import * as settings from "./settings.js";
import * as canvas from "./canvas.js";
import * as winningAlert from "./winningAlert.js";


let gameStartet = false;
const timers = Array(settings.playerCount).fill(settings.maxTime);  
let redInterval;
const startReduction = ()=>{
    if (!gameStartet){
        redInterval = setInterval(()=>{
        timers[settings.currentPlayer] -= settings.reductionTime / 1000 + 0.012;
        winningAlert.checkWinner();
        drawTimer();
        }, settings.reductionTime);
    }
    gameStartet = true;
}
const stopReduction = ()=>{
    clearInterval(redInterval)
}
const drawTimer = ()=>{
    canvas.timerCtx.clearRect(0, 0, window.innerWidth, window.innerHeight)
    canvas.timerCtx.font = settings.font
    for (var i = 0; i <= settings.playerCount; i ++){
        
        canvas.timerCtx.fillStyle = timerColor(i)
        var TextBlockheight = settings.textZSpace*(i + 2);
        var text = timerText(i)

        canvas.timerCtx.fillText(
            text,
            settings.textMarginLeft,
            window.innerHeight - settings.textMarginBottom - TextBlockheight)
    } 

    
}
const timerText = (player)=>{
    var text = '';
    if (player == settings.playerCount){
        text += 'remaining time: ';
    }
    else {
        var time = timers[settings.playerCount - 1 - player]
        text += String(time).slice(0, 5);
    }
    return text;
}
const timerColor = (player)=>{
    if (player == settings.playerCount - 1 - settings.currentPlayer){
        return settings.playerColors[settings.playerCount - 1 - player];
    }
    return settings.neutralColor
    
} 

export {
    drawTimer, startReduction, stopReduction,
    timers
}
