const water = document.querySelector('.water');
const body = document.querySelector('body');
const deco = document.querySelector('.deco');
water.setAttribute('d',`M0,0 Q${body.offsetWidth/2},${body.offsetHeight/5} ${body.offsetWidth},0`)
water.setAttribute('fill','url(#grd1)')

deco.innerHTML = `
        <linearGradient id="grd1" x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" style="stop-color:rgb(151,175,229);stop-opacity:1" />
            <stop offset="100%" style="stop-color:rgb(151,239,229);stop-opacity:1" />
        </linearGradient>     
`
const mouse ={
    x:0,
    y:0
}

window.addEventListener('mousemove', moveHandler)
window.addEventListener('click', clickHandler)
window.addEventListener('mouseleave',leaveHandler)

function moveHandler(e) {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
    if(mouse.y>body.offsetHeight/3){
        mouse.y = body.offsetHeight/3
    }
    water.setAttribute('d',`M0,0 
    C${mouse.x-dropRadius},0 ${mouse.x-dropRadius},${mouse.y} ${mouse.x},${mouse.y} 
    C${mouse.x+dropRadius},${mouse.y} ${mouse.x+dropRadius},0 ${body.offsetWidth},0 
    T0,0`)
    //water.style.transition='d 0.1s ease-in-out'
}

function clickHandler(e) {
   const drop = new Drop(dropRadius,'rgb(151,175,229)')
   drop.draw();
   drop.animate();
   //water.setAttribute('d',`M0,0 Q${mouse.x},${mouse.y*2-20} ${body.offsetWidth},0`)
}

function leaveHandler() {
   // window.removeEventListener(moveHandler)
    water.setAttribute('d',`M0,0 Q${body.offsetWidth/2},${body.offsetHeight/5} ${body.offsetWidth},0`)
}




const drops = document.createElement('div');
let dropRadius = 200
class Drop{
    constructor(r,color) {
        this.r = r;
        this.color = color;
    }

    draw(){
        drops.style.transition= 'all 2s ease-in-out'
        drops.style.position = 'absolute';
        drops.style.zIndex = '-1';
        drops.style.top= `${mouse.y-dropRadius}px`;
        drops.style.left = `${mouse.x}px`;
        drops.style.transform= 'translate(-50%,0) scale(1.2)';
        drops.style.width = `${this.r}px`;
        drops.style.height = `${this.r}px`;
        drops.style.borderRadius = '50%';
        drops.style.backgroundColor = this.color;
        body.appendChild(drops)
    }
    animate(){
        drops.style.transform= `translate(-50%,${body.offsetHeight}px) scale(1)`;
        drops.style.backgroundColor = '#e595e5'
    }
}
