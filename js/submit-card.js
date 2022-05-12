const searchInput = document.getElementById('searchInput');
const suggBox = document.querySelector('.searchCard__suggestions');
const suggList = document.querySelector('.suggestions__list');
const searchBtn = document.querySelector('.searchCard__search');
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
const loader = document.querySelector('.suggestions__loader');
const inputCnt = document.querySelector('.searchCard__input');
const inputMsg = document.querySelector('.search__input__msg');
const offerTxt = document.querySelector('.recap__head span');
const pokeGame = document.getElementById('pokemon-game');
const magicGame = document.getElementById('magic-game');
const yuGame = document.getElementById('yu-game');
const pokeLabel = document.querySelector('.c-game__pokemon label');
const magicLabel = document.querySelector('.c-game__magic label');
const yuLabel = document.querySelector('.c-game__yu label');

//VARIABLES
let extension = '';
let cardNumber = 0;
let crdPrice = 0;
let unitPrice = 10.15;
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


//-----------SEARCH CARDS------------
searchBtn.addEventListener('click', getCards);
searchInput.onkeydown = clearList;

//FUNCTIONS
//Card game Radio click
pokeGame.addEventListener('click', ()=>{
    pokeLabel.style.opacity = '1';
    magicLabel.style.opacity ='.5';
    yuLabel.style.opacity ='.5';
});
magicGame.addEventListener('click', ()=>{
    magicLabel.style.opacity ='1';
    pokeLabel.style.opacity = '.5';
    yuLabel.style.opacity ='.5';
});
yuGame.addEventListener('click', ()=>{
    yuLabel.style.opacity ='1';
    magicLabel.style.opacity ='.5';
    pokeLabel.style.opacity = '.5';
});
//Fetching cards from the pokemon API
async function getCards(){
    //Check if a card game is chosen
    if(!pokeGame.checked && !magicGame.checked && !yuGame.checked){
        const c_gameRadio = document.querySelector('.searchCard__c-game');
        const c_gameHead = document.querySelector('.c-game-h1');
        c_gameRadio.classList.add('searchCard__c-game--choose');
        c_gameHead.style.transform
        setTimeout(()=>{
            c_gameRadio.classList.remove('searchCard__c-game--choose');
        },1000);
    }else{
        suggList.innerHTML= '';
        let inputData = searchInput.value;
        let url = '';
        let sfx = 'data';
        let gameFlag = '';
        try{
            if(inputData){
                loader.style.display = 'flex';
                //Checking the chosen cards game
                if(pokeGame.checked){
                    url = `https://api.pokemontcg.io/v2/cards?q=name:"${inputData}"`;
                    sfx = 'data';
                    gameFlag = 'Pokemon';
                }else if(magicGame.checked){
                    url = `https://api.magicthegathering.io/v1/cards?name=${inputData}`;
                    sfx = 'cards';
                    gameFlag = 'Magic';
                }else if(yuGame.checked){
                    console.log('ça passe ici yugi')
                    url = `https://db.ygoprodeck.com/api/v7/cardinfo.php?fname=${inputData}`;
                    sfx = 'data';
                    gameFlag = 'Yu'
                }
                //Fetching the data
                const response = await fetch(url);
                const res = await response.json();
                const results = res[sfx];
                console.log(results);
                printData(results, inputData, gameFlag);
            }else{
                inputMsg.textContent = 'Rellene el nombre de la carta';
                inputMsg.style.display = 'inherit';
                inputCnt.style.borderColor = 'red';
                setTimeout(() =>{
                    inputMsg.style.display = 'none';
                    inputCnt.style.borderColor = 'inherit';
                }, 3000);
            }
        }catch(e){
            loader.style.display = 'none';
            inputMsg.textContent = '404 - El enlace al servidor está roto o es erróneo';
            inputMsg.style.display = 'inherit';
            console.log('Error', e.message);
        }
    }
}
//Printing the search results on the list
function printData(data, inputD, g_flag){ 
    let containFlag = false; //When it equals to true, means that at least one card has been found
    let inputData = inputD;
    
    data.map(card =>{
    if(card.name.toLocaleLowerCase().includes(inputData.toLocaleLowerCase())){
        containFlag = true;
        loader.style.display = 'none';
        const item = document.createElement('li');
        if(g_flag == 'Pokemon'){

            item.innerHTML = `
                <img src="${card.images.small}" class="suggestion__list__cardImg" alt="wytgrd-pokemon-card">
                <div class="suggestion__cardInfo">
                    <div class="cardInfo__name"><strong>${card.name}</strong></div>
                    <div class="cardInfo__set">${card.set.name}</div>
                    <div class="cardInfo__year">${card.set.releaseDate.substring(0, 4)}}</div>
                </div>
                <a class="cardInfo__addBasket" href="#cards">
                    <img src="../images/icons/wytgrd-basket-icon.svg" alt="wytgrd-basket-icon">
                </a>
        `
        }else if(g_flag == 'Magic'){
            console.log('its the magic')
            item.innerHTML = `
                <img src="${card.imageUrl}" class="suggestion__list__cardImg" alt="wytgrd-magic-theGathering-card" onerror="this.onerror=null;this.src='../images/others/wytgrd-magic-the-gathering-back.jpg';" >
                <div class="suggestion__cardInfo">
                    <div class="cardInfo__name"><strong>${card.name}</strong></div>
                    <div class="cardInfo__set">${card.setName}</div>
                </div>
                <a class="cardInfo__addBasket" href="#cards">
                    <img src="../images/icons/wytgrd-basket-icon.svg" alt="wytgrd-basket-icon">
                </a>
        `
        }else if(g_flag == 'Yu'){
            let c_set = '';
            if(!card.hasOwnProperty('card_sets')){
                console.log('No set property')
                c_set = 'No set name';
            }else{
                c_set = card.card_sets[0].set_name;
            }
            item.innerHTML = `
                <img src="${card.card_images[0].image_url_small}" class="suggestion__list__cardImg" alt="wytgrd-yugioh-card" onerror="this.onerror=null;this.src='../images/others/wytgrd-yugioh-back.jpg';" >
                <div class="suggestion__cardInfo">
                    <div class="cardInfo__name"><strong>${card.name}</strong></div>
                    <div class="cardInfo__set">${c_set}</div>
                </div>
                <a class="cardInfo__addBasket" href="#cards">
                    <img src="../images/icons/wytgrd-basket-icon.svg" alt="wytgrd-basket-icon">
                </a>
        `
        }
        suggList.appendChild(item);
        //ADDING TO THE ORDER LIST
        const addItemBtn = item.querySelector('.cardInfo__addBasket');
        addItemBtn.addEventListener('click',addItem);
    }
    });
    if(!containFlag){
        inputMsg.textContent = 'No existe tal carta. Asegúrese de que el nombre está escrito correctamente.';
        inputMsg.style.display = 'inherit';
        inputCnt.style.borderColor = 'red';
        setTimeout(() =>{
            inputMsg.style.display = 'none';
            inputCnt.style.borderColor = 'inherit';
        }, 3000);
        
        loader.style.display = 'none';
    }
}
//Add a card element to the order list
function addItem(e){
    console.log('Im executed !');
    const card = e.currentTarget.parentElement;
    const cardName = card.querySelector('.cardInfo__name').textContent;
    const setName = card.querySelector('.cardInfo__set').textContent;
    //const cardRyear = card.querySelector('.cardInfo__year').textContent;

    //Create the card element
    const cardElement = document.createElement('li');
    let attr = document.createAttribute('data-id');
    const id = new Date().getTime().toString();
    attr.value = id;
    cardElement.setAttributeNode(attr);
    cardElement.innerHTML = `
        <!--FIRST LINE-->
        <div class="f_line">
            <div class="card__description">
                <div class="card__name">${cardName}</div>
                <div class="card__extension">${setName}</div>
            </div>
            <div class="card__specifity_checkbox">
                <div class="card__check">
                    <input type="checkbox" id="card__edition" name="card__spec">
                    <label for="card__edition">Ed.1</label>
                </div>
                <div class="card__check">
                    <input type="checkbox" id="card__shadow" name="card__spec">
                    <label for="card__shadow">Shadowless</label>
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
            <div class="card__certLang">
                <div class="certLang__toggle" data-lang="En"></div>
                <div class="certlang__stroke"></div>
            </div>
            <div class="card__value">
                <input type="number" id="card__value">
                <span>€</span>
            </div>
            <div class="card__noNotation">
                <div class="noNotation__toggle" data-lang="No"></div>
                <div class="noNotation__stroke"></div>
            </div>
            <div class="card__delete">
                <img src="../images/icons/wytgrd-delete-icon.svg" alt="WYTGRD-delete-icon">
            </div>
        </div>
        <!--MINIMAL NOTE-->
        <div class="minimalNote">
            <div class="minimalNote__checkbox">
                <input type="checkbox" class="minimal">
                <label for="minimal">Puntuación mínima </label>
                <span class="hint">i</span>
                <div class="minimalNote__hint">
                    Por debajo de una calificación de su elección, le devolveremos sus tarjetas sin protección, o las protegeremos utilizando la <strong>A</strong> de <strong>Anticorrupción</strong>.
                </div>
            </div>
            <div class="minimalNote__dtls">
                <span>Por debajo de</span>
                <select name="notes" id="notes">
                    <option value="-">---</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="9.5">9.5</option>
                    <option value="10">10</option>
                </select>
                <input type="radio" name="cert-auth" id="return">
                <label for="return">Devolver como está</label>
                <input type="radio" name="cert-auth" id="auth">
                <label for="auth">Certificar con la nota Auténtica</label>
            </div>
        </div>
        `;
    cardContainer.append(cardElement);

    //Update card's number the number of added cards
    cardNumber++;
    numbCards.innerHTML = `${cardNumber} cartas`;

    //Update the price of the cards
    crdPrice = priceOfCards();
    cardPrice.innerHTML= `${crdPrice} €`;

    //Update delivery price
    if(cardNumber > 0)
    deliveryPrice.innerHTML = `${delivery} €`;

    //Check if insurance is checked and add it to the invoice
    insuranceCheck.addEventListener('change', insurranceChecker);

    //Update the total
    total = TotalCalc();
    totalPrice.innerHTML = `${total} €`;

    //Delete the card element
    const delCardBtn = cardElement.querySelector('.card__delete');
    delCardBtn.addEventListener('click', deleteCard);

    //Langage toggle
    const langToggle = cardElement.querySelector('.card__certLang');
    langToggle.addEventListener('click', (e)=>{
        e.currentTarget.classList.toggle('card__certLang--spanish');
        //don't forget to change the data-lang to spanish when toggling
    });

    //No notation toggle
    const noNot = cardElement.querySelector('.card__noNotation');
    noNot.addEventListener('click', (e)=>{
        e.currentTarget.classList.toggle('card__noNotation--on');
    });

    //Minimal note
    const minimalCheck = cardElement.querySelector('.minimal');
    const minimalDtls = cardElement.querySelector('.minimalNote__dtls');
    minimalCheck.addEventListener('change', (e)=>{
        if (e.currentTarget.checked){
            minimalDtls.style.display = 'inherit';
        }else{
            minimalDtls.style.display = 'none';
        }
    });
    
    //Show the Validate container
    validateCnt.classList.add('submitCard--active');
}
//Clear the search results list when input data is eraised
function clearList(){
    if(!searchInput.value)
        suggList.innerHTML= '';
}
//Delete a card from the order list
function deleteCard(e){
    const item = e.currentTarget.parentElement.parentElement;
    console.log(item);
    cardContainer.removeChild(item);
    //update the number of cards
    cardNumber--;
    numbCards.innerHTML = `${cardNumber} cartas`;
    //Update the price of the cards
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
    if(cardNumber >= 10){
        offerTxt.textContent = 'Oferta 01'
        offerTxt.style.display = 'inherit';
        unitPrice = 9.95;
        if(cardNumber >= 20){
            offerTxt.textContent = 'Oferta 02'
            offerTxt.style.display = 'inherit';
            unitPrice = 9.50;
            if(cardNumber >=50){
                offerTxt.textContent = 'Oferta 03'
                offerTxt.style.display = 'inherit';
                unitPrice = 8.95;
            }
        }
    }else{
        offerTxt.style.display = 'none';
        unitPrice = 10.15;
    }
    console.log(unitPrice);
    let c_price = cardNumber*unitPrice;
    return parseFloat(c_price.toFixed(2));
}
function TotalCalc(){
    if(cardNumber < 1){
        return 0;
        
    }else{
        let c_price = priceOfCards();
        return (c_price + delivery + insurance).toFixed(2);
    }
        
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
function insurranceChecker(e){
    if(e.target.checked){
        console.log(insurance);
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
