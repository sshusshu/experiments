const canvas = document.querySelector('#converted');
const ctx = canvas.getContext('2d');

const imageCanvas = document.querySelector('#original')
const imageCtx = imageCanvas.getContext('2d')


canvas.width = innerWidth;
canvas.height= innerHeight;
addEventListener('resize',()=>{
    canvas.width = innerWidth;
    canvas.height= innerHeight;
})


    const img= new Image();
    img.src = "./images/starry_night.jpg"
    img.onload = function(e){
        resize_image(img)
        getRGBA();
    }


const getRGBA = e => {
    const imgData = [...imageCtx.getImageData(0, 0, img.width, img.height).data];

    let pixelArr = [];
    while (imgData.length > 0) {
        pixelArr.push(imgData.splice(0, 4))
    }
    let canvasArr = [];
    while (pixelArr.length > 0) {
        canvasArr.push(pixelArr.splice(0, img.width))
    }

    for (let i = 0; i < canvasArr.length - 1; i+=2) {
        for (let j = 0; j < img.width - 5; j+=6) {
            let r = Math.floor((canvasArr[i][j][0] + canvasArr[i][j + 1][0] + canvasArr[i][j + 2][0] + canvasArr[i][j + 3][0] + canvasArr[i][j + 4][0] + canvasArr[i][j + 5][0] +
                                   canvasArr[i + 1][j][0] + canvasArr[i + 1][j + 1][0] + canvasArr[i + 1][j + 2][0]+ canvasArr[i + 1][j + 3][0]+ canvasArr[i + 1][j + 4][0]+ canvasArr[i + 1][j + 5][0]) / 12)
            let g = Math.floor((canvasArr[i][j][1] + canvasArr[i][j + 1][1] + canvasArr[i][j + 2][1] + canvasArr[i][j + 3][1] + canvasArr[i][j + 4][1] + canvasArr[i][j + 5][1] +
                                   canvasArr[i + 1][j][1] + canvasArr[i + 1][j + 1][1] + canvasArr[i + 1][j + 2][1]+ canvasArr[i + 1][j + 3][1]+ canvasArr[i + 1][j + 4][1]+ canvasArr[i + 1][j + 5][1]) / 12)
            let b = Math.floor((canvasArr[i][j][2] + canvasArr[i][j + 1][2] + canvasArr[i][j + 2][2] + canvasArr[i][j + 3][2] + canvasArr[i][j + 4][2] + canvasArr[i][j + 5][2] +
                                   canvasArr[i + 1][j][2] + canvasArr[i + 1][j + 1][2] + canvasArr[i + 1][j + 2][2]+ canvasArr[i + 1][j + 3][2]+ canvasArr[i + 1][j + 4][2]+ canvasArr[i + 1][j + 5][2]) / 12)
        }
    }

    console.log(canvasArr[0].length, canvasArr.length)
    let mosaics = []
    for (let i =0; i<canvasArr.length;i++){
        for (let j= 0; j < canvasArr[0].length; j++){
            mosaics.push(new Mosaic(j*17,i*17,16,16,`rgba(${canvasArr[i][j].join(',')})`))
        }
    }

    function drawMosaic(){
        for(let i =0; i<mosaics.length;i++){
            mosaics[i].draw();
        }
    }

    drawMosaic();
    }



class Mosaic {
    constructor(x, y,width,height,color) {
        this.x = x
        this.y = y
        this.width = width
        this.height = height
        this.color = color
    }

    draw() {
        ctx.beginPath()
        ctx.rect(this.x, this.y,this.width,this.height)
        ctx.fillStyle = this.color
        ctx.fill()
        ctx.closePath()
    }

    update() {
        this.draw()
    }
}


const resize_image = image => {
    let max_size = 100,
        width = image.width,
        height = image.height;

    if (width > height) {
        // 가로가 길 경우
        if (width > max_size) {
            height *= max_size / width;
            width = max_size;
        }
    } else {
        // 세로가 길 경우
        if (height > max_size) {
            width *= max_size / height;
            height = max_size;
        }
    }
    image.width = width;
    image.height = height;
    imageCtx.drawImage(image, 0, 0, width, height);
}
