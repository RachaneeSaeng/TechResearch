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
   
    var ui = new firebaseui.auth.AuthUI(firebase.auth());

    /**
     * @return {!Object} The FirebaseUI config.
     */
    function getUiConfig() {
      return {
        'callbacks': {      
          'signInSuccess': function(user, credential, redirectUrl) {
            handleSignedInUser(user);            
            return false; // Do not redirect.
          }
        },
        'signInFlow': 'redirect',
        'signInOptions': [   
          firebase.auth.FacebookAuthProvider.PROVIDER_ID,
          firebase.auth.GoogleAuthProvider.PROVIDER_ID,          
          firebase.auth.EmailAuthProvider.PROVIDER_ID   
        ],        
        'tosUrl': 'https://www.google.com' // Terms of service url.
      };
    }

    /**
     * Displays the UI for a signed in user.
     * @param {!firebase.User} user
     */
    var handleSignedInUser = function(user) {
      document.getElementById('user-signed-in').style.display = 'block';
      document.getElementById('user-signed-out').style.display = 'none';
      document.getElementById('name').textContent = user.displayName;
      document.getElementById('email').textContent = user.email;
      document.getElementById('phone').textContent = user.phoneNumber;
      if (user.photoURL){
        document.getElementById('photo').src = user.photoURL;        
      } else {
        document.getElementById('photo').src = 'images/anonymous-avatar.png';
      }
      document.getElementById('photo').style.display = 'block';
    };

    /**
     * Displays the UI for a signed out user.
     */
    var handleSignedOutUser = function() {
      document.getElementById('user-signed-in').style.display = 'none';
      document.getElementById('user-signed-out').style.display = 'block';
      ui.start('#firebaseui-container', getUiConfig());
    };

    // Listen to change in auth state so it displays the correct UI for when
    // the user is signed in or not.
    firebase.auth().onAuthStateChanged(function(user) {
      document.getElementById('loading').style.display = 'none';
      document.getElementById('loaded').style.display = 'block';
      user ? handleSignedInUser(user) : handleSignedOutUser();
    });

    var signOut = function() {
      firebase.auth().signOut();
    };

    /**
     * Deletes the user's account.
     */
    var deleteAccount = function() {
      firebase.auth().currentUser.delete().catch(function(error) {
        if (error.code == 'auth/requires-recent-login') {
          // The user's credential is too old. She needs to sign in again.
          firebase.auth().signOut().then(function() {
            // The timeout allows the message to be displayed after the UI has
            // changed to the signed out state.
            setTimeout(function() {
              alert('Please sign in again to delete your account.');
            }, 1);
          });
        }
      });
    };

    document.getElementById('sign-out').addEventListener('click', signOut);
    document.getElementById('delete-account').addEventListener('click', deleteAccount);

}());
