const WinningAlert = (()=>{
    const A = {}

    A.checkPointDiff = ()=>{
        if (SporeData.calcScoreDiff() >= Settings.winningDiff){
            return true;
        }
        return false;
    }
    A.checkTimer = ()=>{
        if (Timer.timers[Settings.currentPlayer] <= 0){
            Timer.timers[Settings.currentPlayer] = 0;
            Settings.nextPlayer();
        }
        else if (Timer.timers.reduce((pv, cv) => pv + cv, 0) == 
        Timer.timers[Settings.currentPlayer]){
            return true;
        }
        return false;
    }
    A.checkWinner = ()=>{
        var timerWin = A.checkTimer();
        var pointWin = A.checkPointDiff();
        if (timerWin || pointWin){
            var alertString = ''
            if (timerWin){
                alertString += `${Settings.playerNames[Settings.currentPlayer]}`
                + ` player wins! \n`
                alertString += 'timeout win! \n';
            }
            if (pointWin) {
                alertString += 
                `${Settings.playerNames[SporeData.calcLeadingPlayer()]}`
                + ` player wins! \n`
                + 'point win! \n'
            }
            alert(alertString)
            window.location.reload();
        }

    }

    return A
})()
