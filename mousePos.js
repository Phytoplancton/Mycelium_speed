
const MousePos = (()=>{
    //default Mouseposiion = screen middle
    let x;
    let y;
    const getX = ()=>{return x}
    const getY = ()=>{return y}
    
    const updateMousePos = (e)=>{
        x = e.clientX - 9
        y = e.clientY - 9
        console.log("Mousemove")
    }
    window.addEventListener('mousemove',updateMousePos)

    return {getX, getY}
})()



