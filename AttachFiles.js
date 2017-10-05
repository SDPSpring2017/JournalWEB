var database;
function setUp() {
    setUpDatabase();
    firebase.auth().onAuthStateChanged(function (currentUser) {
        if (currentUser) {
            console.log("User loaded");
        }
    });
}

function setUpDatabase() {
    firebase.initializeApp(getConfig());
    database = firebase.database();
    realTimeAuthListenter();
}



//Get elements
var uploader = document.getElementById('uploader');
var fileButton = document.getElementById('fileButton');

//Listen for file selection
fileButton.addEventListener('change', function (e) {
    //Get file
    var file = e.target.files[0];

    //Create a storage ref
    var storageRef = firebase.storage().ref('Attach_Files_Of_Users'
        + file.name);

    //Upload file
    var task = storageRef.put(file);

    //Update progress bar
    task.on('state_changed',
        function progress(snapshot) {
            var percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            uploader.value = percentage;
        },

        function error(err) {

        },

        function complete() {

        }
    );
});
