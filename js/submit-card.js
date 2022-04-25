const searchInput = document.querySelector('.searchCard__input input');
const suggBox = document.querySelector('.searchCard__suggestions');

const langToggle = document.querySelector('.card__certLang');

//Search suggestions
searchInput.onkeyup = (e)=>{
    let inputData = e.target.value;
    let dataArray = [];
    if(inputData){
        dataArray = cardList.filter(data =>{
            return data.toLocaleLowerCase().startsWith(inputData.toLocaleLowerCase());
        });
        dataArray = dataArray.map(data =>{
            return data = `<li>${data}</li>`;
        });
        suggBox.classList.add('searchCard__suggestions--active');
        showSuggestions(dataArray);
        let searchResult = suggBox.querySelectorAll('li');
        for (let i = 0; i < searchResult.length; i++) {
            searchResult[i].setAttribute('onclick', 'selectedRes(this)');  
        }
    }else{
        suggBox.classList.remove('searchCard__suggestions--active');
    }
    
}
//Certification langage toggle
langToggle.addEventListener('click', (e)=>{
    e.currentTarget.classList.toggle('card__certLang--spanish');
    //don't forget to change the data-lang to spanish when toggling
});


//FUNCTIONS
function selectedRes(element){
    let selectedItem = element.textContent;
    if(selectedItem != "No existe tal carta"){
        searchInput.value = selectedItem;
    }
}
function showSuggestions(list){
    let listData;
    if(!list.length){
        listData = `<li>No existe tal carta</li>`;
    }else{
        listData = list.join('');
    }
    suggBox.innerHTML = listData;
}

