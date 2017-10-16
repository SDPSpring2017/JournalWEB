// I know we should avoid global variables I just don't feel like figuring out how to do that :) 
var txtEmail, txtPassword, btnSignIn, btnSignOut, btnSignUp, dbRef;

function setUp()
{
	firebase.initializeApp(getConfig());
	dbRef = firebase.database();
	getScreenElements();
    realTimeAuthListenter();
}

function getScreenElements()
{
	// Getting screen elements
	// TODO will break out into separate get statements to avoid global variables up top
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
        console.log(getFirebaseAuth());
        promise.catch(e => {console.log("Error: "); console.log(e.message)});
       firebase.auth().onAuthStateChanged(function(currentUser) {
    if (currentUser) {
    window.location = "JournalView.html";
  }});
});

}

// do we want to move sign up into a separate service?
function signUpEvent()
{
    window.location = "SignUpView.html";
    //call function in sign up page
	
}

function signOutEvent()
{
    btnSignOut.addEventListener('click', e=>
                               {
        getFirebaseAuth().signOut();
});
    if(!getCurrentUser)
    alert("User is signed out");
    
	
}