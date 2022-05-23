import { 
    auth,
    signOut,
    updateProfile,
    db,
    collection,
    doc,
    setDoc
 } from "./modules/firebaseSdk.js";

 //log out the user
 const logout = document.getElementById('menu__logout');
 logout.addEventListener('click', (e) => {
    signOut(auth)
    .then(()=>{
        location.replace('index.html');
    }).catch(err => {
        console.log(err.message);
    })
});