const langToggle = document.querySelector('.card__certLang');

langToggle.addEventListener('click', (e)=>{
    e.currentTarget.classList.toggle('card__certLang--spanish');
    //don't forget to change the data-lang to spanish when toggling
});