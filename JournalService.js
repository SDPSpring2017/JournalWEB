var txtTitle, numId, txtBody, btnSave, database, journals;

function setUp()
{
	getScreenElements();
	firebase.initializeApp(getConfig());
	database = firebase.database();
	var ref = database.ref("user/" + getCurrentUser().uid + "/Journals");
	ref.on('value', getJournals);
	displayJournals();
}

function getScreenElements() {
	// Getting screen elements
	/*txtTitle = document.getElementById('txtTitle');
	numId = document.getElementById("numId");
	txtBody = document.getElementById('txtBody');
	btnSave = document.getElementById('btnSave');*/
}

function getJournals(data) {
	var dataValue = data.val();
	console.log(dataValue);
	journals = dataValue;
}

function displayJournals() {
	var journalValues = Object.values(journals);
	journalsDisplay.innerHTML = "";

	journalsValues.forEach(function (journal) {
		journalsDisplay.innerHTML +=
			'<div>\
				<button>' + 
					journal.Title +
				'</button>\
		</div>';
	});
}

function CreateJournal(){
	database.ref("user").child(getCurrentUser().uid).child("Journals").child(new Date().getTime()).set(
	{
		Title: "Testing",
		DateCreated: + new Date()
				});
}


