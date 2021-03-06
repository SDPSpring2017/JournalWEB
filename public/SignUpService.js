function setUp()
{
	firebase.initializeApp(getConfig());
	database = firebase.database();
	realTimeAuthListenter();
}

function getBtnCreateAccount()
{
	return document.getElementById('btnCreateAccount');
}

function getTxtFNameInput()
{
	return document.getElementById('txtFNameInput').value;
}

function getTxtLNameInput()
{
	return document.getElementById('txtLNameInput').value;
}

function getTxtEmailInput()
{
	return document.getElementById('txtEmailInput').value;
}

function getTxtPasswordInput()
{
	return document.getElementById('txtPasswordInput').value;
}

function getFirebaseAuth()
{
	return firebase.auth();
}


function SignUpEvent()
{
    var signUpError = createAuthenticationUser();
    
        if(!signUpError)
        {
            //have to wait for currentUser to be initialised before accessing their UID so I'm giving it 3 seconds
            setTimeout(function() { writeAccountDetails(); }, 3000);
			      
        }
        else
        {
        alert("Incorrect details entered, please verify: you have entered your details into each text field and your password is at least 6 characters long");
        }
    
		     
}
function createAuthenticationUser()
{
    var signUpError = false;
    var email = getTxtEmailInput();
	var password = getTxtPasswordInput();
    signUpError = (getTxtFNameInput().length < 1 || getTxtLNameInput().length < 1 || email.length < 1 || password.length < 6);
    if(signUpError) return signUpError;
	var newUser = getFirebaseAuth().createUserWithEmailAndPassword(email, password);
    newUser.catch(e => {console.log(e.message); signUpError = true;});
    return signUpError;
}
function writeAccountDetails()
{
     database.ref("user").child(getCurrentUser().uid).child("AccountDetails").set({
					FName: getTxtFNameInput(),
					LName: getTxtLNameInput(),
					Email: getTxtEmailInput(),
					Password: getTxtPasswordInput()
				});
   
ChangeWindowLocationToJournal();
}
function ChangeWindowLocationToJournal()
{
    window.location = "JournalView.html";
}