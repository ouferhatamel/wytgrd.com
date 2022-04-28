const progressSection = document.querySelector('.sub__progress');
const progressBar = document.querySelector('.sub__progress__pourcentage');
const subNumber = document.querySelector('.sub__progress__number h2');

let count = 1;
window.addEventListener('scroll', ()=>{
    const secPosition = progressSection.getBoundingClientRect().top;
    const screenPosition = window.innerHeight;
    var interval = setInterval(counter, .2);
    function counter(){
        count +=70;
        subNumber.innerText = count;
        console.log(count);
        if(count >= 32703){
            clearInterval(interval);
            
        }
    }
    if(secPosition < screenPosition){
        showProgress();
        counter();
    }else{
        hideProgress();
        count=0;
    }
});

//FUNCTIONS
function showProgress(){
    progressBar.style.opacity = 1;
    progressBar.style.width = '70%';
}
function hideProgress(){
    progressBar.style.opacity = 0;
    progressBar.style.width = '0%';
}

