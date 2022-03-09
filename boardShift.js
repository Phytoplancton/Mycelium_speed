
const BoardShift = (()=>{
    const createBoardShifter = (keyOne,keyTwo,boardDimension)=>{
        let shift = 0
        const changeCoords = (coord,isReverse)=>{
            if (isReverse){
                return mod(coord - shift, boardDimension) + Settings.boardMargin
            }
            return mod( coord + shift , boardDimension) - Settings.boardMargin
        }
        let shiftInterval
        let currentShiftLabel = ''
        
        const shiftCoords = (sign, shiftLabel)=>{
            if(currentShiftLabel !== shiftLabel){
                clearInterval(shiftInterval)
                shiftInterval = setInterval(() => {
                    shift += Settings.shiftStep * sign
                },Settings.shiftInterval );
                currentShiftLabel = shiftLabel
                console.log('shiftcoords')
            }
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
        'ArrowRight','ArrowLeft', Settings.boardWidth)
    const y = createBoardShifter(
        'ArrowDown','ArrowUp', Settings.boardHeight)
    
    return {
        x, y
    }

})()

