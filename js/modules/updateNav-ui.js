import {
    auth,
    onAuthStateChanged
} from "./firebaseSdk.js"

//Authentication states
onAuthStateChanged(auth, user => {
    const myAccount = document.getElementById('navBar__myAccount');
    const login = document.getElementById('navBar__login');
    if(user){
        login.style.display = 'none';
        myAccount.style.display = 'inline';
    }
    else{
        console.log('logged out');
        myAccount.style.display = 'none';
        login.style.display = 'inline';
    }
});

//Burger menu
const burger = document.querySelector('.burger');
let navBarLinks = document.querySelector('.navBar__links');
let menuOpen = false;

burger.addEventListener('click', () => {
    if(!menuOpen){
        burger.classList.add('burger__bar--open');
        menuOpen = true;
        navBarLinks.style.clipPath = "circle(100%)";
        navBarLinks.style.display = 'flex';
    }else{
        burger.classList.remove('burger__bar--open');
        menuOpen = false;
        navBarLinks.style.clipPath = "circle(0% at 50% -50%)";
        navBarLinks.style.display = 'none'
    }
});