(function(){

    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyB4S9RSrlGC1Pv8FGBx9ACVj_G5CXKRNWg",
        authDomain: "reserchproject-497d3.firebaseapp.com",
        databaseURL: "https://reserchproject-497d3.firebaseio.com",
        projectId: "reserchproject-497d3",
        storageBucket: "reserchproject-497d3.appspot.com",
        messagingSenderId: "71410703348"
    };
    firebase.initializeApp(config);
    
    var uploadProgress = document.getElementById("uploader");
    var fileUpload = document.getElementById("fileBtn");
    var storage = firebase.storage();

    fileUpload.addEventListener("change", e => {
        var file = e.target.files[0];
        var filePath = 'mytest_folder/' + file.name;
        var storageRef = storage.ref(filePath);
        var uploadTask = storageRef.put(file);

        //upload progress bar
        uploadProgress.classList.remove('hide');
        uploadTask.on('state_changed', 
            snap => {                
                var percentage = (snap.bytesTransferred / snap.totalBytes) * 100;
                uploadProgress.value = percentage;
            }, 
            err => {
                console.log(err);
            },
            () => {
                uploadProgress.classList.add('hide');
                fileUpload.value = '';                
                loadImage(filePath);
            }
        );
    });

    function loadImage(filePath){
        // Create a reference to the file we want to download
        var fileRef = storage.ref(filePath);

        // Get the download URL
        fileRef.getDownloadURL()
        .then(function(url) {
            var img = document.createElement('img');
            img.src = url;
            document.getElementById("output").appendChild(img);
        })
        .catch(function(error) {
            // A full list of error codes is available at
            // https://firebase.google.com/docs/storage/web/handle-errors
            switch (error.code) {
                case 'storage/object_not_found':
                    alert("File doesn't exist");
                    break;
                case 'storage/unauthorized':
                    alert("User doesn't have permission to access the object");
                    break;
                case 'storage/canceled':
                    alert("User canceled the upload");
                    break;               
                case 'storage/unknown':
                    alert("Unknown error occurred, inspect the server response");
                    break;
                default:
                    alert(error.message);
            }
        });
    }
}());
