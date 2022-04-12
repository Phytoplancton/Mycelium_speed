import * as settings from "./settings.js";
import * as boardShift from "./boardShift.js";
import * as customFunctions from "./customFunctions.js";
import * as canvas from "./canvas.js";



const sporeConstructor = (x,y,player)=>{
    const Spore = {}

    Spore.x = x
    Spore.y = y
    Spore.isActive = true
    Spore.numberOfConnections = 0
    Spore.linkedTo = []
    Spore.player = player

    return Spore
}
let sporeArray = []
const playerPointCount = Array(settings.playerCount).fill(0)

const tileifyCoord = (coord)=>{
    let distToTileCoord = customFunctions.mod(coord, settings.tileLength)
    if(distToTileCoord > settings.tileLength/2){
        return coord - distToTileCoord + settings.tileLength
    }
    return coord - distToTileCoord
}

const loopOverAllSpores = function(functionToRun){
    sporeArray.forEach((spore,sporeIndex) => {
        if (spore.isActive){
            functionToRun(spore,sporeIndex)
        }
    })
}
const loopOverLinkedSpores = (spore1, functionToRun)=>{
    spore1.linkedTo.forEach((spore2Index)=>{
        let spore2 = sporeArray[spore2Index]
        if (spore2.isActive){
            functionToRun(spore1,spore2)
        }

    })
}

const calcDistance = function(x1,y1,x2,y2){
    let calcTorusDist = (val1, val2 ,TorusWidth)=>{
        let torusDist = (Math.abs(val1 - val2)+TorusWidth/2)%TorusWidth-TorusWidth/2
        return torusDist
    }
    let xDist = calcTorusDist(x1,x2,settings.boardWidth)
    let yDist = calcTorusDist(y1,y2,settings.boardHeight)
    return Math.sqrt(xDist**2 + yDist**2)
}
const connectSpores = function(spore1,spore2){
    spore1.numberOfConnections ++
    spore1.linkedTo.push(sporeArray.indexOf(spore2))
    spore2.numberOfConnections ++
    spore2.linkedTo.push(sporeArray.indexOf(spore1))
}
const addNewSpore = function(sporeX,sporeY){
    let newSporeX = boardShift.x.changeCoords(sporeX,true)
    let newSporeY = boardShift.y.changeCoords(sporeY,true)

    try {
        loopOverAllSpores(function(oldSpore) {
            if (calcDistance(oldSpore.x,oldSpore.y,newSporeX,newSporeY) < settings.innerRadius){
                throw 'too close'
            }
        })

        sporeArray.push(sporeConstructor(newSporeX,newSporeY,settings.currentPlayer))
        let newCreatedSpore = sporeArray[sporeArray.length - 1]

        loopOverAllSpores(function(oldSpore){
            let distanceToOtherSpore = calcDistance(oldSpore.x,oldSpore.y,newSporeX,newSporeY)
            if (distanceToOtherSpore < settings.outerRadius && distanceToOtherSpore !== 0){
                connectSpores(newCreatedSpore,oldSpore)
            }
        })
        settings.nextPlayer()

        console.log('NewSpore!')
    }
    catch(e){
        console.log(e)
    }


}

const checkIfColorsAreEqual = function(spore1,spore2){
    //checkSpores and set linecolor
    if(spore1.player === spore2.player){
        canvas.boardCtx.strokeStyle = settings.playerColors[spore1.player]
        // count Points
    }
    else {
        canvas.boardCtx.strokeStyle = settings.neutralColor
    }
}

const calculatePlayerPointCount = () => {
    playerPointCount.fill(0)
    loopOverAllSpores((spore1)=>{
        loopOverLinkedSpores(spore1,(spore1,spore2)=>{
            if(spore1.player == spore2.player){
                playerPointCount[spore1.player] += 0.5
            }
        })
    })
}

const deadSporeIndicesOfPlayerInArray = (player) => {
    let deadSpores = []
    loopOverAllSpores((spore,sporeIndex) => {
        
        if (spore.numberOfConnections > settings.maxConnections && spore.player == player){
            deadSpores.push(sporeIndex)
        }
    })
    return deadSpores
}
const removeSpore = (deadSporeIndex) => {
    deadSpore = sporeArray[deadSporeIndex]
    deadSpore.isActive = false
    deadSpore.linkedTo.forEach((linkedSporeIndex)=>{
        let linkedSpore = sporeArray[linkedSporeIndex]
        linkedSpore.numberOfConnections --
    })
}
const checkSporesIfDead = () => {
    for (let i = 0; i < settings.playerCount; i ++){
        settings.previousPlayer()
        let deadSporeIndices = deadSporeIndicesOfPlayerInArray(settings.currentPlayer)
        deadSporeIndices.forEach((deadSporeIndex)=>{
            removeSpore(deadSporeIndex)
        })
    }
}

// undoLastAction = ()=>{
//     indexToDelete = sporeArray.length - 1
//     while(!sporeArray[indexToDelete].isActive){
//         indexToDelete--
//     }
//     removeSpore(indexToDelete)
//     Settings.currentPlayer = sporeArray[indexToDelete].player
// }

const calcScoreDiff = ()=>{
    let playerPointCountCopy = [...playerPointCount]
    let maxScore = customFunctions.arrayMax(playerPointCountCopy)
    playerPointCountCopy.splice(
        playerPointCountCopy.indexOf(maxScore), 1)
    let secondMaxScore = 
    customFunctions.arrayMax(playerPointCountCopy)
    let PointDiff = maxScore-secondMaxScore
    return PointDiff
}
const calcLeadingPlayer = ()=>{ 
    let maxPoints = Math.max(...playerPointCount)
    let leadingPlayer = playerPointCount.indexOf(maxPoints)
    return leadingPlayer
}



export {
    addNewSpore, tileifyCoord,
    checkSporesIfDead, calculatePlayerPointCount, 
    loopOverAllSpores, calcScoreDiff,calcLeadingPlayer,
    loopOverLinkedSpores, calcDistance, checkIfColorsAreEqual,
    playerPointCount
}

