// import React, { useContext } from 'react';
import React from 'react';
import "firebase/auth";
import firebase from "firebase/app";
import firebaseConfig from "./firebase.config";

if(!firebase.apps.length){
    firebase.initializeApp(firebaseConfig);
}

const Login = () => {
    const handleGoogleSignIn = () => {
        var google = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(google)
            .then((result) => {
                var credential = result.credential;

                var token = credential.accessToken;
                var user = result.user;
                console.log(token, user);
            })
            .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                var email = error.email;
                var credential = error.credential;
                console.log(errorCode, errorMessage, email, credential);
            });
    }
    return (
        <div>
            <h1>This is Login</h1>
            <button onClick={handleGoogleSignIn}>Google Sign In</button>
        </div>
    );
};

export default Login;