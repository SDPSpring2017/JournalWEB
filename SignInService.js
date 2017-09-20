// I know we should avoid global variables I just don't feel like figuring out how to do that :) 
var txtEmail, txtPassword, btnSignIn, btnSignOut, btnSignUp, authClient, dbRef;

function setUp()
{
	firebase.initializeApp(getConfig());
	dbRef = firebase.database();
	authenticationMonitoring();
	getScreenElements();
}

function getScreenElements()
{
	// Getting screen elements
	// will break out into separate get statements to avoid global variables up top
	txtEmail = document.getElementById('txtEmail');
	txtPassword = document.getElementById('txtPassword');
	btnSignIn = document.getElementById('btnSignIn');
	btnSignUp = document.getElementById('btnSignUp');
	btnSignOut = document.getElementById('btnSignOut'); 
}

function signInEvent()
{
	authClient = new FirebaseSimpleLogin(dbRef, function(error, user) {
		if (error) 
		{
			console.log(error);
		}
		else if (user) {
			// user authenticated with Firebase
			console.log("User ID: " + user.uid + ", Provider: " + user.provider);
			authClient.login("password");
		}
		else {
			// user is logged out
			alert("No users are currently logged in");
		}
	});
}

function authenticationMonitoring()
{
	var authRef = new Firebase("https://typodatabase.firebaseio.com/.info/authenticated");
	authRef.on("value", function(snap) {
		if (snap.val() === true) {
			alert("authenticated");
		}
		else {
			alert("not authenticated");
		}
	});
}

// do we want to move sign up into a separate service?
function signUpEvent()
{
	var email = txtEmail.val();
	var password = txtPassword.val();
	authClient.createUser(email, password, 
		function(err, user){
			if(!err) {
				dbRef.child("user").child(user.uid).set({
					FName: "I will",
					LName: "fix this later but I'm tired yall",
					Email: email,
					Password: password
				})
			}
			else {
				alert(error);
			}
	})
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

function SignOutEvent()
{
	authClient.logout();
}
