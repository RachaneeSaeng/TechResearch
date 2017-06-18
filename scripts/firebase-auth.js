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

    var btnLogout = document.getElementById("btnLogout");

    var txtEmail = document.getElementById("txtEmail");
    var txtPassword = document.getElementById("txtPassword");
    var btnLogin = document.getElementById("btnLogin");    
    var btnSignup = document.getElementById("btnSignup");

    // ------- Password Base ------
    btnLogin.addEventListener('click', e => {
      const email = txtEmail.value;
      const password = txtPassword.value;

      firebase.auth().signInWithEmailAndPassword(email, password)
      .catch(function(error) {
        console.log(error);
      });
    });

    btnSignup.addEventListener('click', e => {
      // todo: validate email
      const email = txtEmail.value;
      const password = txtPassword.value;

      firebase.auth().createUserWithEmailAndPassword(email, password)
      .catch(function(error) {
        console.log(error);
      });
    });

    // firebase.auth().sendPasswordResetEmail('rachanee.saeng@gmail.com')
    //   .catch(function(error) {
    //     console.log(error);
    //   });

    //     mAuth.sendPasswordResetEmail(email)
    // .addOnSuccessListener(new OnSuccessListener() {
    //     public void onSuccess(Void result) {
    //       // send email succeeded
    //     }
    //  }).addOnFailureListener(new OnFailureListener() {
    //     public onFailure(Exception e)
    //       // something bad happened
    //     }
    //  });

  // ***************** Google *****************
  var provider = new firebase.auth.GoogleAuthProvider();
  var btnLogin = document.getElementById("btnLoginGoogle");
  
  btnLogin.addEventListener('click', e => {
    firebase.auth().signInWithRedirect(provider);     
   });
  
  // ***************** Facebook *****************
  var provider = new firebase.auth.FacebookAuthProvider();
  var btnLogin = document.getElementById("btnLoginFacebook");

  btnLogin.addEventListener('click', e => {
    firebase.auth().signInWithRedirect(provider);
  });
  
  // ***************** Common function *****************
  // Redirect back from login
  firebase.auth().getRedirectResult().then(function(result) {
    if (result.credential) {
      // This gives you a Google Access Token. You can use it to access the Google API.
      var token = result.credential.accessToken;
      var gmailUserIfo = result.additionalUserInfo;
      var imageUrl = gmailUserIfo.profile.picture;
      var user = result.user; //Firebase user
    }        
    console.log(result);
  }).catch(function(error) {    
    var errorCode = error.code;
    var errorMessage = error.message;    
    var email = error.email;    
    var credential = error.credential;
    console.log(error);
  });  

  btnLogout.addEventListener('click', e => {      
      firebase.auth().signOut()      
      .catch(function(error) {
        console.log(error);
      });
    });

  //Add realtime listener
  firebase.auth().onAuthStateChanged(firebaseUser => {
      if(firebaseUser){          
        var name = firebaseUser.displayName;
        var email = firebaseUser.email;
        var photoUrl = firebaseUser.photoURL;
        var emailVerified = firebaseUser.emailVerified;
        var token = firebaseUser.getIdToken();  // The user's ID, unique to the Firebase project. Do NOT use
                        // this value to authenticate with your backend server, if
                        // you have one. Use User.getToken() instead.
        console.log(firebaseUser);  
        console.log(name, email, photoUrl, emailVerified, token);  
        btnLogin.classList.add('hidden'); 
        btnLogout.classList.remove('hidden');    
      }
      else {
        console.log('not logged in');
        btnLogin.classList.remove('hidden');
        btnLogout.classList.add('hidden');        
      }
  });

}());
