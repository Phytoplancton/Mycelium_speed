
//spore settings
const scalingFactor = 1.5
export const sporeRadius = 5 * scalingFactor
export const innerRadius = 20* scalingFactor 
//cant set other spores in this radius
export const outerRadius = 70* scalingFactor 
// connects to other dots in this radius
export const lineWidth = 2* scalingFactor

//tile Settings
export const tileLength = 5* scalingFactor
export const tileMarkingLengthFactor = 0.25

//board settings
export const boardMargin = outerRadius
export const horizontalTileCount = Math.ceil((window.innerWidth +  boardMargin * 2) / tileLength)
export const verticalTileCount = Math.ceil(  (window.innerHeight + boardMargin * 2) / tileLength)
export let boardWidth = 0;
export let boardHeight = 0;
export const setBoardDimensions = ()=>{    
    boardWidth =  tileLength * horizontalTileCount
    boardHeight = tileLength * verticalTileCount
}
setBoardDimensions()

//handling settings
export const newSporeKey = 'Space'
export const undeLastActionKey = 'z'

//game 
const playerCount = 2
export const maxConnections = 4

export let playerColors = []
export let playerNames = []
export let winningDiff = 0

switch(playerCount){
    case 2:
        playerColors = ['red','rgb(220,220,220)']
        playerNames = ['red', 'white']
        winningDiff = 7
        break
    case 3:
        playerColors = ['red','rgb(220,220,220)','orange']
        playerNames = ['red', 'white','orange']
        winningDiff = 6
        break
    case 4:
        playerColors = ['#f3ac43','#efd15c','#1ed69b','#77aeb6']
        // playerColors = ['#4ac3be','#66cc8c','#cdaf69','#ca6560']
        // playerColors = ['#ef7b45','#f2d684','#4ec45c','#48acc2']
        playerNames = ['orange', 'yellow','green','blue']
        winningDiff = 5
        break 
}

//color settings
export const canvasColor = 'rgb(25,25,25)'
export const neutralColor = 'rgb(90,90,90)'
export const gridColor = 'rgba(255,255,255,0.05)'

//marking settings  
export const markingColor = 'rgba(255,255,255,1)'
export const markingWidth = 4

//text settings
const textHeight = 20
export const textZSpace = textHeight * 1.5
export const font = `${textHeight}px Verdana`
export const textMarginLeft = 15
export const textMarginBottom = textMarginLeft
export const textMarginRight = 290
export const timerDecimalPlaces = 2

//current player
export let currentPlayer = 0
export const nextPlayer = function(){
    currentPlayer ++
    currentPlayer %= playerCount
}
export const previousPlayer = ()=>{
    currentPlayer = (currentPlayer - 1 + playerCount) % playerCount
}

//shifter
export const shiftInterval = 10
export const shiftStep = 5

//timer
export const maxTime = 300.0 // seconds per player
export const reductionTime = 100 // ms

