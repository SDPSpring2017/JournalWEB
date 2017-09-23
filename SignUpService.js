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
            //have to wait for currentUser to be initialised before accessing their UID
            setTimeout(function() { writeAccountDetails(); }, 3000);
			      
        }
        else
        {
        alert("There was a sign up error. Please try again.");
        }
		     
}
function createAuthenticationUser()
{
    var signUpError = false;
    
    var email = getTxtEmailInput();
	var password = getTxtPasswordInput();
	var newUser = getFirebaseAuth().createUserWithEmailAndPassword(email, password);
    newUser.catch(e => {console.log(e.message); signUpError = true;});
    return signUpError;
}
function writeAccountDetails()
{
     database.ref("user").child(getFirebaseAuth().currentUser.uid).set({
					FName: getTxtFNameInput(),
					LName: getTxtLNameInput(),
					Email: getTxtEmailInput(),
					Password: getTxtPasswordInput()
				}); 

}