import React, { useState } from "react";
import { NavLink } from "react-bootstrap";
import { FaUserAlt, FaLock, FaEnvelope, FaPhone } from "react-icons/fa";
import inverted from "./img/inverted.png";
import signuplogo from "./img/signuplogoo.png";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";
import { useNavigate } from "react-router-dom";
import "../style/reglogin.css";
function RegLogin() {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState(null);
  const [className, setClassName] = useState("");
  const navigate = useNavigate();

  const handleClick = () => {
    if (className === "") {
      setClassName("sign-up-mode");
    } else {
      setClassName("");
    }
  };

  const firebaseConfig = {
    apiKey: "AIzaSyD9mLMTo7d-DKGa45I9Z29l7ZMvuPfLt8U",
    authDomain: "beebuy-8d00b.firebaseapp.com",
    projectId: "beebuy-8d00b",
    storageBucket: "beebuy-8d00b.appspot.com",
    messagingSenderId: "308687130467",
    appId: "1:308687130467:web:3e511e2da94c94608bcd56",
    measurementId: "G-J2L358R5L8",
  };
  firebase.initializeApp(firebaseConfig);
  const handleSignIn = async (event) => {
    event.preventDefault();
    try {
      await firebase
        .auth()
        .signInWithEmailAndPassword(loginEmail, loginPassword);
      setLoginEmail("");
      setLoginPassword("");
      setError(null);
      navigate("/");
    } catch (error) {
      setError(error.message);
    }
  };
  const handleSignUp = async (event) => {
    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION);
    validateName();
    validateEmail();
    validatePass();
    validateRepass();
    validatePhone();
    event.preventDefault();
    try {
      const result = await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
          userCredential.user.sendEmailVerification();
          createUserCollection(userCredential.user, userName, email, phone);
          handleClick(); 
        });
      await result.user.updateProfile({
        displayName: "User",
      });
    } catch (err) {
      console.log(err);
    }
    setUserName("");
    setEmail("");
    setPassword("");
    setRePassword("");
    setPhone("");
  };

  function createUserCollection(user, name, email, phone) {
    const db = firebase.firestore();
    const collection = db.collection("users");
    const maskedPassword = "*".repeat(password.length);
    collection.doc(user.uid).set({
      UserName: name,
      UserEmail: email,
      UserPhone: phone,
      UserPass:maskedPassword,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    });
  }
  function validateName() {
    let userName = document.querySelector("[name='username']");
    let name = userName.value;
    let nameerror = document.getElementById("name-error");
    if (name.length === 0) {
      nameerror.innerHTML = "Username is required";
      return false;
    }
    if (!name.match(/^[A-Za-z]*\s{1}[A-Za-z]*$/)) {
      nameerror.innerHTML = "Write full name";
      return false;
    }
    nameerror.innerHTML = "";
    return true;
  }

  function validateEmail() {
    let userEmail = document.querySelector("[name='email']");
    let email = userEmail.value;
    let emailerror = document.getElementById("email-error");
    if (email.length === 0) {
      emailerror.innerHTML = "Email is required";
      return false;
    }
    if (!email.match(/^[A-Za-z._\-[0-9]*[@][A-Za-z]*[.][a-z]{2,4}$/)) {
      emailerror.innerHTML = "Email invalid";
      return false;
    }
    emailerror.innerHTML = "";
    return true;
  }

  function validatePass() {
    let userPass = document.querySelector("[name='signupPassword']");
    let pass = userPass.value;
    let passerror = document.getElementById("pass-error");
  
    if (pass.length === 0) {
      passerror.innerHTML = "Password is required";
      return false;
    }
  
    if (pass.length < 8) {
      passerror.innerHTML = "Password length must be at least 8 characters";
      return false;
    }
  
    if (pass.length > 16) {
      passerror.innerHTML = "Password length shouldn't exceed 16 characters";
      return false;
    }
  
    let regex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$&*~]).{8,}$/;
    if (!regex.test(pass)) {
      passerror.innerHTML = "Password must contain at least uppercase letter, lowercase letter, digit and special character";
      return false;
    }
  
    passerror.innerHTML = "";
    return true;
  }

  function validateRepass() {
    let userPass = document.querySelector("[name='signupPassword']");
    let userRepass = document.querySelector("[name='re_pass']");
    let repasserror = document.getElementById("repass-error");
    let repass = userRepass.value;
    if (repass.length === 0) {
      repasserror.innerHTML = "Password is Required";
      return false;
    }
    if (userPass.value !== userRepass.value) {
      repasserror.innerHTML = "Password didn't match";
      return false;
    } else {
      repasserror.innerHTML = "";
      return true;
    }
  }
  function validatePhone() {
    let userPhone = document.querySelector("[name='phone']");
    let phone = userPhone.value;
    let phoneerror = document.getElementById("phone-error");
    if (phone.length === 0) {
      phoneerror.innerHTML = "Phone no is required";
      return false;
    }
    if (phone.length !== 11) {
      phoneerror.innerHTML = "Phone no should be 11 digits";
      return false;
    }
    if (!phone.match(/^\d{11}$/)) {
      phoneerror.innerHTML = "Only digits please";
      return false;
    }
    if (!phone.match(/^(010|011|012|015)\d{8}$/)) {
      phoneerror.innerHTML = "Invalid phone number format, It should start with 010, 011, 012, or 015 followed by 8 digits.";
      return false;
    }
    phoneerror.innerHTML = "";
    return true;
  }
  return (
    <div className={`container ${className}`}>
      <div className="forms-container">
        <div className="signin-signup">
          <form
            action=""
            className="sign-in-form"
            autoComplete="off"
            onSubmit={handleSignIn}
          >
            <h2 className="title">Login</h2>
            <div className="input-field">
              <i>
                <FaUserAlt></FaUserAlt>
              </i>
              <input
                type="email"
                placeholder="Email"
                name="login_email"
                id="login_email"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
              />
              <span id="nameUs"></span>
            </div>
            <div className="input-field">
              <i>
                <FaLock></FaLock>{" "}
              </i>
              <input
                type="password"
                placeholder="Password"
                name="login_password"
                id="login_password"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
              />
              <span id="passPs"></span>
            </div>
            <button type="submit" className="btn solid" id="loginBtn">
              Login{" "}
            </button>
            {error && <div>Incorrect Email or Password</div>}
          </form>
          <form
            id="signup"
            className="sign-up-form"
            autoCapitalize="off"
            onSubmit={handleSignUp}
          >
            <h2 className="title">Sign Up</h2>
            <div className="input-field">
              <i>
                <FaUserAlt></FaUserAlt>{" "}
              </i>
              <input
                type="text"
                placeholder="Username"
                id="userName"
                name="username"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                onKeyUp={validateName}
              ></input>
              <span id="name-error"></span>
            </div>
            <div className="input-field">
              <i>
                <FaEnvelope></FaEnvelope>{" "}
              </i>
              <input
                type="email"
                placeholder="Email"
                id="signupEmail"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyUp={validateEmail}
              ></input>
              <span id="email-error"></span>
            </div>
            <div className="input-field">
              <i>
                {" "}
                <FaLock></FaLock>{" "}
              </i>
              <input
                type="password"
                placeholder="Password"
                id="signupPassword"
                name="signupPassword"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyUp={validatePass}
              ></input>
              <span id="pass-error"></span>
            </div>
            <div className="input-field">
              <i>
                {" "}
                <FaLock></FaLock>{" "}
              </i>
              <input
                type="password"
                placeholder="Confirm Password"
                id="re_pass"
                name="re_pass"
                value={rePassword}
                onChange={(e) => setRePassword(e.target.value)}
                onKeyUp={validateRepass}
              ></input>
              <span id="repass-error"></span>
            </div>
            <div className="input-field">
              <i>
                <FaPhone></FaPhone>{" "}
              </i>
              <input
                type="text"
                placeholder="Phone Number"
                id="phone"
                name="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                onKeyUp={validatePhone}
              ></input>
              <span id="phone-error"></span>
            </div>
            <button id="submit" name="submit" className="btn solid">
              Register
            </button>
          </form>
        </div>
      </div>
      <div className="panels-container">
        <div className="panel left-panel">
          <div className="content">
            <h3>Welcome Back :) </h3>
            <p>New Member !</p>
            <button onClick={handleClick} className="btn" id="sign-up-btn">
              Sign Up
            </button>
            <button
              className="btn"
              id="guest-btn"
              style={{ whiteSpace: "nowrap", width: "190px" }}
            >
              <NavLink onClick={() => navigate("/Home")}>
                Enter as a Guest
              </NavLink>
            </button>
          </div>
          <img src={inverted} className="image" alt="" />
        </div>

        <div className="panel right-panel">
          <div className="content">
            <div className="messsucc none" id="MessSucc">
              <h3>
                Registration succeeded
                <i className="fa-solid fa-check-double"></i>
                <i className="fa-solid fa-check-double"></i>
              </h3>
            </div>
            <h3> Welcome Aboard </h3>
            <p> Already a Member ! </p>
            <button onClick={handleClick} className="btn" id="sign-in-btn">
              Sign In
            </button>
          </div>
          <img src={signuplogo} className="image" alt="" />
        </div>
      </div>
    </div>
  );
}

export default RegLogin;
