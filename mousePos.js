

//default Mouseposiion = undefined
let x;
let y;

const updateMousePos = (e)=>{
    x = e.clientX - 9
    y = e.clientY - 9
    console.log("Mousemove")
}
window.addEventListener('mousemove',updateMousePos)

export {
    x, y
}



