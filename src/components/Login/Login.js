import React, { useContext } from 'react';
// import React from 'react';
import "firebase/auth";
import firebase from "firebase/app";
import firebaseConfig from "./firebase.config";
import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router';

if(!firebase.apps.length){
    firebase.initializeApp(firebaseConfig);
}

const Login = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const history = useHistory();
    const location = useLocation();
    const { from } = location.state || { from: { pathname: '/' } };

    const handleGoogleSignIn = () => {
        const google = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(google)
            .then((result) => {
                const { displayName, email } = result.user;
                const signedInUser = { name: displayName, email }
                setLoggedInUser(signedInUser)
                history.replace(from);
            })

            .catch((error) => {
                const errorMessage = error.message;
                console.log(errorMessage)
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