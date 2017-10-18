function setUp()
{
    populateSignUp();
    populateCreateJournal();
    populateViewJournal();
    populateViewEntries();
    populateCreateEntry();
    populateEditEntry();
    populateViewEntryHistory();
    populateSearchEntry();
    populateDeleteEntry();
    populateHideEntry();
    populateFilterEntry();
}
function populateFilterEntry()
{
    document.getElementById("FilterEntriesHelp").innerHTML = "To filter entries, select the statuses which you would like to view and select filter.";
    document.getElementById("FilterEntriesHelp").innerHTML += '<br>';
    document.getElementById("FilterEntriesHelp").innerHTML += '<img src="images/filterentries1.png" alt="Search entries button">';
    document.getElementById("FilterEntriesHelp").innerHTML += "Then an entry.";
    document.getElementById("FilterEntriesHelp").innerHTML += '<br>';
    document.getElementById("FilterEntriesHelp").innerHTML += '<img src="images/filterentries2.png" alt="Search entries button">';

}
function populateHideEntry()
{
    document.getElementById("HideEntriesHelp").innerHTML = "To hide an entry, click on the entry and select the hide button.";
    document.getElementById("HideEntriesHelp").innerHTML += '<br>';
    document.getElementById("HideEntriesHelp").innerHTML += '<img src="images/hideentries1.png" alt="Search entries button">';
    document.getElementById("HideEntriesHelp").innerHTML += "Click ok on the warning";
    document.getElementById("HideEntriesHelp").innerHTML += '<br>';
    document.getElementById("HideEntriesHelp").innerHTML += '<img src="images/hideentries2.png" alt="Search entries button">';
}
function populateDeleteEntry()
{
    document.getElementById("DeleteEntriesHelp").innerHTML = "To delete an entry, click on the entry and select the delete button. Please note, deleting an entry is permanent. The entry can still be viewed after deletion however it cannot be edited.";
    document.getElementById("DeleteEntriesHelp").innerHTML += '<br>';
    document.getElementById("DeleteEntriesHelp").innerHTML += '<img src="images/deleteentries1.png" alt="Search entries button">';
    document.getElementById("DeleteEntriesHelp").innerHTML += "Click ok on the warning";
    document.getElementById("DeleteEntriesHelp").innerHTML += '<br>';
    document.getElementById("DeleteEntriesHelp").innerHTML += '<img src="images/deleteentries2.png" alt="Search entries button">';
}

function populateSearchEntry()
{
    document.getElementById("SearchEntriesHelp").innerHTML = "Enter a key word into the search bar and click search to find entries containing the key word";
    document.getElementById("SearchEntriesHelp").innerHTML += '<br>';
    document.getElementById("SearchEntriesHelp").innerHTML += '<img src="images/searchentries1.png" alt="Search entries button">';
    document.getElementById("SearchEntriesHelp").innerHTML += "The search results will appear based on the status filter and the key word";
    document.getElementById("SearchEntriesHelp").innerHTML += '<br>';
    document.getElementById("SearchEntriesHelp").innerHTML += '<img src="images/searchentries2.png" alt="Search entries button">';
    document.getElementById("SearchEntriesHelp").innerHTML += "To view all entries again, remove the search text and click the search button";
    

}

