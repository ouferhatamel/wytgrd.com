import { 
    auth,
    onAuthStateChanged,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    updateProfile,
    db,
    collection,
    doc,
    setDoc
 } from "./modules/firebaseSdk.js";

 //Authentication states
onAuthStateChanged(auth, user => {
    if(user){
        /* const provPage = document.referrer;
        location.replace(provPage); */
        console.log('Loggin !');
    }
    else{
        console.log('logged out');
    }
});

//Global varibales
let actionFlag = '';

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

        //Updating auth user object info
        updateProfile(auth.currentUser, {
            displayName : fname
        }); // Catch

        //Showing a successful message popup
        actionFlag = 'signup';
        showPopup(actionFlag, fname);
        console.log('User Created on the users table', userRef);
        registerForm.reset();
    })
    .catch(err => {
        console.log(err.message);
    });
});

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
        const lname = auth.currentUser.displayName;
        //Showing a successful popup
        actionFlag = 'signin';
        showPopup(actionFlag, lname);
        console.log('logged in', cred.user);
        signinForm.reset();
    })
    .catch(err => {
        console.log(err.message)
    })
});

//Sign up or Sign in ?
const fHeaderSpan = document.querySelector('.forms__header span');
const fHeaderTitle = document.querySelector('.forms__header h1');
const fHeaderParg = document.querySelector('.forms__header p');
let cnxFlag = false;
fHeaderSpan.addEventListener('click', actionType);

//Functions---------------------------------------------------------------------

//Sign up or Sign in ?
function actionType(){
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
}

//Successful Sign-up/login popup
function showPopup(af,lname){
    const popup = document.querySelector('.popup');
    const mainCnt = document.querySelector('.forms');
    const uName = document.querySelector('.popup__head h3');
    const msg = document.querySelector('.popup__msg p');
    const btn = document.getElementById('popup__btn');

    //Show up the pop-up
    uName.textContent = lname;
    if(af == 'signup'){
        msg.innerHTML = `
        Su cuenta ha sido creada. <br>
        Ha iniciado la sesión con éxito.
    `;
    }else{
        msg.innerHTML = `
        Ha iniciado la sesión con éxito.
    `;
    }
    popup.classList.add('popup--opened');
    mainCnt.classList.add('forms--darken');
    //Block the background click action
    mainCnt.style.pointerEvents = 'none';

    //Go to the page of provenance
    btn.addEventListener('click', (e) =>{
        const provPage = document.referrer;
        location.replace(provPage);
    });
}