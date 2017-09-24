
function getConfig() {
	// Needs to move into GlobalService.js cause all pages will need a connection to database so to avoid repetative code :) 
	// Initialize Firebase
	return {
		apiKey: "AIzaSyCXzTuaN3VoNiTIigpfOV-Jzneg94Y6Bko",
		authDomain: "typodatabase.firebaseapp.com",
		databaseURL: "https://typodatabase.firebaseio.com",
		projectId: "typodatabase",
		storageBucket: "typodatabase.appspot.com",
		messagingSenderId: "836867063447"
	}
}

function realTimeAuthListenter()
{
   // listener for checking authentication state of user
	firebase.auth().onAuthStateChanged(currentUser => {
		if(currentUser)
			{
				console.log(currentUser + " " + currentUser.uid);
				return true;
			}
		else
			{
				console.log('User is not signed in');
				return false;
			}
		
	});
}

function getFirebaseAuth()
{
	return firebase.auth();
}

function getCurrentUser()
{
    return getFirebaseAuth().currentUser;
}

