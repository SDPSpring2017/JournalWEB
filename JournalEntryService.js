var txtTitle, txtBody, btnEntries, entriesDisplay, contentDisplay;
var database;
var entries;
var showDeleted = false, showHidden = false, showActive = true;
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
    var entryValues = "";
    if(entries != null)
        {
            entryValues = Object.values(entries);            
        }
    
	if(entryValues != "") {
        entriesDisplay.innerHTML = "";
        
        entryValues.forEach(function(entry){
			if (entry != "") {
                if(entry.IsDeleted == 1 && showDeleted)
                    {
                        entriesDisplay.innerHTML +=
					'<div>\
						<button onclick="displayEntryContent(' + entry.Id + ')" class="btnDeleted">' +
							entry.Date +
						'</button>\
					</div>';
                    }
                if(entry.IsHidden && showHidden)
                    {
                       entriesDisplay.innerHTML +=
					'<div>\
						<button onclick="displayEntryContent(' + entry.Id + ')">' +
							entry.Date +
						'</button>\
					</div>';
                    }
                if(entry.IsDeleted == 0 && entry.IsHidden == 0 && showActive)
                    {
                        entriesDisplay.innerHTML +=
					'<div>\
						<button onclick="displayEntryContent(' + entry.Id + ')">' +
							entry.Date +
						'</button>\
					</div>';
                    }
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
            var deleteButton = '<button onclick = "deleteEntry('+ entry.Id + ')">Delete </button>';
            var hideButton = '<button onclick = "hideEntry('+ entry.Id + ')">Hide </button>';
            var editButton = '<button id="btnEdit" onclick="editEvent(' + entry.Id + ')">Edit</button>';
            if(entry.IsDeleted ==1)
                {
                    deleteButton = "";
                    editButton = "";
                    hideButton = "";
                }
            if(entry.IsHidden == 1)
                {
                    hideButton = '<button onclick = "unhideEntry('+ entry.Id + ')">Unhide </button>'
                }
            contentDisplay.innerHTML =
		entry.Id + ': ' + entry.Title + '<br>' + entry.Date + 
		'<br>Summary<br>' + entry.Summary +
		'<br>Key Decisions<br>' + entry.Decisions +
		'<br>Outcomes<br>' + entry.Outcomes +'<br>'+
		deleteButton + hideButton + editButton;
        }
	
}

function displayEntryForm(title, id, summary, decisions, outcomes) {
	contentDisplay.innerHTML = 
		'<input id="txtTitle" type="text" placeholder="Entry Title" value="' + title + '"><br>\
		<label>Summary<br><textarea id="txtSummary" type="text" placeholder="Summary">' + summary + '</textarea></label><br>\
		<label>Key Decisions<br><textarea id="txtDecisions" type="text" placeholder="Key Decisions">' + decisions + '</textarea></label><br>\
		<label>Outcomes<br><textarea id="txtOutcomes" type="text" placeholder="Outcomes">' + outcomes + '</textarea></label><br>\
		<button id="btnSave" onclick="saveEvent('+id+')">Save</button>';
}

function editEvent(entryId)
{
    var entry = findEntry(entryId);
    displayEntryForm(entry.Title, entry.Id, entry.Summary, entry.Decisions, entry.Outcomes);
}

function saveEvent(id) {
    var isDeleted = 0;
    var isHidden = 0;
    var entryId = (id == undefined)? new Date().getTime() : id;
     
	txtTitle = document.getElementById('txtTitle');
	txtBody = document.getElementById('txtBody');
    txtSummary =  document.getElementById('txtSummary');
    txtDecisions = document.getElementById('txtDecisions'); 
    txtOutcomes = document.getElementById('txtOutcomes');

	var entry = database.ref("user/" + getCurrentUser().uid + "/Journals/" + localStorage.getItem("SelectedJournal") + "/Entries/" + entryId);
    entry.once('value').then(function(snapshot) {
        if(snapshot.val() != null)
            {
               isDeleted = snapshot.val().IsDeleted;
               isHidden = snapshot.val().IsHidden;
                entryId = snapshot.val().Id;
            }
            entry.update(
		{
			Id: entryId,
			Title: txtTitle.value,
			Summary: txtSummary.value,
			Decisions: txtDecisions.value,
			Outcomes: txtOutcomes.value,
			Date: Date(),
            IsDeleted : isDeleted,
            IsHidden : isHidden
		}); 
        if(snapshot.val() != null)
            {
                entry.child("Archive").update(snapshot.val());
            }
        
       
    });
	

	setUpJournal();
}
    
function deleteEntry(entryId)
{
    if (confirm('Are you sure you want to deleted this entry?')) 
    {
        var currentEntryRef = database.ref("user/" + getCurrentUser().uid + "/Journals/" + localStorage.getItem("SelectedJournal") + "/Entries/" + entryId);
	currentEntryRef.once('value').then(function (entry) {
		currentEntryRef.update({ IsDeleted: 1, IsHidden: 0})
	});
    alert("Entry has been deleted.");
    }
    
    setUpJournal();
}
function hideEntry(entryId)
{
    var currentEntryRef = database.ref("user/" + getCurrentUser().uid + "/Journals/" + localStorage.getItem("SelectedJournal") + "/Entries/" + entryId);
	currentEntryRef.once('value').then(function (entry) {
		currentEntryRef.update({ IsHidden: 1})
	});
    alert("Entry has been hidden");
    setUpJournal();
}
function unhideEntry(entryId)
{
    var currentEntryRef = database.ref("user/" + getCurrentUser().uid + "/Journals/" + localStorage.getItem("SelectedJournal") + "/Entries/" + entryId);
	currentEntryRef.once('value').then(function (entry) {
		currentEntryRef.update({ IsHidden: 0})
	});
    alert("Entry has been unhidden");
    setUpJournal();
}
function filterEntriesByStatus()
{

        showActive = document.getElementById("activeEntryCB").checked;
        showDeleted = document.getElementById("deletedEntryCB").checked;
        showHidden = document.getElementById("hiddenEntryCB").checked;
        displayEntries();

}

function getFirebaseAuth() {
	return firebase.auth();
}

