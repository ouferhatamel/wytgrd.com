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