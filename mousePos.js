
const MousePos = (()=>{
    //default Mouseposiion = screen middle
    let x;
    let y;

    const updateMousePos = (e)=>{
        x = e.clientX - 9
        y = e.clientY - 9
        console.log("Mousemove")
    }
    window.addEventListener('mousemove',updateMousePos)

    return {
        get x(){return x}, 
        get y(){return y}
    }
})()



