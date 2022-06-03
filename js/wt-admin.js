//Admin login
const loginForm = document.getElementById('login__form');
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    //Get the admin login and dashboard modals
    const loginModal = document.getElementById('admin__login');
    const dashModal = document.getElementById('admin__dashboard');
    loginModal.style.display = "none";
    dashModal.style.display = "flex";


});

//Add admin account
const addForm = document.getElementById('accounts__form');
addForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const email = addForm['adminEmail'].value;
    const adminList = document.querySelector('.accounts__list');
    const account = document.createElement('li');
    account.innerHTML = `
        <span>${email}</span>
        <span>Administrateur</span>
        <span>03 - 06 - 2022</span>
        `
        adminList.append(account);
})

//Show and hide the add certified card form
const showCForm = document.querySelector('.certifiedCards__addBtn')
const certifiedCForm = document.getElementById('certifiedCards__form');
const ccList = document.querySelector('.certifiedCards__list');

showCForm.addEventListener('click', (e) => {
    ccList.style.display = 'none';
    certifiedCForm.style.display = 'block';
    e.target.style.display = 'none';
});

//Add a certified card
certifiedCForm.addEventListener('submit', (e) => {
    e.preventDefault();
    //Get input values from the form
    const code = certifiedCForm['cardCode'].value;
    const userId = certifiedCForm['userId'].value;
    const cDate = certifiedCForm['cDate'].value;
    const ccLang = certifiedCForm['ccLang'].value;
    const cName = certifiedCForm['cName'].value;
    const cSet = certifiedCForm['cSet'].value;
    const cLang = certifiedCForm['cLang'].value;
    const cNote = certifiedCForm['cNote'].value;

    //Create a new element
    const cCard = document.createElement('li');

    cCard.innerHTML = `
        <span>${code}</span>
        <span>${userId}</span>
        <span>${cName}</span>
        <span>${cSet}</span>
        <span>${cDate}</span>
        <span>${cNote} <br> near mint-mint</span>
        <span>
            <img src="images/icons/wtig-edit-icon.svg" alt="wtig-edit-icon">
        </span>
    `;

    //Append the new element to the list
    ccList.append(cCard);

    //reset the form
    certifiedCForm.reset();
    //Hide the form
    certifiedCForm.style.display = 'none';

    //Show the list and the button
    ccList.style.display = 'block';
    showCForm.style.display = 'block';
    console.log(cCard)
});

//Toggle between sections

//Getting menu items
const menuItems = document.querySelectorAll('.dashbord__menuList li');

menuItems.forEach((item) => {
    item.addEventListener('click', (e) => {
        let section = e.target.getAttribute('id');
        const sectionHeader = document.querySelector('.dashboard__header');

        switch (section) {
            case 'profileSec' :
                selectedMenuItem(e.target);
                showSection('dashboard__profile');
                sectionHeader.textContent = 'Perfil';
                break;
            case 'accountsSec' :
                selectedMenuItem(e.target);
                showSection('dashboard__accounts');
                sectionHeader.textContent = 'Cuentas';
                break;
            case 'ordersSec' :
                selectedMenuItem(e.target);
                showSection('dashboard__orders');
                sectionHeader.textContent = 'Pedidos';
                break;
            case 'ccSec' :
                selectedMenuItem(e.target);
                showSection('dashboard__certifiedCards');
                sectionHeader.textContent = 'Tarjetas certificadas';
                break;
        }
    })
});

//Functions

//Show section
function showSection(id){
    const sections = document.querySelectorAll('.dashboard__section');
    const section = document.getElementById(`${id}`);

    //Hide all sections
    sections.forEach((section) => {
        section.style.display = 'none';
    });

    //Show the selected sections
    section.style.display = 'flex';
}
//Style the selected menu item
function selectedMenuItem(e){
    menuItems.forEach(item => {
        item.classList.remove('selected');
    })
    e.classList.add('selected');
}