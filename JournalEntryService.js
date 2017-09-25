var txtTitle, numId, txtBody, btnSave, btnEntries, entriesDisplay;
var database;
var entries;
function setUp()
{
	firebase.initializeApp(getConfig());
	database = firebase.database();
	var ref = database.ref("TestEntry");
	ref.on('value', getEntryData);
	getScreenElements();
}

function getScreenElements() {
	// Getting screen elements
	txtTitle = document.getElementById('txtTitle');
	numId = document.getElementById("numId");
	txtBody = document.getElementById('txtBody');
	btnSave = document.getElementById('btnSave');
	btnEntries = document.getElementById('btnEntries');
	entriesDisplay = document.getElementById('entriesDisplay');
}

function getEntryData(data) {
	var dataValue = data.val();
	console.log(dataValue);
	entries = dataValue;
	displayEntries();
}

function displayEntries() {
	var entryValues = Object.values(entries);
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

function saveEvent() {
	var entry = database.ref("TestEntry/" + numId.value);
	entry.update(
		{
			Id: parseInt(numId.value),
			Title: txtTitle.value,
			Body: txtBody.value
		});
}

function getFirebaseAuth() {
	return firebase.auth();
}

