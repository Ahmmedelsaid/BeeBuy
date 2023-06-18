import React, { useState, useEffect } from "react";
import "../style/navStyle.css";
import imgLogo from "./logo.png"
import {
  FaAngellist,
  FaBars,
  FaBolt,
  FaFacebook,
  FaHome,
  FaOpencart,
  FaRocketchat,
  FaSignOutAlt,
  FaTelegram,
  FaTwitter,
  FaUserAlt,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";
function NavBar() {
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
  const [isSignedIn, setIsSignedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const auth = firebase.auth();
    auth.onAuthStateChanged((user) => {
      setIsSignedIn(!!user);
    });
  }, []);
  const handleAuthClick = () => {
  const auth = firebase.auth();

  if (isSignedIn) {
    const confirmed = window.confirm("Are you sure you want to log out?");

    if (confirmed) {
      auth.signOut();
      navigate("/Sign-In-Now");
      
    }
  } else {
    navigate("/Sign-In-Now");
  }
};


//  window.addEventListener("resize", checked);

//  function checked() {
//   const NavMedia = document.getElementsByClassName("NavMedia")[0];
  
//   if (NavMedia.style.display == "flex") {
//     console.log("ac");
//   }else{
//     console.log("noootactive");

//   }
//  }


  const controllMedia = () => {
    const NavOriginal = document.getElementById("Nav");

    if (NavOriginal.classList.contains("active")) {
      NavOriginal.classList.remove("active");
      NavOriginal.style.width = "0";
      NavOriginal.style.height = "100%";
      NavOriginal.style.zIndex = "200";
    } else {
      NavOriginal.classList.add("active");
      NavOriginal.style.width = "100%";
      NavOriginal.style.height = "100%";
      NavOriginal.style.zIndex = "200";
    }
  };
  return (
    <div>
      <div className="NavMedia">
        <div>
          <Link to="/">Bee Buy</Link>
          <div onClick={controllMedia} id="navbarScrollz">
            <FaBars></FaBars>
          </div>
        </div>
      </div>
      <div id="Nav" className="Nav">
        <div id="containar">
          <div id="Logo">
            <img
              src={imgLogo}
              alt="BeeBuy"
            />
          </div>

          <div id="nav-content">
            <div>
              <div id="iconNav">
                <FaHome />
              </div>
              <div id="display">
                <Link to="/Home">Home</Link>
              </div>
            </div>
            <div>
              <div id="iconNav">
                <FaUserAlt />
              </div>
              <div id="display">
                <Link to="/Profile">Profile</Link>
              </div>
            </div>
            <div>
              <div id="iconNav">
                <FaAngellist />
              </div>
              <div id="display">
                <Link to="/AboutUs">About </Link>
              </div>
            </div>

            <div>
              <div id="iconNav">
                <FaBolt />
              </div>
              <div id="display">
                <Link to="/myOrders">MyOrders</Link>
              </div>
            </div>
            <div>
              <div id="iconNav">
                <FaOpencart />
              </div>
              <div id="display">
                <Link to="/cart">Cart</Link>
              </div>
            </div>
            <div>
              <div id="iconNav">
                <FaRocketchat />
              </div>
              <div id="display">
                <Link to="/contact">Contact</Link>
              </div>
            </div>
            <div>
              <div id="iconNav">
                <FaSignOutAlt />
              </div>
              <div id="display">
                <button className="IsSign" onClick={handleAuthClick}>
                  {isSignedIn ? "Log out" : "Sign in"}
                </button>
              </div>
            </div>
            <div className="socialMediaNav">
              <Link to="">
                <div id="iconNav">
                  <FaFacebook />
                </div>
              </Link>
              <Link to="">
                <div id="iconNav">
                  <FaTwitter />
                </div>
              </Link>
              <Link to="">
                <div id="iconNav">
                  <FaTelegram />
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default NavBar;
