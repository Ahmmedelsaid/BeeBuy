import React, { useState, useEffect } from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";
import "../style/MallCard.css";

import Categories from "./Categories";
import { useNavigate } from "react-router-dom";
import NavBar from "../ComonentsSmall/NavBar";

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
const Mall = () => {
  const [malls, setMalls] = useState([]);
  const [selectedMall, setSelectedMall] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const db = firebase.firestore();
    db.collection("malls")
      .get()
      .then((querySnapshot) => {
        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setMalls(data);
      });
  }, []);
  const handleMallClick = (mall) => {
    setSelectedMall(mall.id);
    navigate(`/mall/${mall.id}/Categories`);
  };
  return (
    <div className="MallStyle">
      <NavBar></NavBar>
      <h3 id="NameSection">MALLS</h3>

      <ul className="UlClass">
        {malls.map((mall) => (
          <div style={{listStyle: "none"}} key={mall.id}>
            <li  onClick={() => handleMallClick(mall)}>
              <figure className="snip1218">
                <div className="image">
                  <img src={mall.imageUrl} alt="Mall Image" />
                  <p>
                  {mall.discription}
                  </p>
                <img />

                </div>
                <figcaption>
                  <h4>{mall.name}</h4>

                  <h5>{mall.address}</h5>
                </figcaption>
              </figure>
            </li>
          </div>
        ))}
      </ul>
      {selectedMall && <Categories mallId={selectedMall} />}
    </div>
  );
};

export default Mall;

{
  /*             <Link to={`/malls/${mall.id}/categories`}>{mall.name}</Link>
   */
}
