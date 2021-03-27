import React, { useContext } from 'react';
// import React from 'react';
import "firebase/auth";
import firebase from "firebase/app";
import firebaseConfig from "./firebase.config";
import { UserContext } from '../../App';

if(!firebase.apps.length){
    firebase.initializeApp(firebaseConfig);
}

const Login = () => {
    const [loggedInUser, setLoggedInUser] = useContext([UserContext]);

    const handleGoogleSignIn = () => {
        const google = new firebase.auth.GoogleAuthProvider();

        firebase.auth().signInWithPopup(google)
            .then((result) => {
                const { displayName, email } = result.user;
                const signedInUser = { name: displayName, email }
                setLoggedInUser(signedInUser)
                
            })

            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                const email = error.email;
                const credential = error.credential;
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