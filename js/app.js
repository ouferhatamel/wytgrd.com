const langBtn = document.querySelector(".mnFtr__lang h4");
const mangList = document.querySelector('.mnFtr__langList');

langBtn.addEventListener('click', () =>{
    mangList.classList.toggle('mnFtr__langList--visible')
})


