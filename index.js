const canvas = document.querySelector('#image');
const ctx = canvas.getContext('2d');
const body = document.querySelector('body')


const canvas2 = document.querySelector('#manipulated');
const ctx2 = canvas2.getContext('2d');
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


    let  manipulatedImgData = [] ;
    for (let i = 0; i < canvasArr.length - 1; i++) {
        for (let j = 0; j < img.width - 3; j++) {
            let r = Math.floor((canvasArr[i][j][0] + canvasArr[i][j + 1][0] + canvasArr[i][j + 2][0] + canvasArr[i][j + 3][0] +
                                   canvasArr[i + 1][j][0] + canvasArr[i + 1][j + 1][0] + canvasArr[i + 1][j + 2][0]+ canvasArr[i + 1][j + 3][0]) / 8)
            let g = Math.floor((canvasArr[i][j][1] + canvasArr[i][j + 1][1] + canvasArr[i][j + 2][1] + canvasArr[i][j + 3][1]+
                                   canvasArr[i + 1][j][1] + canvasArr[i + 1][j + 1][1] + canvasArr[i + 1][j + 2][1]+ canvasArr[i + 1][j + 3][1]) / 8)
            let b = Math.floor((canvasArr[i][j][2] + canvasArr[i][j + 1][2] + canvasArr[i][j + 2][2] +  canvasArr[i][j + 3][2] +
                                   canvasArr[i + 1][j][2] + canvasArr[i + 1][j + 1][2] + canvasArr[i + 1][j + 2][2]+ canvasArr[i + 1][j + 3][2]) / 8)

            const div = document.createElement('div');
            body.appendChild(div)
            div.classList.add('.div')
            div.style.backgroundColor = `rgba(${r},${g},${b},255)`
            manipulatedImgData.push(r,g,b,255)

        }
        const br = document.createElement('br');
        body.appendChild(br)
    }

let myImgData = ctx2.createImageData(canvas.width,canvas.height);

    for (let i =0 ;myImgData.data.length;i+=4){
        myImgData.data[i+0] = manipulatedImgData[i+0];
        myImgData.data[i+1] = manipulatedImgData[i+1];
        myImgData.data[i+2] = manipulatedImgData[i+2];
        myImgData.data[i+3] = manipulatedImgData[i+3];
    }
console.log(manipulatedImgData)
   ctx2.putImageData(manipulatedImgData,0,0,)

    // const path = new Path2D('M46,46s93-17,149-6,7,25,7,25L123,77,56,71S-26,72,46,46Z');
    // ctx.fillStyle = 'black'
    // ctx.stroke(path);
    // ctx.fill(path);
    // console.log(path)
    //

    // const divs = document.querySelectorAll('.div')
    // console.log(div)
    // body.addEventListener('mousemove',(e)=>{
    //     // if (e.target !== body){
    //     //     e.target.style
    //     // }
    //     divs.forEach((div)=>{
    //         console.log(e.clientX,e.clientY,div.offsetTop)
    //         if (Math.abs(e.clientX - div.offsetLeft) + Math.abs(e.clientY - div.offsetTop) < 400){
    //             div.style.transform = 'rotate(90deg)'
    //         }
    //     })
    //
    // })



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


