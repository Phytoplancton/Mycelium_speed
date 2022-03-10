
const Timer = (()=>{


    let gameStartet = false;
    const timers = Array(Settings.playerCount).fill(Settings.maxTime);  
    let redInterval;
    const startReduction = ()=>{
        if (!gameStartet){
            redInterval = setInterval(()=>{
            timers[Settings.currentPlayer] -= Settings.reductionTime / 1000 + 0.012;
            WinningAlert.checkWinner();
            drawTimer();
            }, Settings.reductionTime);
        }
        gameStartet = true;
    }
    const stopReduction = ()=>{
        clearInterval(redInterval)
    }
    const drawTimer = ()=>{
        Canvas.timerCtx.clearRect(0, 0, window.innerWidth, window.innerHeight)
        Canvas.timerCtx.font = Settings.font
        for (var i = 0; i <= Settings.playerCount; i ++){
            
            Canvas.timerCtx.fillStyle = timerColor(i)
            var TextBlockheight = Settings.textZSpace*(i + 2);
            var text = timerText(i)

            Canvas.timerCtx.fillText(
                text,
                Settings.textMarginLeft,
                window.innerHeight - Settings.textMarginBottom - TextBlockheight)
        } 

        
    }
    const timerText = (player)=>{
        var text = '';
        if (player == Settings.playerCount){
            text += 'remaining time: ';
        }
        else {
            var time = timers[Settings.playerCount - 1 - player]
            text += String(time).slice(0, 5);
        }
        return text;
    }
    const timerColor = (player)=>{
        if (player == Settings.playerCount - 1 - Settings.currentPlayer){
            return Settings.playerColors[Settings.playerCount - 1 - player];
        }
        return Settings.neutralColor
        
    } 

    return {
        drawTimer, startReduction, 
        get timers(){return timers}
    }
})()