import firebase from "firebase/app";
// import React from 'react';
import "firebase/auth";
import React, { useContext } from "react";
import { useHistory, useLocation } from "react-router";
import { UserContext } from "../../App";
import firebaseConfig from "./firebase.config";

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const Login = () => {
  // eslint-disable-next-line no-unused-vars
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  const history = useHistory();
  const location = useLocation();
  const { from } = location.state || { from: { pathname: "/" } };

  const handleGoogleSignIn = () => {
    const google = new firebase.auth.GoogleAuthProvider();
    firebase
      .auth()
      .signInWithPopup(google)
      .then((result) => {
        const { displayName, email } = result.user;
        const signedInUser = { name: displayName, email };
        setLoggedInUser(signedInUser);
        storeAuthToken();
      })
      .catch((error) => {
        const errorMessage = error.message;
        console.log(errorMessage);
      });
  };

  const storeAuthToken = () => {
    firebase
      .auth()
      .currentUser.getIdToken(true)
      .then((idToken) => {
        sessionStorage.setItem("token", idToken);
        history.replace(from);
      });
  };

  return (
    <div>
      <h1>This is Login</h1>
      <button onClick={handleGoogleSignIn}>Google Sign In</button>
    </div>
  );
};

export default Login;
