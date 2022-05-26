import { 
    auth,
    onAuthStateChanged,
    signOut,
    updateProfile,
    db,
    doc,
    getDoc,
    setDoc,
    EmailAuthProvider,
    reauthenticateWithCredential,
    updatePassword
} from "./modules/firebaseSdk.js";

//Call the getCurrentUser function
getCurrentUser().then(user => {
  getUserDoc(user.uid);
});

//Toggle modals 
const persoBtn = document.getElementById('menu__perso');
const orderBtn = document.getElementById('menu__orders');

orderBtn.addEventListener('click', () => {
    toggleModals('o');
});
persoBtn.addEventListener('click', ()=> {
  toggleModals('p');
});

 //Log out the user
 const logout = document.getElementById('menu__logout');
 logout.addEventListener('click', (e) => {
    signOut(auth)
    .then(()=>{
        location.replace('index.html');
    }).catch(err => {
        console.log(err.message);
    })
});

//Update Profile call
const form = document.getElementById('modals__form');
form.addEventListener('submit', (e)=> {
  e.preventDefault();
  //Update the profile after getting uid
  getCurrentUser().then(user => {
    //Check user validity - Re-authentification
    reAuthUser(user);
  });
})

/////////////////////////
////////Functions////////
////////////////////////

//Toggle modals
function toggleModals(flag){
  if(flag == 'o'){
    console.log('perso');
    orderBtn.classList.add('menu__item--selected');
    persoBtn.classList.remove('menu__item--selected');
    const modals__perso = document.getElementById('modals__perso');
    const modals__orders = document.getElementById('modals__order');
    modals__perso.style.display = 'none';
    modals__orders.style.display = 'block';
  }else if(flag == 'p'){
    console.log('orders')
    orderBtn.classList.remove('menu__item--selected');
    persoBtn.classList.add('menu__item--selected');
    const modals__perso = document.getElementById('modals__perso');
    const modals__orders = document.getElementById('modals__order');
    modals__perso.style.display = 'flex';
    modals__orders.style.display = 'none';
  }
}
//Get user uid
function getCurrentUser(){
  return new Promise(resolve =>{
    onAuthStateChanged(auth, user => {
      if(user){
      }
      resolve(user);
  });
  })
}
//Get user info from users collection
async function getUserDoc(uid){
  let fname = '';
  let lname = '';
  let email = '';
  let tel = '';
  
  const docRef = doc(db, "users", uid);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    console.log("Document data:", docSnap.data());
    fname = docSnap.data()['first name'];
    lname = docSnap.data()['last name'];
    email = docSnap.data()['email'];
    tel = docSnap.data()['phone number'];
    //Printing the data
    printData(fname, lname,email, tel);
  } else {
    console.log("No such document!");
  }
}
//Print user info on the form
function printData(fn, ln, email, tel){
  const form = document.getElementById('modals__form');
  form['fname'].value = fn;
  form['lname'].value = ln;
  form['email'].value = email;
  form['tel'].value = tel;
}
//Guetting user inputs
function getInputValues(){
  return {
    fname : form['fname'].value,
    lname : form['lname'].value,
    email : form['email'].value,
    tel : form['tel'].value,
    cpwd : form['c_pwd'].value,
  };
}
//Update profile data (on the users collection and on the currentUser) + password
async function updateUProfile(user){
  const userInfo = getInputValues();
  //Update on the users collection
  await setDoc(doc(db, "users", user.uid), {
    "first name" : userInfo.fname,
    "last name" : userInfo.lname,
    "email" : userInfo.email,
    "phone number" : userInfo.tel
  });
  //Update on currentUser
  updateProfile(auth.currentUser, {
    displayName: userInfo.fname,
    email: userInfo.email
  }).then(() => {
    console.log('Profile updated');
  }).catch((err) => {
    console.log('Error occured while updating Profile', err.message);
  });
  //Update password if new password field is not empty
  updatePwd(user);
}
//Update password 
function updatePwd(user){
  const n_pwd = form['n_pwd'].value;
  if(n_pwd !== ''){
    updatePassword(user, n_pwd).then(() => {
      console.log('password updated');
    }).catch((err) => {
      console.log('Error: ', err.message);
    });
  }
}
//Define user credencials
function promptForCredentials(email, pwd){
  const credential = EmailAuthProvider.credential(
    email,
    pwd
  );
  return credential;
}
//Reauthentificate user
function reAuthUser(user){

  const email = getInputValues().email;
  const pwd = getInputValues().cpwd;
  //Get user credentials
  const credential = promptForCredentials(email,pwd);

  reauthenticateWithCredential(user, credential).then(() => {
    // User re-authenticated.
    console.log('User re-authenticated !');
    //Update the profile
    updateUProfile(user);
  }).catch((err) => {
    console.log('An error occured when trying re-authenticated the user', err.message);
  });
}
