const searchInput = document.getElementById('searchInput');
const suggBox = document.querySelector('.searchCard__suggestions');
const suggList = document.querySelector('.suggestions__list');
const addBtn = document.querySelector('.searchCard__add');
//const edCheck = document.getElementById('card__edition');
//const shadCheck = document.getElementById('card__shadow');
const cardContainer = document.querySelector('.cards__list');
const numbCards = document.getElementById('recap__cardNumb');
const cardPrice = document.getElementById('recap__cardsPrice');
const deliveryPrice = document.getElementById('recap__delivery');
const totalPrice = document.getElementById('recap__total');
const validateCnt = document.querySelector('.submitCard');
const insuranceCheck = document.getElementById('submit__insurance');
const insrPrice = document.getElementById('recap__insurance');

//VARIABLES
let extension = 'Set de base';
let cardNumber = 0;
let crdPrice = 0;
let unitPrice = 9.95;
let delivery = 11.07;
let insurance = 0;
let total = 0;

//----------SAEARCH SUGGESTIONS----------
/*searchInput.onkeyup = (e)=>{
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
    
}*/
//----------ADDING A CARD----------
//addBtn.addEventListener('click', addCard);


//-----------SEARCH CARDS------------
addBtn.addEventListener('click', getCards);
//searchInput.onkeyup = getCards;
searchInput.onkeydown = clearList;
//FUNCTIONS
async function getCards(){
    suggList.innerHTML= '';
    let inputData = searchInput.value;
    if(inputData){
        const response = await fetch('https://api.pokemontcg.io/v2/cards');
        const res = await response.json();
        const results = res.data;
        printData(results, inputData);
    }else
        console.log('Fill name, please');
}
function printData(data, inputD){ 
    let containFlag = false;
    let inputData = inputD;
    data.map(card =>{
    if(card.name.toLocaleLowerCase().includes(inputData.toLocaleLowerCase())){
        containFlag = true;
        console.log(card.name);
        const item = document.createElement('li');
        item.innerHTML = `
                <img src="${card.images.small}" class="suggestion__list__cardImg" alt="wytgrd-pokemon-card">
                <div class="suggestion__cardInfo">
                    <div class="cardInfo__name"><strong>${card.name}</strong></div>
                    <div class="cardInfo__set">${card.set.name}</div>
                    <div class="cardInfo__year">${card.set.releaseDate.substring(0, 4)}</div>
                </div>
                <div class="cardInfo__addBasket">
                    <img src="../images/icons/wytgrd-basket-icon.svg" alt="wytgrd-basket-icon">
                </div>
        `
            suggList.appendChild(item);
    }
    });
    if(!containFlag)
        console.log('No such card !'); // PRINT ON A TIMEOUTED BOX
}
/*function selectedRes(element){
    let selectedItem = element.textContent;
    if(selectedItem != "No existe tal carta"){
        searchInput.value = selectedItem;
        suggBox.classList.remove('searchCard__suggestions--active');
    }
}*/
/*function showSuggestions(list){
    let listData;
    if(!list.length){
        listData = `<li>No existe tal carta</li>`;
    }else{
        listData = list.join('');
    }
    suggBox.innerHTML = listData;
}*/

function addCard(){
    const userInput = searchInput.value;
    const id = new Date().getTime().toString();
    let edition = '';
    let shadow = '';
    /*if(edCheck.checked){
        edition = 'Ed.1';
        edCheck.checked = false;
    }
    if(shadCheck.checked){
        shadow = 'Shadow';
        shadCheck.checked = false;
    }*/
    if(userInput != ''){
        const card = document.createElement('li');
        let attr = document.createAttribute('data-id');
        attr.value = id;
        card.setAttributeNode(attr);
        card.innerHTML = `
        <div class="card__description">
            <div class="card__name">${userInput}</div>
            <div class="card__extension">${extension}</div>
            <!--
            <div class="card__specifity">
                <div class="specifity__ed">${edition}</div>
                <div class="specifity__shad">${shadow}</div>
            </div>
            -->
        </div>
        <div class="card__specifity_checkbox">
            <div class="card__check">
                <input type="checkbox" id="card__edition" name="card__edition">
                <label for="card__edition">Ed.1</label>
            </div>
            <div class="card__check">
                <input type="checkbox" id="card__shadow" name="card__shadow">
                <label for="card__shadow">Shadow</label>
            </div>
        </div>
        <div class="card__noNotation">
            <div class="noNotation__toggle" data-lang="No"></div>
            <div class="noNotation__stroke"></div>
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
            <label for="card_value">El valor declarado</label>
            <span>€</span>
        </div>
        <div class="card__certLang">
            <div class="certLang__toggle" data-lang="En"></div>
            <div class="certlang__stroke"></div>
        </div>
        <div class="card__delete">
            <img src="../../images/icons/WYTGRD-delete-icon.svg" alt="WYTGRD-delete-icon">
        </div>`;
        cardContainer.append(card);
        searchInput.value = '';

        //Show the Validate container
        validateCnt.classList.add('submitCard--active');

        //Update card's number the number of added cards
        cardNumber++;
        numbCards.innerHTML = `${cardNumber} cartas`;

        //Update the price of the cards
        crdPrice = priceOfCards();
        cardPrice.innerHTML= `${crdPrice} €`;

        //Update delivery price
        if(cardNumber > 0)
        deliveryPrice.innerHTML = `${delivery} €`;

        //Update the total
        total = TotalCalc();
        totalPrice.innerHTML = `${total} €`;

        //Delete Card
        const delCardBtn = card.querySelector('.card__delete');
        delCardBtn.addEventListener('click', deleteCard);
        
        //Langage toggle
        const langToggle = card.querySelector('.card__certLang');
        langToggle.addEventListener('click', (e)=>{
            e.currentTarget.classList.toggle('card__certLang--spanish');
            //don't forget to change the data-lang to spanish when toggling
        });
        
        //Check if insurance is checked and add it to the invoice
        insuranceCheck.addEventListener('change', insurranceChecker);
    }else{
        //please enter a name
    }
}
function deleteCard(e){
    const item = e.currentTarget.parentElement;
    cardContainer.removeChild(item);
    //update the number of cards
    cardNumber--;
    numbCards.innerHTML = `${cardNumber} cartas`;
    ////Update the price of the cards
    crdPrice = priceOfCards();
    cardPrice.innerHTML= `${crdPrice} €`;
    //Update delivery price
    if(cardNumber < 1)
        deliveryPrice.innerHTML = `0 €`;
    
    //Update the total
    total = TotalCalc();
    totalPrice.innerHTML = `${total} €`;
}
function priceOfCards(){
    return cardNumber*unitPrice;
}
function TotalCalc(){
    if(cardNumber < 1){
        return 0;
        
    }else{
        return priceOfCards()+delivery+insurance;
    }
        
}
function insurranceChecker(e){
    if(e.target.checked){
        insurance=9.48;
        insrPrice.innerHTML = `${insurance} €`;
        total = TotalCalc();
        totalPrice.innerHTML = `${total} €`;
    }else{
        insurance=0;
        insrPrice.innerHTML = `${insurance} €`;
        total = TotalCalc();
        totalPrice.innerHTML = `${total} €`;
    }
        
}
function clearList(){
    if(!searchInput.value)
        suggList.innerHTML= '';
}