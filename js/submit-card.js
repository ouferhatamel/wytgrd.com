const searchInput = document.getElementById('searchInput');
const suggBox = document.querySelector('.searchCard__suggestions');
const addBtn = document.querySelector('.searchCard__add');
const edCheck = document.getElementById('card__edition');
const shadCheck = document.getElementById('card__shadow');
const cardContainer = document.querySelector('.cards__list');

let extension = 'Set de base';
//----------SAEARCH SUGGESTIONS----------
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

//----------ADDING A CARD----------
addBtn.addEventListener('click', addCard);


//FUNCTIONS
function selectedRes(element){
    let selectedItem = element.textContent;
    if(selectedItem != "No existe tal carta"){
        searchInput.value = selectedItem;
        suggBox.classList.remove('searchCard__suggestions--active');
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
function addCard(){
    const userInput = searchInput.value;
    const id = new Date().getTime().toString();
    let edition = '';
    let shadow = '';
    if(edCheck.checked){
        edition = 'Ed.1';
        edCheck.checked = false;
    }
        
    if(shadCheck.checked){
        shadow = 'Shadow';
        shadCheck.checked = false;
    }
        
    if(userInput != ''){
        const card = document.createElement('li');
        let attr = document.createAttribute('data-id');
        attr.value = id;
        card.setAttributeNode(attr);
        card.innerHTML = `<div class="card__description">
        <div class="card__name">${userInput}</div>
        <div class="card__extension">${extension}</div>
        <div class="card__specifity">
            <div class="specifity__ed">${edition}</div>
            <div class="specifity__shad">${shadow}</div>
        </div>
    </div>
    <div class="card_lang">
        <select name="languages" id="langs">
            <option value="Francés">Francés</option>
            <option value="Inglés">Inglés</option>
            <option value="Español">Español</option>
            <option value="Español">Español</option>
            <option value="Italiana">Italiana</option>
            <option value="Portugués">Portugués</option>
            <option value="Russe">Russe</option>
            <option value="Neerlandés">Neerlandés</option>
        </select>
    </div>
    <div class="card__value">
        <input type="number" id="card__value">
        <label for="card_value">El valor</label>
        <span>€</span>
    </div>
    <div class="card__certLang">
        <div class="certLang__toggle" data-lang="En"></div>
        <div class="certlang__stroke"></div>
    </div>
    <div class="card__delete">
        <img src="../images/icons/WYTGRD-delete-icon.svg" alt="WYTGRD-delete-icon">
        </div>`;

        //Delete Card
        const delCardBtn = card.querySelector('.card__delete');
        delCardBtn.addEventListener('click', deleteCard);
        console.log('heeere');
        cardContainer.append(card);
        searchInput.value = '';

        //Langage toggle
        const langToggle = card.querySelector('.card__certLang');
        langToggle.addEventListener('click', (e)=>{
            e.currentTarget.classList.toggle('card__certLang--spanish');
            //don't forget to change the data-lang to spanish when toggling
        });
        
    }else{
        //please enter a name
    }
}
function deleteCard(e){
    console.log('hele')
    const item = e.currentTarget.parentElement;
    cardContainer.removeChild(item);
}


