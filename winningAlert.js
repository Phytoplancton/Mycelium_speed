import * as settings from "./settings.js";
import * as sporeData from "./sporeData.js";
import * as timer from "./timer.js";


const checkPointDiff = ()=>{
    if (sporeData.calcScoreDiff() >= settings.winningDiff){
        return true;
    }
    return false;
}
const checkTimer = ()=>{
    if (timer.timers[settings.currentPlayer] <= 0){
        timer.timers[settings.currentPlayer] = 0;
        settings.nextPlayer();
    }
    else if (timer.timers.reduce((pv, cv) => pv + cv, 0) == 
    timer.timers[settings.currentPlayer]){
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
            alertString += `${settings.playerNames[settings.currentPlayer]}`
            + ` player wins! \n`
            alertString += 'timeout win! \n';
        }
        if (pointWin) {
            alertString += 
            `${settings.playerNames[sporeData.calcLeadingPlayer()]}`
            + ` player wins! \n`
            + 'point win! \n'
        }
        alert(alertString)
    }

}


export {
    checkWinner
}
