export function lazyLoad(){
    const lazyImages = [].slice.call(document.querySelectorAll("img.lazy"))

    if("IntersectionObserver" in window){
        let lazyImgObserver = new IntersectionObserver((entries,observer)=>{
            entries.forEach((entry)=>{
                if(entry.isIntersecting){
                    let lazyImage = entry.target;
                    lazyImage.src = lazyImage.dataset.src;
                    lazyImage.classList.remove('lazy');
                    lazyImgObserver.unobserve(lazyImage);
                }
            })
        })
    }
    lazyImages.forEach((lazyImage)=>{
        lazyImgObserver.observe(lazyImage)
    })
}