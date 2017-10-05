var btnEntries, entriesDisplay, contentDisplay;
var database;
var entries;
var entriesList;
function setUp()
{
	setUpDatabase();
	firebase.auth().onAuthStateChanged(function(currentUser) {
		if (currentUser) {
			console.log("User loaded");
			setUpJournal();
		}
	});
	getScreenElements();
}

function setUpDatabase() {
	firebase.initializeApp(getConfig());
	database = firebase.database();
}

function setUpJournal() {
	var ref = database.ref("user/" + getCurrentUser().uid + "/Journals/" + localStorage.getItem("SelectedJournal") + "/Entries");
	entries = ref.once('value').then(function (snapshot) {
		getEntryData(snapshot)
	});
}

function getScreenElements() {
	// Getting screen elements
	btnEntries = document.getElementById('btnEntries');
	entriesDisplay = document.getElementById('entriesDisplay');
	contentDisplay = document.getElementById('contentDisplay');
}

function getEntryData(data) {
	var dataValue = data.val();
	console.log(dataValue);
	entries = dataValue;
	displayEntries();
}

function displayEntries() {
	var entryValues = Object.values(entries);
	if(entryValues != "") {
		entriesDisplay.innerHTML = "";
		entriesList = new Array(entryValues.length);
		var count = 0;
		entryValues.forEach(function (entry) {
			if (entry != "") {
				entriesDisplay.innerHTML +=
					'<div>\
						<button onclick="displayEntryContent(' + count + ')">' +
							entry.Date +
						'</button>\
					</div>';
				entriesList[count] = entry;
				count += 1;
			}
		});
	}
	else
	{
		entriesDisplay.innerHTML = "No entries to display"
	}
}

function displayEntryContent(entryNumber) {
	var entry = entriesList[entryNumber];
	contentDisplay.innerHTML =
		entry.Id + ': ' + entry.Title + '<br>' + entry.Date + 
		'<br>Summary<br>' + entry.Summary +
		'<br>Key Decisions<br>' + entry.Decisions +
		'<br>Outcomes<br>' + entry.Outcomes +
		'<br><button id="btnEdit" onclick="editEvent(' + entryNumber + ')">Edit</button>';
}

function displayEntryForm(title, id, summary, decisions, outcomes) {
	contentDisplay.innerHTML = 
		'<input id="txtTitle" type="text" placeholder="Entry Title" value="' + title + '"><input id="numId" type="number" placeholder="Entry ID" value="' + id + '"><br>\
		<label>Summary<br><textarea id="txtSummary" type="text" placeholder="Summary">' + summary + '</textarea></label><br>\
		<label>Key Decisions<br><textarea id="txtDecisions" type="text" placeholder="Key Decisions">' + decisions + '</textarea></label><br>\
		<label>Outcomes<br><textarea id="txtOutcomes" type="text" placeholder="Outcomes">' + outcomes + '</textarea></label><br>\
		<button id="btnSave" onclick="saveEvent()">Save</button>';
}

function editEvent(entryNumber) {
	var entry = entriesList[entryNumber];
	displayEntryForm(entry.Title, entry.Id, entry.Summary, entry.Decisions, entry.Outcomes);
}

function saveEvent() {

	var numId = document.getElementById("numId");
	var txtTitle = document.getElementById('txtTitle');
	var txtSummary = document.getElementById('txtSummary').value;
	var txtDecisions = document.getElementById('txtDecisions').value;
	var txtOutcomes = document.getElementById('txtOutcomes').value;

	var archive;
	var entry = database.ref("user/" + getCurrentUser().uid + "/Journals/" + localStorage.getItem("SelectedJournal") + "/Entries/" + numId.value);
	entry.once('value').then(function (snapshot) {
		entry.update({
			Id: parseInt(numId.value),
			Title: txtTitle,
			Summary: txtSummary,
			Decisions: txtDecisions,
			Outcomes: txtOutcomes,
			Date: Date()
		});
		if (snapshot.val().Id == parseInt(numId.value)) {
			entry.child("Archive").update(snapshot.val());
		}
	});

	setUpJournal();
	contentDisplay.innerHTML = "Saved";
}

function getFirebaseAuth() {
	return firebase.auth();
}

