const Canvas = (()=>{
    let allCanvases = []
    const defineCanvas = (canvas, zInd, color = 'rgba(0,0,0,0.0)', opacity = 1)=>{
        allCanvases.push(canvas);
        canvas.style.position = "absolute";
        canvas.style.background = color;
        canvas.style.border = `0px solid `;
        canvas.style.zIndex = zInd;
        canvas.style.opacity = opacity;
    }

    const board = document.body.appendChild(document.createElement("canvas"));
    const boardCtx = board.getContext("2d");
    defineCanvas(board, '0', Settings.canvasColor);

    const score = document.body.appendChild(document.createElement("canvas"));
    const scoreCtx = score.getContext("2d");
    defineCanvas(score, '1');

    const timer = document.body.appendChild(document.createElement("canvas"));
    const timerCtx = timer.getContext("2d");
    defineCanvas(timer, '2')

    const donut = document.body.appendChild(document.createElement("canvas"));
    const donutCtx = donut.getContext("2d");
    defineCanvas(donut, '3', 'rgba(0,0,0,0.0)', 0.3)
    

    const setup = ()=>{
        document.body.style.backgroundColor = Settings.canvasColor;
        document.body.style.margin = '0 px'
        document.body.style.overflow = 'hidden';
        
    }
    setup()

    const resize = ()=>{
        allCanvases.forEach((canvas)=>{
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        })
    }

    return {
        boardCtx, scoreCtx, donutCtx, timerCtx,
        resize
    }

})()


