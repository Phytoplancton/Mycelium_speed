const WinningAlert = (()=>{

    const checkPointDiff = ()=>{
        if (SporeDatcalcScoreDiff() >= Settings.winningDiff){
            return true;
        }
        return false;
    }
    const checkTimer = ()=>{
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
    const checkWinner = ()=>{
        var timerWin = checkTimer();
        var pointWin = checkPointDiff();
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
        }

    }

    return {
        checkWinner
    }
})()
