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
    
    var obj = document.getElementById("obj");  
    var list = document.getElementById("list");  


    // ********* Read data *********
    // ** Change from 'on' to be 'once' to snap your data without listening for changes 

    // value events          
    var dbRef = firebase.database().ref().child("ports");
    dbRef.on('value', snap => {
        obj.innerHTML = JSON.stringify(snap.val(), null, 3);
    });
        
    // child event (child_add, child_remove, )   
    dbRef.on('child_added', snap => {
        console.log('added');
        const li = document.createElement("li");
        li.id = snap.key;
        li.innerText = snap.key + '-->' + snap.val();
        list.appendChild(li);
    });

    dbRef.on('child_changed', snap => {
        console.log('changed');
        const li = document.getElementById(snap.key);        
        li.innerText = snap.key + '-->' + snap.val();        
    });

    dbRef.on('child_removed', snap => {
        console.log('removed');
        const li = document.getElementById(snap.key);        
        li.remove();        
    });


    // ********* Write data *********

    // set() => overide the exiting one
    dbRef.set({
        username: 'name',
        email: 'email',
        profile_picture : 'imageUrl'
    });

    // update() => update only that child not others    
    var postData = {
        author: 'username',
        uid: 'uid',
        body: 'body',
        title: 'title',
        starCount: 0,
        authorPic: 'picture'
    };    
    var newPostKey = firebase.database().ref().child('posts').push().key; // Get a key for a new Post.    
    var updates = {}; 
    updates['/posts/' + newPostKey] = postData;
    updates['/user-posts/user2/' + newPostKey] = postData;
    // Write the new post's data simultaneously in the posts list and the user's post list.
    firebase.database().ref().update(updates);


    // ********* Remove data *********

    // remove() => remove single oject ref
    firebase.database().ref().child("posts").child(newPostKey).child("authorPic").remove();

    // update(null) => remove multiple data
    var removes = {}; 
    removes['/posts/' + newPostKey + '/title'] = null;
    removes['/user-posts/user2/' + newPostKey + '/title'] = null;
    firebase.database().ref().update(removes);
}());
