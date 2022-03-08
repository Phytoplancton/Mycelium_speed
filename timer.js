
const Timer = (()=>{

    const T = {}

    T.gameStartet = false;
    T.timers = Array(Settings.playerCount).fill(Settings.maxTime);  
    T.redInterval;
    T.startReduction = ()=>{
        if (!T.gameStartet){
            T.redInterval = setInterval(()=>{
            T.timers[Settings.currentPlayer] -= Settings.reductionTime / 1000 + 0.012;
            WinningAlert.checkWinner();
            T.drawTimer();
            }, Settings.reductionTime);
        }
        T.gameStartet = true;
    }
    T.stopReduction = ()=>{
        clearInterval(T.redInterval)
    }
    T.drawTimer = ()=>{
        Canvas.timerCtx.clearRect(0, 0, window.innerWidth, window.innerHeight)
        Canvas.timerCtx.font = Settings.font
        for (var i = 0; i <= Settings.playerCount; i ++){
            
            Canvas.timerCtx.fillStyle = T.timerColor(i)
            var TextBlockheight = Settings.textZSpace*(i + 2);
            var text = T.timerText(i)

            Canvas.timerCtx.fillText(
                text,
                Settings.textMarginLeft,
                window.innerHeight - Settings.textMarginBottom - TextBlockheight)
        } 

        
    }
    T.timerText = (player)=>{
        var text = '';
        if (player == Settings.playerCount){
            text += 'remaining time: ';
        }
        else {
            var time = T.timers[Settings.playerCount - 1 - player]
            text += String(time).slice(0, 5);
        }
        return text;
    }
    T.timerColor = (player)=>{
        if (player == Settings.playerCount - 1 - Settings.currentPlayer){
            return Settings.playerColors[Settings.playerCount - 1 - player];
        }
        return Settings.neutralColor
        
    }
    


    return T
})()