function populateViewEntryHistory()
{
    document.getElementById("HistoryEntriesHelp").innerHTML = "Click on an entry and the edit button to being editting an entry.";
    document.getElementById("HistoryEntriesHelp").innerHTML += '<br>';
    document.getElementById("HistoryEntriesHelp").innerHTML += '<img src="images/historyentries1.png" alt="Click on Sign Up button">';
    document.getElementById("HistoryEntriesHelp").innerHTML += "The entries revisions are displayed.";
    document.getElementById("HistoryEntriesHelp").innerHTML += '<br>';
    document.getElementById("HistoryEntriesHelp").innerHTML += '<img src="images/historyentries2.png" alt="Click on Sign Up button">';
}
function populateEditEntry()
{
     document.getElementById("EditEntriesHelp").innerHTML = "Click on an entry and the edit button to being editting an entry.";
    document.getElementById("EditEntriesHelp").innerHTML += '<br>';
    document.getElementById("EditEntriesHelp").innerHTML += '<img src="images/editentries1.png" alt="Click on Sign Up button">';
    document.getElementById("EditEntriesHelp").innerHTML += "Change entry contents as required then click save.";
    document.getElementById("EditEntriesHelp").innerHTML += '<br>';
    document.getElementById("EditEntriesHelp").innerHTML += '<img src="images/editentries2.png" alt="Click on Sign Up button">';
}
function populateSignUp()
{
    document.getElementById("SignUpHelp").innerHTML = "To begin use of the application, click on the Sign Up button or Register menu item to create an account. If you already have an account, enter your email and password then double click on the Sign In button.";
    document.getElementById("SignUpHelp").innerHTML += '<br>';
    document.getElementById("SignUpHelp").innerHTML += '<img src="images/signup1.png" alt="Click on Sign Up button">';
    document.getElementById("SignUpHelp").innerHTML += '<br>';
    document.getElementById("SignUpHelp").innerHTML +=
        "Enter your account details ensuring your password is at least 6 characters long. When you are ready, click on the Create Account button.";
   document.getElementById("SignUpHelp").innerHTML += '<br>';
    document.getElementById("SignUpHelp").innerHTML += '<img src="images/signup2.png" alt="Click on Register button">';
}
function populateViewJournal()
{
    document.getElementById("ViewJournalHelp").innerHTML = "Select a journal to preview.";
    document.getElementById("ViewJournalHelp").innerHTML += '<br>';
    document.getElementById("ViewJournalHelp").innerHTML += '<img src="images/viewjournal1.png" alt="Click on Journal button">';
}

function populateViewEntries()
{
    document.getElementById("ViewEntriesHelp").innerHTML = "Click on the go to journal button to view entries, entry history, and edit entries.";
   document.getElementById("ViewEntriesHelp").innerHTML += '<br>'; 
    document.getElementById("ViewEntriesHelp").innerHTML +='<img src="images/viewentries1.png" alt="Click on Journal button">';
   document.getElementById("ViewEntriesHelp").innerHTML += '<br>';
   document.getElementById("ViewEntriesHelp").innerHTML +="Click on an entry to view its contents";
   document.getElementById("ViewEntriesHelp").innerHTML += '<br>'; 
    document.getElementById("ViewEntriesHelp").innerHTML +='<img src="images/viewentries2.png" alt="Click on Journal button">';
}
function populateCreateEntry()
{
    document.getElementById("CreateEntriesHelp").innerHTML = "Click on the New entry button to create a new entry.";
    document.getElementById("CreateEntriesHelp").innerHTML += '<br>';
    document.getElementById("CreateEntriesHelp").innerHTML +='<img src="images/createentries1.png" alt="Click on Journal button">';
    document.getElementById("CreateEntriesHelp").innerHTML += '<br>';
    document.getElementById("CreateEntriesHelp").innerHTML += "Enter the entry contents in the corresponding fields.";
    
    document.getElementById("CreateEntriesHelp").innerHTML += '<br>';
    document.getElementById("CreateEntriesHelp").innerHTML +='<img src="images/createentries2.png" alt="Click on Journal button">';
    
    document.getElementById("CreateEntriesHelp").innerHTML += "To attach a file, select the Choose Files button and select from the file explorer";
    document.getElementById("CreateEntriesHelp").innerHTML += '<br>';
    document.getElementById("CreateEntriesHelp").innerHTML +='<img src="images/attachfile1.png" alt="Click on Journal button">';
    document.getElementById("CreateEntriesHelp").innerHTML += "Click open in the file explorer to attach the file. Then click save to add the entry to the journal's entries.";
    document.getElementById("CreateEntriesHelp").innerHTML += '<br>';
    document.getElementById("CreateEntriesHelp").innerHTML +='<img src="images/attachfile2.png" alt="Click on Journal button">';
}
function populateCreateJournal()
{
    document.getElementById("CreateJournalHelp").innerHTML = "Click on the create journal button to begin creating your journal.";
   document.getElementById("CreateJournalHelp").innerHTML += '<br>'; document.getElementById("CreateJournalHelp").innerHTML += '<img src="images/createjournal1.png" alt="Click on Create Journal button">';
    document.getElementById("CreateJournalHelp").innerHTML += '<br>';
    document.getElementById("CreateJournalHelp").innerHTML += "Enter the title of the journal and click create journal.";
   document.getElementById("CreateJournalHelp").innerHTML += '<br>'; document.getElementById("CreateJournalHelp").innerHTML +='<img src="images/createjournal2.png" alt="Click on Create Journal button">';
}