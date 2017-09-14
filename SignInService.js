// I know we should avoid global variables I just don't feel like figuring out how to do that :) 
var txtEmail, txtPassword, btnSignIn, btnSignOut, btnSignUp;
(function() {
    // Needs to move into GlobalService.js cause all pages will need a connection to database so to avoid repetative code :) 
    // Initialize Firebase
  var config = {
    apiKey: "AIzaSyCXzTuaN3VoNiTIigpfOV-Jzneg94Y6Bko",
    authDomain: "typodatabase.firebaseapp.com",
    databaseURL: "https://typodatabase.firebaseio.com",
    projectId: "typodatabase",
    storageBucket: "typodatabase.appspot.com",
    messagingSenderId: "836867063447"
  };
  firebase.initializeApp(config);  
    
    getScreenElements();
    signInEvent();
    signUpEvent();
    
    
   
}());

function getScreenElements()
{
    // Getting screen elements
    txtEmail = document.getElementById('txtEmail');
    txtPassword = document.getElementById('txtPassword');
    btnSignIn = document.getElementById('btnSignIn');
    btnSignUp = document.getElementById('btnSignUp');
    btnSignOut = document.getElementById('btnSignOut'); 
}

function signInEvent()
{
    btnSignIn.addEventListener('click', e=>
                              {
        const email = txtEmail.value;
        const password = txtPassword.value;
        const promise = getFirebaseAuth().signInWithEmailAndPassword(email, password);
        promise.catch(e => console.log(e.message));
    });
}

// do we want to move sign up into a separate service?
function signUpEvent()
{
 btnSignUp.addEventListener('click', e=>
                           {
     // gotta make sure to check is valid email format
     const email = txtEmail.value;
        const password = txtPassword.value;
        const promise = getFirebaseAuth().createUserWithEmailAndPassword(email, password);
        promise.catch(e => console.log(e.message));
 });
}

function getFirebaseAuth()
{
    return firebase.auth();
}

function realTimeAuthListenter()
{
   // listener for checking authentication state of user
    firebase.auth().onAuthStateChanged(currentUser => {
        if(currentUser)
            {
                console.log(currentUser);
            }
        else
            {
                console.log('User is not signed in');
            }
        
    });
}
