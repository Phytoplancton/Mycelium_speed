const Settings = (()=>{
    const S = {}

    //spore settings
    S.scalingFactor = 1.5
    S.sporeRadius = 5 *S.scalingFactor
    S.innerRadius = 20*S.scalingFactor //cant set other spores in this radius
    S.outerRadius = 70*S.scalingFactor // connects to other dots in this radius
    S.lineWidth = 2*S.scalingFactor

    //tile Settings
    S.tileLength = 5*S.scalingFactor
    S.tileMarkingLengthFactor = 0.25

    //board settings
    S.boardMargin = S.outerRadius
    S.horizontalTileCount = Math.ceil((window.innerWidth + S.boardMargin * 2) / S.tileLength)
    S.verticalTileCount = Math.ceil((window.innerHeight + S.boardMargin*2) / S.tileLength)
    S.setBoardDimensions = ()=>{    
        S.boardWidth = S.tileLength*S.horizontalTileCount
        S.boardHeight = S.tileLength*S.verticalTileCount
    }
    S.setBoardDimensions()

    //handling settings
    S.newSporeKey = 'Space'
    S.undeLastActionKey = 'z'

    //game 
    S.playerCount = 2
    S.maxConnections = 4

    S.playerColors
    S.playerNames
    S.winningDiff

    switch(S.playerCount){
        case 2:
            S.playerColors = ['red','rgb(220,220,220)']
            S.playerNames = ['red', 'white']
            S.winningDiff = 7
            break
        case 3:
            S.playerColors = ['red','rgb(220,220,220)','orange']
            S.playerNames = ['red', 'white','orange']
            S.winningDiff = 6
            break
        case 4:
            S.playerColors = ['#f3ac43','#efd15c','#1ed69b','#77aeb6']
            // S.playerColors = ['#4ac3be','#66cc8c','#cdaf69','#ca6560']
            // S.playerColors = ['#ef7b45','#f2d684','#4ec45c','#48acc2']
            S.playerNames = ['orange', 'yellow','green','blue']
            S.winningDiff = 5
            break 
    }

    //color settings
    S.canvasColor = 'rgb(25,25,25)'
    S.neutralColor = 'rgb(90,90,90)'
    S.gridColor = 'rgba(255,255,255,0.05)'

    //marking settings  
    S.markingColor = 'rgba(255,255,255,1)'
    S.markingWidth = 4

    //text settings
    S.textHeight = 20
    S.textZSpace = S.textHeight * 1.5
    S.font = `${S.textHeight}px Verdana`
    S.textMarginLeft = 15
    S.textMarginBottom = S.textMarginLeft
    S.textMarginRight = 290
    S.timerDecimalPlaces = 2

    //current player
    S.currentPlayer = 0
    S.nextPlayer = function(){
        S.currentPlayer ++
        S.currentPlayer %= S.playerCount
    }
    S.previousPlayer = ()=>{
        S.currentPlayer = (S.currentPlayer - 1 + S.playerCount)%S.playerCount
    }

    //shifter
    S.shiftInterval = 10
    S.shiftStep = 5

    //timer
    S.maxTime = 10.0 // seconds per player
    S.reductionTime = 100 // ms

    return S
})()

const mod = (m,n)=>{
    return (m%n + n)%n
}