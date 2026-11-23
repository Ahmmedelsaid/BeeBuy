import React, { useState, useEffect } from "react";
import firebase from "../../firebase";
import "../style/MallCard.css";

import Categories from "./Categories";
import { useNavigate } from "react-router-dom";
import NavBar from "../ComonentsSmall/NavBar";

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
