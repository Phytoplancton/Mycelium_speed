import * as settings from "./settings.js";
import * as customFunctions from "./customFunctions.js";


const createBoardShifter = (keyOne,keyTwo,boardDimension)=>{
    let shift = 0
    const changeCoords = (coord,isReverse)=>{
        if (isReverse){
            return customFunctions.mod(coord - shift, boardDimension) + settings.boardMargin
        }
        return customFunctions.mod( coord + shift , boardDimension) - settings.boardMargin
    }
    let shiftInterval
    let currentShiftLabel = ''
    
    const shiftCoords = (sign, shiftLabel)=>{
        if(currentShiftLabel !== shiftLabel){
            clearInterval(shiftInterval)
            shiftInterval = setInterval(() => {
                shift += settings.shiftStep * sign
            },settings.shiftInterval );
            currentShiftLabel = shiftLabel
            console.log('shiftcoords')
        }
        SporeVisual.drawBoard()
        
        
    }
    const clarShiftIntervalIfKey = (shiftLabel)=>{
        if (shiftLabel === currentShiftLabel){
            clearInterval(shiftInterval)
            currentShiftLabel = ''
            // console.log('clearShiftInterval')
        }
    }
    document.addEventListener('keyup', event => {
        clarShiftIntervalIfKey(event.key)
    })
    document.addEventListener('keydown',event => {
        switch (event.key){
            case keyOne:
                shiftCoords(-1, keyOne)
                break
            case keyTwo:
                shiftCoords(1, keyTwo)
                break
        }
        
    })

    console.log('arrowKeyListener added!')

    return {
        changeCoords
    }
}
const x = createBoardShifter(
    'ArrowRight','ArrowLeft', settings.boardWidth)
const y = createBoardShifter(
    'ArrowDown','ArrowUp', settings.boardHeight)

export {
    x, y
}


