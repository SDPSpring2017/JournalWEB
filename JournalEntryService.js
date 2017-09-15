var txtTitle, numId, txtBody, btnSave;
(function () {
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
	saveEvent();



}());

function getScreenElements() {
	// Getting screen elements
	txtTitle = document.getElementById('txtTitle');
	numId = document.getElementById("numId");
	txtBody = document.getElementById('txtBody');
	btnSave = document.getElementById('btnSave');
}

function saveEvent() {
	btnSave.addEventListener('click', e=> {
		var title = txtTitle.value;
		var body = txtBody.value;
		var id = parseInt(numId.value);
		var entry = getFirebaseDatabase().ref("TestEntry/" + id);
		var newEntry = entry.update(
		//getFirebaseDatabase().ref('TestEntry').set(
			{
				Id: id,
				Title: title,
				Body: body
			});
		//const promise = getFirebaseAuth();
		//promise.catch(e => console.log(e.message));
	});
}

function getFirebaseDatabase() {
	return firebase.database();
}

function getFirebaseAuth() {
	return firebase.auth();
}

