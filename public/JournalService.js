var txtTitle, numId, txtBody, btnSave, database, journals;

function setUp() {
	setUpDatabase();
	firebase.auth().onAuthStateChanged(function(currentUser) {
	if (currentUser) {
		console.log("User loaded");
		setUpJournals();
	}
});
}

function setUpDatabase() {
	firebase.initializeApp(getConfig());
	database = firebase.database();
}


function setUpJournals() {
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
	//TODO add listener for new journals
	if (journals != null)
	{
		var journalValues = Object.values(journals);
	}
	journalsDisplay.innerHTML = "";
	journalValues.forEach(function (journal) {
		if (journal != "") {
			journalsDisplay.innerHTML +=
				'<div id="journalBtn"> \
					<button class="btn btn-default" onclick="displayEntries(' + journal.DateCreated + ')">' +
						journal.Title +
					'</button>\
				</div>';
		}
	});
}

function CreateNewJournal(){
	document.getElementById("newJournal").style.display = "block";
}

function submitCreateJournal() {
	var newJournalTitle = document.getElementById("newJournalTitle").value;
	if(newJournalTitle != null && newJournalTitle != "") {
		database.ref("user").child(getCurrentUser().uid).child("Journals").child(new Date().getTime()).set(
		{
			Title: newJournalTitle,
			DateCreated: + new Date()
		});
		alert("New journal " + newJournalTitle + " has been created");
		setUpJournals();
		document.getElementById("newJournal").style.display = "none";
	}
	else {
		alert("Please type a valid title to create the new journal.");
	}
}


function displayEntries(journalDateCreated) {
	database.ref("user/" + getCurrentUser().uid + "/Journals/" + journalDateCreated + "/Entries").once('value').then(function (entries){
		summaryDisplay.innerHTML = "";
		if(entries.val() == null) {
				summaryDisplay.innerHTML = "This journal does not contain any entries";
		}
		else {
			entries.forEach(function (entry) {
				if (entry.val().length != 0) {
					summaryDisplay.innerHTML +=
						'<div id="entryTable" class="container-fluid"><table align="left" class="table table-striped">\
							<tbody>\
								<tr>\
									<td id="tableTitle">' + entry.val().Id + ':' + ' ' + entry.val().Title + '</td>\
								</tr>\
									<td>' + entry.val().Summary + '</td>\
								<tr>\
							</tbody>\
						</table></div>';
				}
			});
		}
		summaryDisplay.innerHTML +=
			'<div id="journalBtn2" class="container-fluid"><button class="btn btn-info" onclick="goToJournal(' + journalDateCreated + ')">' +
				"Go to journal" +
			'</button></div>';
	});
}

function goToJournal(journalDateCreated) {
	localStorage.setItem("SelectedJournal", journalDateCreated)
	window.location = "JournalEntryView.html";
}
