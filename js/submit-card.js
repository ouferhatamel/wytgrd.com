const searchInput = document.getElementById('searchInput');
const suggBox = document.querySelector('.searchCard__suggestions');
const suggList = document.querySelector('.suggestions__list');
const searchBtn = document.querySelector('.searchCard__search');
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

//-----------SEARCH CARDS------------
//Search cards
searchBtn.addEventListener('click', getCards);

//Enter key for search button
searchInput.onkeyup = (e)=>{
    if (e.keyCode === 13){
        getCards();
    }
        
};

//Empty the search results 
searchInput.onkeydown = clearList;

//Show howTo explanation
const show_howTo = document.querySelector('.searchCard__howTo h3');
show_howTo.addEventListener('click', ()=>{
    const howTo = document.querySelector('.howTo');
    howTo.classList.toggle('howTo--shown');
});

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

///////////////////
//FUNCTIONS////////
///////////////////
//Fetching cards from the pokemon, Magic the gathering and the Yu gi oh APIs
async function getCards(){

    //Check if a card game is chosen
    if(!pokeGame.checked && !magicGame.checked && !yuGame.checked){

        const c_gameRadio = document.querySelector('.searchCard__c-game');
        c_gameRadio.classList.add('searchCard__c-game--choose');

        //Shake the card game bloc
        setTimeout(()=>{
            c_gameRadio.classList.remove('searchCard__c-game--choose');
        },1000);

    }
    else{
        suggList.innerHTML= '';
        let inputData = searchInput.value;
        let url = '';
        let sfx = 'data';
        let gameFlag = '';

        try{

            //If user entered a name
            if(inputData){
                
                //Launch the loader
                loader.style.display = 'flex';

                //Check what game card was chosen
                if(pokeGame.checked){
                    url = `https://api.pokemontcg.io/v2/cards?q=name:"${inputData}"`;
                    sfx = 'data';
                    gameFlag = 'Pokemon';
                }
                
                else if(magicGame.checked){
                    url = `https://api.magicthegathering.io/v1/cards?name=${inputData}`;
                    sfx = 'cards';
                    gameFlag = 'Magic';
                }
                
                else if(yuGame.checked){
                    console.log('??a passe ici yugi')
                    url = `https://db.ygoprodeck.com/api/v7/cardinfo.php?fname=${inputData}`;
                    sfx = 'data';
                    gameFlag = 'Yu'
                }

                //Fetching the data from the url
                const response = await fetch(url);
                const res = await response.json();
                const results = res[sfx];

                //Print the resulted data
                printData(results, inputData, gameFlag);
            }
            
            //If search input is empty
            else{

                //Show a message
                inputMsg.textContent = 'Rellene el nombre de la carta';
                inputMsg.style.display = 'inherit';
                inputCnt.style.borderColor = 'red';

                //Remove the message after 3 seconds
                setTimeout(() =>{
                    inputMsg.style.display = 'none';
                    inputCnt.style.borderColor = 'inherit';
                }, 3000);
            }
        }

        catch(e){

            //Stop the loader
            loader.style.display = 'none';

            //Show the error message
            inputMsg.textContent = 'El enlace al servidor est?? roto o es err??neo';
            inputMsg.style.display = 'inherit';
            console.log('Error', e.message);
        }
    }
}
//Print the search result
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
                        <img src="images/icons/wytgrd-basket-icon.svg" alt="wytgrd-basket-icon">
                    </a>
            `
            }
            else if(g_flag == 'Magic'){
                console.log('its the magic')
                item.innerHTML = `
                    <img src="${card.imageUrl}" class="suggestion__list__cardImg" alt="wytgrd-magic-theGathering-card" onerror="this.onerror=null;this.src='../images/others/wytgrd-magic-the-gathering-back.jpg';" >
                    <div class="suggestion__cardInfo">
                        <div class="cardInfo__name"><strong>${card.name}</strong></div>
                        <div class="cardInfo__set">${card.setName}</div>
                    </div>
                    <a class="cardInfo__addBasket" href="#cards">
                        <img src="images/icons/wytgrd-basket-icon.svg" alt="wytgrd-basket-icon">
                    </a>
            `
            }
            else if(g_flag == 'Yu'){
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
                        <img src="images/icons/wytgrd-basket-icon.svg" alt="wytgrd-basket-icon">
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
        inputMsg.textContent = 'No existe tal carta. Aseg??rese de que el nombre est?? escrito correctamente.';
        inputMsg.style.display = 'inherit';
        inputCnt.style.borderColor = 'red';

        setTimeout(() =>{
            inputMsg.style.display = 'none';
            inputCnt.style.borderColor = 'inherit';
        }, 3000);
        
        loader.style.display = 'none';
    }
}
//Add a card to the order list
function addItem(e){

    //Retreive data from the selected card
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
                    <option value="Franc??s">Franc??s</option>
                    <option value="Ingl??s">Ingl??s</option>
                    <option value="Espa??ol">Espa??ol</option>
                    <option value="Italiana">Italiana</option>
                    <option value="Portugu??s">Portugu??s</option>
                    <option value="Russe">Russe</option>
                    <option value="Neerland??s">Neerland??s</option>
                </select>
            </div>
            <div class="card__certLang">
                <div class="certLang__toggle" data-lang="En"></div>
                <div class="certlang__stroke"></div>
            </div>
            <div class="card__value">
                <input type="number" id="card__value">
                <span>???</span>
            </div>
            <div class="card__noNotation">
                <div class="noNotation__toggle" data-lang="No"></div>
                <div class="noNotation__stroke"></div>
            </div>
            <div class="card__delete">
                <img src="images/icons/wytgrd-delete-icon.svg" alt="WYTGRD-delete-icon">
            </div>
        </div>
        <!--MINIMAL NOTE-->
        <div class="minimalNote">
            <div class="minimalNote__checkbox">
                <input type="checkbox" class="minimal">
                <label for="minimal">Puntuaci??n m??nima </label>
                <span class="hint">i</span>
                <div class="minimalNote__hint">
                    Por debajo de una calificaci??n de su elecci??n, le devolveremos sus tarjetas sin protecci??n, o las protegeremos utilizando la <strong>A</strong> de <strong>Anticorrupci??n</strong>.
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
                <label for="return">Devolver como est??</label>
                <input type="radio" name="cert-auth" id="auth">
                <label for="auth">Certificar con la nota Aut??ntica</label>
            </div>
        </div>
        `;
    cardContainer.append(cardElement);

    //Update card's number the number of added cards
    cardNumber++;
    numbCards.innerHTML = `${cardNumber} cartas`;

    //Update the price of the cards
    crdPrice = priceOfCards();
    cardPrice.innerHTML= `${crdPrice} ???`;

    //Update delivery price
    if(cardNumber > 0)
    deliveryPrice.innerHTML = `${delivery} ???`;

    //Check if insurance is checked and add it to the invoice
    insuranceCheck.addEventListener('change', insurranceChecker);

    //Update the total
    total = TotalCalc();
    totalPrice.innerHTML = `${total} ???`;

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
    cardPrice.innerHTML= `${crdPrice} ???`;
    //Update delivery price
    if(cardNumber < 1)
        deliveryPrice.innerHTML = `0 ???`;
    
    //Update the total
    total = TotalCalc();
    totalPrice.innerHTML = `${total} ???`;
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
function insurranceChecker(e){
    if(e.target.checked){
        console.log(insurance);
        insurance=9.48;
        insrPrice.innerHTML = `${insurance} ???`;
        total = TotalCalc();
        totalPrice.innerHTML = `${total} ???`;
    }else{
        insurance=0;
        insrPrice.innerHTML = `${insurance} ???`;
        total = TotalCalc();
        totalPrice.innerHTML = `${total} ???`;
    }
        
}

