export default class Loading {
    constructor($target){

        this.spinnerWrapper = document.createElement('div');
        this.spinnerWrapper.className = 'spinner-wrapper hidden';

        $target.appendChild(this.spinnerWrapper)

        this.render()
    }

    toggleSpinner(){
        const spinner = document.querySelector('.spinner-wrapper');
        spinner.classList.toggle('hidden')
    }

    render(){
        const spinnerImg = document.createElement('img');
        spinnerImg.className = 'spinner-image';
        spinnerImg.src = 'src/img/loading.gif';

        this.spinnerWrapper.appendChild(spinnerImg)
    }
}