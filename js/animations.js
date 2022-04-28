const progressSection = document.querySelector('.sub__progress');
const progressBar = document.querySelector('.sub__progress__pourcentage');
console.log('70%');

window.addEventListener('scroll', ()=>{
    console.log('70%');
    const secPosition = progressSection.getBoundingClientRect().top;
    const screenPosition = window.innerHeight;
    if(secPosition < screenPosition){
        showProgress();
    }else{
        hideProgress();
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