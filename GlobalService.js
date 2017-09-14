function ConnecttoDatabase()
{
  
    
    var bigOne = document.getElementById('testHeader');
    var dbRef = firebase.database().ref().child('Test');
    //sync changes
    dbRef.on('value', snap => bigOne.innerText = snap.val());
}


