

const SporeData = (()=>{

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
    const playerPointCount = Array(Settings.playerCount).fill(0)

    const tileifyCoord = (coord)=>{
        distToTileCoord = mod(coord, Settings.tileLength)
        if(distToTileCoord > Settings.tileLength/2){
            return coord - distToTileCoord + Settings.tileLength
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
            spore2 = sporeArray[spore2Index]
            if (spore2.isActive){
                functionToRun(spore1,spore2)
            }

        })
    }

    const calcDistance = function(x1,y1,x2,y2){
        let calcTorusDist = (val1, val2 ,TorusWidth)=>{
            torusDist = (Math.abs(val1 - val2)+TorusWidth/2)%TorusWidth-TorusWidth/2
            return torusDist
        }
        let xDist = calcTorusDist(x1,x2,Settings.boardWidth)
        let yDist = calcTorusDist(y1,y2,Settings.boardHeight)
        return Math.sqrt(xDist**2 + yDist**2)
    }
    const connectSpores = function(spore1,spore2){
        spore1.numberOfConnections ++
        spore1.linkedTo.push(sporeArray.indexOf(spore2))
        spore2.numberOfConnections ++
        spore2.linkedTo.push(sporeArray.indexOf(spore1))
    }
    const addNewSpore = function(sporeX,sporeY){
        newSporeX = BoardShift.x.changeCoords(sporeX,true)
        newSporeY = BoardShift.y.changeCoords(sporeY,true)

        try {
            loopOverAllSpores(function(oldSpore) {
                if (calcDistance(oldSpore.x,oldSpore.y,newSporeX,newSporeY) < Settings.innerRadius){
                    throw 'too close'
                }
            })

            sporeArray.push(sporeConstructor(newSporeX,newSporeY,Settings.currentPlayer))
            let newCreatedSpore = sporeArray[sporeArray.length - 1]

            loopOverAllSpores(function(oldSpore){
                let distanceToOtherSpore = calcDistance(oldSpore.x,oldSpore.y,newSporeX,newSporeY)
                if (distanceToOtherSpore < Settings.outerRadius && distanceToOtherSpore !== 0){
                    connectSpores(newCreatedSpore,oldSpore)
                }
            })
            Settings.nextPlayer()
    
            console.log('NewSpore!')
        }
        catch(e){
            console.log(e)
        }


    }


    const checkIfColorsAreEqual = function(spore1,spore2){
        //checkSpores and set linecolor
        if(spore1.player === spore2.player){
            Canvas.boardCtx.strokeStyle = Settings.playerColors[spore1.player]
            // count Points
        }
        else {
            Canvas.boardCtx.strokeStyle = Settings.neutralColor
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
            
            if (spore.numberOfConnections > Settings.maxConnections && spore.player == player){
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
        for (let i = 0; i < Settings.playerCount; i ++){
            Settings.previousPlayer()
            let deadSporeIndices = deadSporeIndicesOfPlayerInArray(Settings.currentPlayer)
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
        let maxScore = Math.max(...playerPointCountCopy)
        playerPointCountCopy.splice(playerPointCountCopy.indexOf(maxScore), 1)
        let secondMaxScore = Math.max(...playerPointCountCopy)
        let PointDiff = maxScore-secondMaxScore
        return PointDiff
    }
    const calcLeadingPlayer = ()=>{ 
        let maxPoints = Math.max(...playerPointCount)
        let leadingPlayer = playerPointCount.indexOf(maxPoints)
        return leadingPlayer
    }



    return {
        addNewSpore, tileifyCoord,
        checkSporesIfDead, calculatePlayerPointCount, 
        loopOverAllSpores, calcScoreDiff,calcLeadingPlayer,
        loopOverLinkedSpores, calcDistance, checkIfColorsAreEqual,
        get playerPointCount(){return playerPointCount},
    }

})()

