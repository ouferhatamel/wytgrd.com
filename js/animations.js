const progressSection = document.querySelector('.sub__progress');
const progressBar = document.querySelector('.sub__progress__pourcentage');
const subNumber = document.querySelector('.sub__progress__number h2');
const footer = document.querySelector('.mnFtr');

let count = 0;
let flag = true;

window.addEventListener('scroll', ()=>{
    const secPosition = progressSection.getBoundingClientRect().top;
    const screenPosition = window.innerHeight;  
    if(secPosition < screenPosition){
        showProgress();
        if(flag){
            var interval = setInterval(()=>{
                count +=70;
            subNumber.innerText = count;
            if(count >= 7622){
                clearInterval(interval);     
            }
            flag=false;
            }, 1);
        }
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

