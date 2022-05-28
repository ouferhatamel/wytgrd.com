import { 
    auth,
    onAuthStateChanged,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile,
    db,
    collection,
    doc,
    setDoc,
    sendPasswordResetEmail 
 } from "./modules/firebaseSdk.js";
 
///////////////////////////////
////////Functions calls////////
///////////////////////////////

 //Authentication states
onAuthStateChanged(auth, user => {
    if(user){
        /* const provPage = document.referrer;
        location.replace(provPage); */
        console.log('Loggin !', user);
        //user..metadata.creationTime //To get the creation Time
    }
    else{
        console.log('logged out');
    }
});

//Register user
const registerForm = document.getElementById('register__form');
registerForm.addEventListener('submit', (e) => {
    e.preventDefault();

    //Create the user account
    createUserAccount(auth);
});

//Sign in user
const signinForm = document.getElementById('signin__form');
signinForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    //Sign-in the user
    signInUser(auth);
    
});

//Sign up or Sign in ?
const fHeaderSpan = document.querySelector('.forms__header span');
const fHeaderTitle = document.querySelector('.forms__header h1');
const fHeaderParg = document.querySelector('.forms__header p');
let cnxFlag = false;
fHeaderSpan.addEventListener('click', actionType);

//Reset password mail
const pwdReset = document.getElementById('forgotten_pwd');
pwdReset.addEventListener('click', resetPwd);

/////////////////////////
////////Functions////////
////////////////////////

//Get user input
function getInputValues(){
    return {
      fname : registerForm['fname'].value,
      lname : registerForm['lname'].value,
      email : registerForm['reg_email'].value,
      tel : registerForm['tel'].value,
      pwd : registerForm['reg_pwd'].value,
    };
}
//Create a user account
function createUserAccount(auth){

    //Get user input infos
    const userInput = getInputValues();

    //Register the user
    createUserWithEmailAndPassword(auth, userInput.email, userInput.pwd)
    .then((cred) => {

        //Adding extra user infos to the users collection
        addUser(cred, userInput);
        console.log(cred);

        //Updating auth user object info
        updateProfile(auth.currentUser, {
            displayName : userInput.fname
        }).catch(err => {
            showError(err.code);
        });

        //Showing a successful message popup
        showPopup('signup', userInput.fname);
    })
    .catch(err => {
        showError(err.code);
    });
}
//Sign-in user
function signInUser(auth){

    //Get user infos
    const email = signinForm['sign_email'].value;
    const pwd = signinForm['sign_pwd'].value;

    //Sign in the user
    signInWithEmailAndPassword(auth, email, pwd)
    .then((cred) => {
        const fname = auth.currentUser.displayName;
        //Showing a successful popup
        showPopup('signin', fname);
    })
    .catch(err => {
        showError(err.code, 'signin');
    });
}
//Create a new doc to the users collection
function addUser(cred, userInput){
    const usersRef = collection (db, 'users');
        setDoc(doc(usersRef, cred.user.uid),{
            "first name" : userInput.fname,
            "last name" : userInput.lname,
            "email" : userInput.email,
            "phone number" : userInput.tel,
        });
}
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
    //reset the form
    registerForm.reset();
    //Go to the page of provenance
    btn.addEventListener('click', (e) =>{
        const provPage = document.referrer;
        location.replace(provPage);
    });
}
//Send a reset password mail
function resetPwd(){

    const email = signinForm['sign_email'].value;
    if(email){
        sendPasswordResetEmail(auth, email)
        .then(() => {
        //Show a timed popup
        console.log('Reset mail send pop');
        })
        .catch((err) => {
           showError(err.code)
        });
    }
    else{
        showError('Missing email adress', 'signin');
    }
    
}
//Show error message
function showError(errCode, action){
    switch(errCode) {
        case "auth/email-already-in-use":
          showErrorBloc('El email ya está en uso', 'email', action);
          break;
        case "auth/invalid-email":
          showErrorBloc('Email inválido', 'email', action);
          break;
        case "auth/user-not-found":
          showErrorBloc('Usuario no encontrado', 'email', action);
          break;
        case "Missing email adress":
          showErrorBloc('Rellene la dirección de email', 'email', action);
          break;
        case "auth/weak-password":
          showErrorBloc('Contraseña débil, debe contener al menos 6 caracteres', 'pwd', action);
          break;
        case "auth/wrong-password":
          showErrorBloc('Contraseña incorrecta', 'pwd', action);
          break;
        default:
            showErrorBloc(errCode, action);
    }
}
//Show The error message block
function showErrorBloc(msg, inputType, action){

    //Email input
    if (inputType == 'email'){

        //Check if it's a sign-in action
        if(action == 'signin'){

            const email_Serr = document.getElementById('s_errorMessage_email');
            email_Serr.style.visibility = 'visible';
            email_Serr.innerHTML = msg;

            //Remove the error message after 3 secondes
            setTimeout(()=>{
                email_Serr.style.visibility = 'hidden';
            }, 3000);
        }
        else{
            //So it is a sign-up action
            const emailErr = document.getElementById('errorMessage_email');
            emailErr.style.visibility = 'visible';
            emailErr.innerHTML = msg;

            //Remove the error message after 3 secondes
            setTimeout(()=>{
                emailErr.style.visibility = 'hidden';
            }, 3000);
        }
    }

    //Password input
    else if (inputType == 'pwd'){

        //Check if it's a sign-in action
        if(action == 'signin'){

            const pwd_Serr = document.getElementById('s_errorMessage_pwd');
            pwd_Serr.style.visibility = 'visible';
            pwd_Serr.innerHTML = msg;

            //Remove the error message after 3 secondes
            setTimeout(()=>{
                pwd_Serr.style.visibility = 'hidden';
            }, 3000);
        }
        else{
            const pwdErr = document.getElementById('errorMessage_pwd');
            pwdErr.style.visibility = 'visible';
            pwdErr.innerHTML = msg;

            //Remove the error message after 3 secondes
            setTimeout(()=>{
                pwdErr.style.visibility = 'hidden';
            }, 3000);
        }
    }

    //Default error input
    else{

        //Check if it's a sign-in action
        if(action == 'signin'){

            const s_defaultErr = document.getElementById('signin__defaultError');
            s_defaultErr.style.visibility = 'visible';
            s_defaultErr.innerHTML = msg;

            //Remove the error message after 3 secondes
            setTimeout(()=>{
                s_defaultErr.style.visibility = 'hidden';
            }, 3000);
        }
        else{
            const r_defaultErr = document.getElementById('register__defaultError');
            r_defaultErr.style.visibility = 'visible';
            r_defaultErr.innerHTML = msg;
            //Remove the error message after 3 secondes
            setTimeout(()=>{
                r_defaultErr.style.visibility = 'hidden';
            }, 3000);
        }
        
    }
}