
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

canvas.width = innerWidth;
canvas.height = innerHeight;

let mouse = {
    x: 0,
    y: 0
}
//helper
function getDist(x1,y1,x2,y2){
  return  Math.sqrt(Math.pow(x1-x2,2)+ Math.pow(y1-y2,2))
}


//color
let b1r = 255, b1g = 150, b1b = 251, b1a = 1;
let b2r = 150, b2g = 190, b2b = 255, b2a = 1;
let r=(b1r+b2r)/2,g=(b1g+b2g)/2,b=(b1b+b2b)/2,a=1;
let ballRadius = 50;
let colorChange = false;

class Ball{
        constructor(x,y,radius,color) {
            this.x = x;
            this.y = y;
            this.radius = radius;
            this.color = color;
        }
        draw(){
           ctx.beginPath();
           ctx.arc(this.x,this.y,this.radius,0, Math.PI * 2, false);
           ctx.fillStyle = this.color;
           ctx.fill();
           ctx.closePath();
        }
        update(){
            this.draw()
        }
}





class mouseBall extends Ball{
    update() {
        super.update();
        this.x = mouse.x;
        this.y = mouse.y;
        let grd = ctx.createRadialGradient(ball_1.x,ball_1.y, 0, ball_1.x, ball_1.y, ballRadius);
        grd.addColorStop(0, `rgba(${r},${g},${b},1)`);
        grd.addColorStop(1, `rgba(${r},${g},${b},0)`);
        if (colorChange){
            this.color = grd;
        }else{
            this.color =`rgba(${b1r},${b1g},${b1b},${b1a})`
        }
    }
}

// class mixBall extends Ball {
//     update() {
//         if (colorChange){
//             //맞닿는 부분 X,Y 구하기
//             if(ball_1.x > ball_2.x){
//                 touchX = ball_2.x+(Math.abs(ball_1.x-ball_2.x)/2);
//             }else if(ball_1.x < ball_2.x){
//                 touchX = ball_2.x-(Math.abs(ball_1.x-ball_2.x)/2);
//             }else{
//                 touchX = ball_2.x;
//             }
//
//             if(ball_1.y>ball_2.y){
//                 touchY = ball_2.y+(Math.abs(ball_1.y-ball_2.y)/2);
//             }else if(ball_1.y<ball_2.y){
//                 touchY = ball_2.y-(Math.abs(ball_1.y-ball_2.y)/2);
//             }else{
//                 touchY = ball_2.y;
//             }
//
//             this.x = touchX;
//             this.y = touchY;
//
//
//             if (this.radius < ballRadius){
//                 this.radius += 0.7;
//             }
//
//         }else{
//             if(this.radius>0.7){
//                 this.radius -= 0.7;
//             }
//         }
//         this.draw()
//     }
// }





const ball_1 = new mouseBall(0,0,ballRadius,`rgba(${b1r},${b1g},${b1b},${b1a})`)
const ball_2 = new Ball(canvas.width/2,canvas.height/2,ballRadius,`rgba(${b2r},${b2g},${b2b},${b2a})`)
// let touchX=ball_2.x,touchY=ball_2.y;
// const ball_3 = new mixBall(touchX,touchY,0,`rgba(${r},${g},${b},${a})`)

function animate(){
    requestAnimationFrame(animate);
    ctx.clearRect(0,0,canvas.width,canvas.height)
    ball_1.update()
    ball_2.update()
    //ball_3.update()
}

animate()


function moveHandler(e) {
    mouse = {
        x: e.clientX,
        y: e.clientY
    }
    getDist(ball_1.x,ball_1.y,ball_2.x,ball_2.y)<ballRadius*2? colorChange = true:colorChange = false;

}


window.addEventListener('mousemove', moveHandler)
