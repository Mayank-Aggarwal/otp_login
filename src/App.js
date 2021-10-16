import React, { useEffect, useState } from "react";
import "./App.css";

import firebase from "firebase/app";
import "firebase/auth";

// react router
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

//components
import SignIn from "./components/SignIn";
import Home from "./components/Home";

const App = () => {
  const [viewOtpForm, setViewOtpForm] = useState(false);
  const [user, setUser] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState(null);
  const firebaseConfig = {
    apiKey: "AIzaSyBPlUUoZRP4LhuXUsv_0WgSMtj2du5DI5k",
    authDomain: "trackman-bysavio.firebaseapp.com",
    projectId: "trackman-bysavio",
    storageBucket: "trackman-bysavio.appspot.com",
    messagingSenderId: "540424581903",
    appId: "1:540424581903:web:1149938fd35dccc859047a",
    measurementId: "G-LPHWV1CQWG",
  };

  useEffect(() => {
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
      "recaptcha-container",
      {
        size: "invisible",
        callback: function (response) {
          console.log("Captcha Resolved");
          this.onSignInSubmit();
        },
        defaultCountry: "IN",
      }
    );
  }, []);

  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  } else {
    firebase.app(); // if already initialized, use that one
  }

  const auth = firebase.auth();

  auth.onAuthStateChanged((user) => {
    if (user) {
      setUser(user);
    }
  });

  const loginSubmit = (e) => {
    e.preventDefault();

    let phone_number = "+91" + e.target.phone.value;
    setPhoneNumber(phone_number)
    const appVerifier = window.recaptchaVerifier;

    auth
      .signInWithPhoneNumber(phone_number, appVerifier)
      .then((confirmationResult) => {
        // SMS sent. Prompt user to type the code from the message, then sign the
        // user in with confirmationResult.confirm(code).
        console.log("otp sent");
        setViewOtpForm(true);
        window.confirmationResult = confirmationResult;
        // ...
      })
      .catch((error) => {
        // Error; SMS not sent
        // ...
        alert(error.message);
      });
  };

  const otpSubmit = (opt_number) => {
    // e.preventDefault();

    window.confirmationResult
      .confirm(opt_number)
      .then((confirmationResult) => {
        window.open("/", "_self");
      })
      .catch((error) => {
        // User couldn't sign in (bad verification code?)
        alert(error.message);
      });
  };

  const signOut = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        window.open("/signin", "_self");
      })
      .catch((error) => {
        // An error happened.
        console.log(error);
      });
  };

  return (
    <Router>
      <div id="recaptcha-container"></div>
      <Switch>
        <Route path="/" exact>
          <Home signOut={signOut} user={user} />
        </Route>
        <Route path="/signin" exact>
          <SignIn
            loginSubmit={loginSubmit}
            otpSubmit={otpSubmit}
            viewOtpForm={viewOtpForm}
            phoneNumber={phoneNumber}
          />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;