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


