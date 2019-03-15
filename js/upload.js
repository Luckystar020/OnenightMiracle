var provider = new firebase.auth.GoogleAuthProvider();
var user = sessionStorage.getItem('uid');
var selectedFile;
var URLImage;


$(document).ready(function() {
    document.getElementById("upload").addEventListener('change', handleFileSelect, false);
});

function handleFileSelect(event) {
    selectedFile = event.target.files[0];
};

function confirmUpload() {
    var metadata = {
        contentType: 'image',
        customMetadata: {
            'uploadedBy': user,
        },
    };
    var uploadTask = firebase.storage().ref().child('img/' + selectedFile.name).put(selectedFile, metadata);
    // Register three observers:
    // 1. 'state_changed' observer, called any time the state changes
    // 2. Error observer, called on failure
    // 3. Completion observer, called on successful completion
    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, function(snapshot) {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        switch (snapshot.state) {
            case firebase.storage.TaskState.PAUSED: // or 'paused'
                console.log('Upload is paused');
                break;
            case firebase.storage.TaskState.RUNNING: // or 'running'
                console.log('Upload is running');
                break;
        }
    }, function(error) {
        // Handle unsuccessful uploads
    }, function() {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
            sessionStorage.setItem('ImgURL', downloadURL);
            console.log(`Get ${uploadTask.snapshot.b}`, sessionStorage.getItem('ImgURL'));
            // console.log('File available at', downloadURL);

        });
    });
}