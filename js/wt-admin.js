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

