var txtTitle, numId, txtBody, btnSave, database;

function setUp()
{
	getScreenElements();
	firebase.initializeApp(getConfig());
	database = firebase.database;
	getJournals();
}

function getScreenElements() {
	// Getting screen elements
	txtTitle = document.getElementById('txtTitle');
	numId = document.getElementById("numId");
	txtBody = document.getElementById('txtBody');
	btnSave = document.getElementById('btnSave');
}

function getJournals() {

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

function getFirebaseAuth() {
	return firebase.auth();
}

