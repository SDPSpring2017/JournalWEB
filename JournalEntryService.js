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
		var entry = getFirebaseDatabase().ref("TestEntry/" + numId.value);
		var newEntry = entry.update(
			{
				Id: parseInt(numId.value),
				Title: txtTitle.value,
				Body: txtBody.value
			});
	});
}

function getFirebaseDatabase() {
	return firebase.database();
}

function getFirebaseAuth() {
	return firebase.auth();
}

