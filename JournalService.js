var txtTitle, numId, txtBody, btnSave, database, journals, entriesList;

function setUp()
{
	getScreenElements();
	firebase.initializeApp(getConfig());
	database = firebase.database();
	var ref = database.ref("user/" + "KPkcMOMmtCU495XZ6aOg72z34vr2" + "/Journals");
	ref.on('value', getJournals);
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
	displayJournals();
}

function displayJournals() {
	var journalValues = Object.values(journals);
	journalsDisplay.innerHTML = "";
	entriesList = new Array(journalValues.length);
	var count = 0;
	journalValues.forEach(function (journal) {
		journalsDisplay.innerHTML +=
			'<div>\
				<button onclick="displayEntries(' + count + ')">' + 
					journal.Title +
				'</button>\
		</div>';
		entriesList[count] = journal;
		count += 1;
	});
}

function CreateJournal(){
	database.ref("user").child(getCurrentUser().uid).child("Journals").child(new Date().getTime()).set(
	{
		Title: "Testing",
		DateCreated: + new Date()
				});
}

function getEntryData(data) {
	var dataValue = data.val();
	console.log(dataValue);
	entries = dataValue;
	displayEntries();
}

function displayEntries(journalNumber) {
	var entryValues = Object.values(entriesList[journalNumber].Entries);
	entriesDisplay.innerHTML = "";

	entryValues.forEach(function (entry) {
		entriesDisplay.innerHTML +=
			'<table>\
				<tbody>\
					<tr>\
						<td>' + entry.Id + ':' + entry.Title + '</td>\
					</tr>\
						<td>' + entry.Body + '</td>\
					<tr>\
				</tbody>\
		</table>';
	});
}