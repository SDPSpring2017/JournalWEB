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
	journalValues.forEach(function (journal) {
		if (journal != "") {
			journalsDisplay.innerHTML +=
				'<div>\
					<button onclick="displayEntries(' + journal.DateCreated + ')">' +
						journal.Title +
					'</button>\
				</div>';
            entriesList.push(journal);// so why are we putting journals into the entry list tho?
		}
	});
}

function CreateJournal(){
	//TODO check if they have any journals in the first place
   document.getElementById("newJournal").style.visibility = "visible";
    /*database.ref("user").child(getCurrentUser().uid).child("Journals").child(new Date().getTime()).set(
	{
		Title: "Testing",
		DateCreated: + new Date()
	});*/
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
		if (entry != "") {
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
