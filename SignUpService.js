// not really working right now will get back to later
function getBtnCreateAccount()
{
    return document.getElementById('btnCreateAccount');
}
function getTxtFNameInput()
{
    return document.getElementById('txtFNameInput');
}
function getTxtLNameInput()
{
    return document.getElementById('txtLNameInput');
}
function getTxtEmailInput()
{
    return document.getElementById('txtEmailInput');
}
function getTxtPasswordInput()
{
    return document.getElementById('txtPasswordInput');
}
function getFirebaseAuth()
{
    return firebase.auth();
}
function SignUpEvent()
{
getBtnCreateAccount().addEventListener('click', e=>
    {
     dbRef.ofAuth(function()
                 {
         dbRef.child("user").child(getFireBaseAuth().uid).set({
         FName: getTxtFNameInput(),
         LName: getTxtLNameInput(),
         Email: getTxtEmailInput(),
         Password: getTxtEmailInput()
     })
     })
 });
}