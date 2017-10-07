var txtTitle, numId, txtBody, btnSave, database, journals;

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
    //TODO add listener for new journals
	var journalValues = Object.values(journals);
	journalsDisplay.innerHTML = "";
	journalValues.forEach(function (journal) {
		if (journal != "") {
			journalsDisplay.innerHTML +=
				'<div>\
					<button onclick="displayEntries(' + journal.DateCreated + ')">' +
						journal.Title +
					'</button>\
                    <label>Date Created: '+ journal.DateCreated +'\
				</div>';
		}
	});
}

function CreateNewJournal(){
   document.getElementById("newJournal").style.display = "block";      
}
function submitCreateJournal()
{
   var newJournalTitle = document.getElementById("newJournalTitle").value;
    if(newJournalTitle != null && newJournalTitle != "")
    {
      database.ref("user").child(getCurrentUser().uid).child("Journals").child(new Date().getTime()).set(
	{
		Title: newJournalTitle,
		DateCreated: + new Date()
	});
    alert("New journal " + newJournalTitle + " has been created");
    setUpJournals();
    }
    else
    {
        alert("Please type a valid title to create the new journal.");    
    }
}


function displayEntries(journalDateCreated) {
	
   database.ref("user/" + getCurrentUser().uid + "/Journals/" + journalDateCreated + "/Entries").once('value').then(function (entries){
     entriesDisplay.innerHTML = "";
       if(entries.length ==0)
           {
               entriesDisplay.innerHTML = "This journal does not contain any entries";
           }
       else
           {
               	entries.forEach(function (entry) {
		if (entry.val().length != 0) {
			entriesDisplay.innerHTML +=
				'<table>\
				<tbody>\
					<tr>\
						<td>' + entry.val().Id + ':' + entry.val().Title + '</td>\
					</tr>\
						<td>' + entry.val().Summary + '</td>\
					<tr>\
				</tbody>\
		</table>';
		}
	});
	entriesDisplay.innerHTML +=
		'<button onclick="goToJournal(' + journalDateCreated + ')">' +
			"Go to journal" +
		'</button>';
           }
   });
   
   
}

function goToJournal(journalDateCreated) {
    localStorage.setItem("SelectedJournal", journalDateCreated)
	window.location = "JournalEntryView.html";
}
