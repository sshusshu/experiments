const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
const body = document.querySelector('body')

// canvas.width = innerWidth;
// canvas.height= innerHeight;
// addEventListener('resize',()=>{
//     canvas.width = innerWidth;
//     canvas.height= innerHeight;
// })





    const img= new Image();
    img.src = "./images/starry_night.jpg"
    img.onload = function(e){
        resize_image(img);
        getRGBA();
    }



const getRGBA = e => {
    let pixelArr = [];
    const imgData = [...ctx.getImageData(0, 0, img.width, img.height).data];
    //const imgDataLeng = imgData.length;

    //for (let i =0;i<imgData.length;i+=4){
    while (imgData.length > 0) {
        pixelArr.push(imgData.splice(0, 4))
    }
    console.log(pixelArr)

    let canvasArr = [];
    while (pixelArr.length > 0) {
        canvasArr.push(pixelArr.splice(0, img.width))
    }


    for (let i = 0; i < canvasArr.length - 1; i++) {
        for (let j = 0; j < img.width - 2; j++) {
            let r = Math.floor((canvasArr[i][j][0] + canvasArr[i][j + 1][0] + canvasArr[i][j + 2][0] +
                canvasArr[i + 1][j][0] + canvasArr[i + 1][j + 1][0] + canvasArr[i + 1][j + 2][0]) / 6)
            let g = Math.floor((canvasArr[i][j][1] + canvasArr[i][j + 1][1] + canvasArr[i][j + 2][1] +
                canvasArr[i + 1][j][1] + canvasArr[i + 1][j + 1][1] + canvasArr[i + 1][j + 2][1]) / 6)
            let b = Math.floor((canvasArr[i][j][2] + canvasArr[i][j + 1][2] + canvasArr[i][j + 2][2] +
                canvasArr[i + 1][j][2] + canvasArr[i + 1][j + 1][2] + canvasArr[i + 1][j + 2][2]) / 6)

            const span = document.createElement('span');
            body.appendChild(span)
            span.style.display = 'inline-block'
            span.style.width = '6px'
            span.style.height = '3px'
            span.style.backgroundColor = `rgba(${r},${g},${b},255)`
        }

        const br = document.createElement('br');
        body.appendChild(br)
    }
}








const resize_image = image => {
    let max_size = 200,
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
    ctx.drawImage(image, 0, 0, width, height);
};


