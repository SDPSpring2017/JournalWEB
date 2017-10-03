var txtTitle, numId, txtBody, btnEntries, entriesDisplay, contentDisplay;
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
		'<br>Outcomes<br>' + entry.Outcomes;
}

function displayEntryForm() {
	contentDisplay.innerHTML = 
		'<input id="txtTitle" type="text" placeholder="Entry Title"><input id="numId" type="number" placeholder="Entry ID"><br>\
		<label>Summary<br><textarea id="txtSummary" type="text" placeholder="Summary"></textarea></label><br>\
		<label>Key Decisions<br><textarea id="txtDecisions" type="text" placeholder="Key Decisions"></textarea></label><br>\
		<label>Outcomes<br><textarea id="txtOutcomes" type="text" placeholder="Outcomes"></textarea></label><br>\
		<button id="btnSave" onclick="saveEvent()">\
			Save\
		</button>';
}

function saveEvent() {
	txtTitle = document.getElementById('txtTitle');
	numId = document.getElementById("numId");
	txtBody = document.getElementById('txtBody');

	var entry = database.ref("user/" + getCurrentUser().uid + "/Journals/" + localStorage.getItem("SelectedJournal") + "/Entries/" + numId.value);
	entry.update(
		{
			Id: parseInt(document.getElementById("numId").value),
			Title: document.getElementById('txtTitle').value,
			Summary: document.getElementById('txtSummary').value,
			Decisions: document.getElementById('txtDecisions').value,
			Outcomes: document.getElementById('txtOutcomes').value,
			Date: Date()
		});

	setUpJournal();
	contentDisplay.innerHTML = "Saved";
}

function getFirebaseAuth() {
	return firebase.auth();
}

