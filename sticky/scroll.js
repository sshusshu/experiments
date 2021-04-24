console.log(window)
const kv = document.querySelector('.kv-contianer');
const els = document.querySelectorAll('.motion');
const cards = document.querySelectorAll('.card');
const sec1 = document.querySelector('#sec-1');

let scrollBottom;

window.addEventListener('scroll', motionControl);

function addOnTrans(){
    scrollBottom = window.pageYOffset
    els.forEach(el=>{
        if(el.offsetTop < scrollBottom){
            el.classList.add('onTrans')
        }else{
            el.classList.remove('onTrans')
        }
    })
}

console.dir(kv.offsetHeight)

function changeTop(){
    scrollBottom = window.pageYOffset;
    const sec1Btm =sec1.offsetTop+sec1.offsetHeight;
    const elTop = (window.innerHeight-cards[0].clientHeight)/2;
    const elHeight = cards[0].offsetHeight;
   
    console.log(sec1Btm- elHeight, scrollBottom)
    cards.forEach(card=>{
        card.style.top = `${elTop}px`
    })
    if(els[0].classList.contains('onTrans')){
        cards[1].style.top = '-100px'
    }
    if(els[2].classList.contains('onTrans')){
        cards[0].style.top = '-100px'
        cards[1].style.top = `-${elTop+200}px`
    }
    if(scrollBottom> sec1Btm - screen.height){
  
            cards[0].style.top = `-${elHeight+200}px`
            cards[1].style.top = `-${elHeight+100}px`
            cards[2].style.top = `-${elHeight+300}px`

   
    }
    //console.dir(cards[0])
    
}


function motionControl(){
    addOnTrans();
    changeTop();
}