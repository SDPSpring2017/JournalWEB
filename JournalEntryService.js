var txtTitle, numId, txtBody, btnEntries, entriesDisplay, contentDisplay;
var database;
var entries;
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
        
        entryValues.forEach(function(entry){
			if (entry != "") {
				entriesDisplay.innerHTML +=
					'<div>\
						<button onclick="displayEntryContent(' + entry.Id + ')">' +
							entry.Date +
						'</button>\
                        <button onclick = "deleteEntry('+ entry.Id + ')"> + Delete </button>\
                        <button onclick = "hideEntry('+ entry.Id + ')"> + Hide </button>\
					</div>';
			}

	});
    }
	else
	{
        entriesDisplay.innerHTML = "No entries to display";
	}

		
}
function findEntry(entryId)
{
    var entriesArray = Object.values(entries);
    for(var i=0; i < entriesArray.length; i++)
        {
            if(entriesArray[i].Id == entryId)
                {
                    return entriesArray[i];
                }
        }

    return null;
}

function displayEntryContent(entryId) {
	var entry = findEntry(entryId);
    if(entry != null)
        {
            contentDisplay.innerHTML =
		entry.Id + ': ' + entry.Title + '<br>' + entry.Date + 
		'<br>Summary<br>' + entry.Summary +
		'<br>Key Decisions<br>' + entry.Decisions +
		'<br>Outcomes<br>' + entry.Outcomes +
		'<br><button id="btnEdit" onclick="editEvent(' + entry.Id + ')">Edit</button>';
            //TODO: maybe the action buttons should be here instead, it depends on whether the og entry button still exists on the screen which I'm pretty sure it does
        }
	
}

function displayEntryForm(title, id, summary, decisions, outcomes) {
	contentDisplay.innerHTML = 
		'<input id="txtTitle" type="text" placeholder="Entry Title" value="' + title + '"><input id="numId" type="number" placeholder="Entry ID" value="' + id + '"><br>\
		<label>Summary<br><textarea id="txtSummary" type="text" placeholder="Summary">' + summary + '</textarea></label><br>\
		<label>Key Decisions<br><textarea id="txtDecisions" type="text" placeholder="Key Decisions">' + decisions + '</textarea></label><br>\
		<label>Outcomes<br><textarea id="txtOutcomes" type="text" placeholder="Outcomes">' + outcomes + '</textarea></label><br>\
		<button id="btnSave" onclick="saveEvent()">Save</button>';
}

function editEvent(entryId)
{
    var entry = findEntry(entryId);
    displayEntryForm(entry.Title, entry.Id, entry.Summary, entry.Decisions, entry.Outcomes);
}

function saveEvent() {
	txtTitle = document.getElementById('txtTitle');
	numId = document.getElementById("numId");
	txtBody = document.getElementById('txtBody');
    txtSummary =  document.getElementById('txtSummary');
    txtDecisions = document.getElementById('txtDecisions'); 
    txtOutcomes = document.getElementById('txtOutcomes');

	var entry = database.ref("user/" + getCurrentUser().uid + "/Journals/" + localStorage.getItem("SelectedJournal") + "/Entries/" + numId.value);
    entry.once('value').then(function(snapshot) {
       entry.update(
		{
			Id: numId.value,
			Title: txtTitle.value,
			Summary: txtSummary.value,
			Decisions: txtDecisions.value,
			Outcomes: txtOutcomes.value,
			Date: Date()
		}); 
        if(snapshot.val() != null && snapshot.val().Id == parseInt(numId.value))
            {
                entry.child("Archive").update(snapshot.val());
            }
    });
	

	setUpJournal();
	contentDisplay.innerHTML = "Saved";
}
    
function deleteEntry(entryId)
{
    var currentEntryRef = database.ref("user/" + getCurrentUser().uid + "/Journals/" + localStorage.getItem("SelectedJournal") + "/Entries").orderByChild("Id").equalTo(entryId);
	entries = currentEntryRef.once('value').then(function (entry) {
		entry.update({ IsDeleted: 1})//hope this doesn't overwrite everything else in the entry 
	});
}
function hideEntry(entryId)
{
    // update entry to have ishidden = 1
}

function getFirebaseAuth() {
	return firebase.auth();
}

