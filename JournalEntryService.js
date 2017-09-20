var txtTitle, numId, txtBody, btnSave;
var database;
function setUp()
{
	firebase.initializeApp(getConfig());
	database = firebase.database();
	getScreenElements();
}

function getScreenElements() {
	// Getting screen elements
	txtTitle = document.getElementById('txtTitle');
	numId = document.getElementById("numId");
	txtBody = document.getElementById('txtBody');
	btnSave = document.getElementById('btnSave');
}

function saveEvent() {
	var entry = database.ref("TestEntry/" + numId.value);
	var newEntry = entry.update(
		{
			Id: parseInt(numId.value),
			Title: txtTitle.value,
			Body: txtBody.value
		});
}

function getFirebaseAuth() {
	return firebase.auth();
}

