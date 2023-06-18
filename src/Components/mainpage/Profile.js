import React, { useState, useEffect } from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";
import NavBar from "../ComonentsSmall/NavBar";
import { Link } from "react-router-dom";
import { FaOpencart, FaSignInAlt } from "react-icons/fa";
import "../style/Profile.css";

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
function Profile() {

  const currentUser = firebase.auth().currentUser;
  const [userData, setUserData] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [pass, setPass] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (currentUser) {
      const db = firebase.firestore();
      const unsubscribe = db
        .collection("users")
        .doc(currentUser.uid)
        .onSnapshot((snapshot) => {
          setUserData(snapshot.data());
          setLoading(false);
        });

      return unsubscribe;
    }
  }, [currentUser]);

  const handleEditClick = () => {
    setEditMode(true);
    setName(userData?.UserName || "");
    setEmail(userData?.UserEmail || "");
    setPhone(userData?.UserPhone || "");
    setPass(userData?.UserPass || "");
  };

  const handleSaveClick = async () => {
    await currentUser.updatePassword(pass);
    try {
      await firebase
        .firestore()
        .collection("users")
        .doc(currentUser.uid)
        .update({
          UserName: name,
          UserEmail: email,
          UserPhone: phone,
          UserPass: pass,
        });
      setEditMode(false);
    } catch (error) {
      console.log("Error updating user data:", error);
    }
  };

  const handleCancelClick = () => {
    setEditMode(false);
  };

  if (loading) {
    return (
      <div className="ShopsBG">
        <NavBar />
        <div className="empaty">
          <p>You Should Sign In First !</p>
          <FaSignInAlt className="FaOpencart"></FaSignInAlt>
          <span>
            <Link to={"/Sign-In-Now"}> SIGN In NOW </Link>
            {/* <span>OR</span>
              <Link to={"/home"}> Traking Now </Link> */}
          </span>
                    
        </div>
      </div>
    );
  }



  return (
    <>
      <NavBar />

      <div className="ProfContainr ShopsBG">
        {/* <h1>Profile</h1> */}

        <div className="ProfCardCont">
        <div>
           
           <img
             src="https://i.stack.imgur.com/GkJzB.png?s=192&g=1"
             className="ProfImage"
          
           />
         
       </div>
       
        <div>
         
          <div className="ProfName">
            <label>Name:</label>
            {editMode ? (
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            ) : (
              <div>{userData.UserName}</div>
            )}
          </div>
          <div className="ProfPhone">
            <label>Phone:</label>
            {editMode ? (
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            ) : (
              <div>{userData.UserPhone}</div>
            )}
          </div>
          <div className="ProfEmail">
            <label>Email:</label>
            {editMode ? (
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            ) : (
              <div>{userData.UserEmail}</div>
            )}
          </div>
          <div className="ProfPhone">
            <label>Password:</label>
            {editMode ? (
              <input
                type="text"
                value={pass}
                onChange={(e) => setPass(e.target.value)}
              />
            ) : (
              <div>{userData.UserPass}</div>
            )}
          </div>
          {editMode ? (
            <div>
              <button className="Profbtn" onClick={handleSaveClick}>Save</button>
              <button className="Profbtn" onClick={handleCancelClick}>Cancel</button>
            </div>
          ) : (
            <button className="Profbtn" onClick={handleEditClick}>Edit Profile</button>
          )}
        </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
