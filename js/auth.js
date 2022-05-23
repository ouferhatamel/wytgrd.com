import { 
    auth,
    onAuthStateChanged,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    updateProfile,
    getFirestore,
    db,
    collection,
    doc,
    setDoc
 } from "./modules/firebaseSdk.js";

onAuthStateChanged(auth, user => {
    if(user){
        //location.replace("checkout.html");
        console.log('User logged in', user);
    }
    else{
        console.log('logged out');
    }
});

//Register user
const registerForm = document.getElementById('register__form');
registerForm.addEventListener('submit', (e) => {
    e.preventDefault();

    //Get user input infos
    const fname = registerForm['fname'].value;
    const lname = registerForm['lname'].value;
    const tel = registerForm['tel'].value;
    const email = registerForm['reg_email'].value;
    const pwd = registerForm['reg_pwd'].value;

    //Register the user
    createUserWithEmailAndPassword(auth, email, pwd)
    .then((cred) => {
        //Adding extra user infos to the users collection
        const userRef = collection (db, 'users');
        setDoc(doc(userRef, cred.user.uid),{
            "first name" : fname,
            "last name" : lname,
            "phone number" : tel,
        });
        console.log('User Created on the users table', userRef);
        registerForm.reset();
    })
    .catch(err => {
        console.log(err.message);
    });
});

//Log out user
const logOut = document.querySelector('.forms__wtigLogo img');
logOut.addEventListener('click', (e) => {
    signOut(auth)
    .then(()=>{
        console.log('User Signed out');
    }).catch(err => {
        console.log(err.message);
    })
})
//Sign in user
const signinForm = document.getElementById('signin__form');
signinForm.addEventListener('submit', (e) => {
    e.preventDefault();

    //Get user infos
    const email = signinForm['sign_email'].value;
    const pwd = signinForm['sign_pwd'].value;

    //Sign in the user
    signInWithEmailAndPassword(auth, email, pwd)
    .then((cred) => {
        console.log('logged in', cred.user);
        signinForm.reset();
    })
    .catch(err => {
        console.log(err.message)
    })
})

//Sign up or Sign in ?
const fHeaderTitle = document.querySelector('.forms__header h1');
const fHeaderParg = document.querySelector('.forms__header p');
const fHeaderSpan = document.querySelector('.forms__header span');
let cnxFlag = false;

fHeaderSpan.addEventListener('click', () => {
    if(!cnxFlag){
        registerForm.style.display = 'none';
        signinForm.style.display = 'inherit';
        fHeaderTitle.textContent = 'Accede a';
        fHeaderParg.innerHTML = '¿Aún no tienes una cuenta?';
        fHeaderSpan.textContent = 'Cree su cuenta';
        cnxFlag = true;
    }else{
        registerForm.style.display = 'inherit';
        signinForm.style.display = 'none';
        fHeaderTitle.textContent = 'Crear una cuenta';
        fHeaderParg.textContent = '¿Ya tiene una cuenta?';
        fHeaderSpan.textContent = 'Conéctate en';
        cnxFlag = false;
        
    }
});