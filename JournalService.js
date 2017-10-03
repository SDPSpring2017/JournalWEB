var txtTitle, numId, txtBody, btnSave, database, journals, entriesList;

function setUp()
{
	setUpDatabase();
	firebase.auth().onAuthStateChanged(function(currentUser) {
	if (currentUser) {
		console.log("User loaded");
		setUpJournals();
	}
});
}

function setUpDatabase()
{
	firebase.initializeApp(getConfig());
	database = firebase.database();
}


function setUpJournals()
{
	//TODO check if they have any journals in the first place
	var journalsRef = database.ref("user/" + getCurrentUser().uid + "/Journals");
	journals = journalsRef.once('value').then(function (snapshot){
		getJournals(snapshot);
	})
	
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
		if (journal != "") {
			journalsDisplay.innerHTML +=
				'<div>\
					<button onclick="displayEntries(' + count + ')">' +
						journal.Title +
					'</button>\
				</div>';
			entriesList[count] = journal;
			count += 1;
		}
	});
}

function CreateJournal(){
	//TODO check if they have any journals in the first place
	database.ref("user").child(getCurrentUser().uid).child("Journals").child(new Date().getTime()).set(
	{
		Title: "Testing",
		DateCreated: + new Date()
	});
}

function displayEntries(journalNumber) {
	var entryValues = Object.values(entriesList[journalNumber].Entries);
	entriesDisplay.innerHTML = "";
	entryValues.forEach(function (entry) {
		if (entry != "") {
			entriesDisplay.innerHTML +=
				'<table>\
				<tbody>\
					<tr>\
						<td>' + entry.Id + ':' + entry.Title + '</td>\
					</tr>\
						<td>' + entry.Summary + '</td>\
					<tr>\
				</tbody>\
		</table>';
		}
	});
	entriesDisplay.innerHTML +=
		'<button onclick="goToJournal(' + journalNumber + ')">' +
			"Go to journal" +
		'</button>';
}

function goToJournal(journalNumber) {
	localStorage.setItem("SelectedJournal", entriesList[journalNumber].DateCreated)
	window.location = "JournalEntryView.html";
}

