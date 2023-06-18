import React, { useState, useEffect } from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";
import Products from "./Products";
import { useParams, useNavigate } from "react-router-dom";
import NavBar from "../ComonentsSmall/NavBar";
import "../style/Shops.css";

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
const Shops = () => {
  const { mallId, categoryId } = useParams();
  const [shops, setShops] = useState([]);
  const [selectedShop, setSelectedShop] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const db = firebase.firestore();
    db.collection("malls")
      .doc(mallId)
      .collection("Categories")
      .doc(categoryId)
      .collection("shops")
      .get()
      .then((querySnapshot) => {
        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setShops(data);
      });
  }, [mallId, categoryId]);
  const handleShopClick = (shop) => {
    setSelectedShop(shop);
    navigate(
      `/mall/${mallId}/Categories/${categoryId}/shops/${shop.id}/products`
    );
  };

  return (
    <div className="ShopsBG">
      <NavBar></NavBar>
      <div id="stateBodyzz">
        <h2 className="about">Shops</h2>
        <div id="shopsAll">
          {shops.map(({ id, name, address, category, imageUrl }) => (
            <div
              id="Shops_card"
              key={id}
              onClick={() => handleShopClick({ id, name })}
            >
              <div id="imgSHop">
                <img src={imageUrl} alt="" width="100px"></img>
              </div>
              <div id="aksdfa">
                <h5 style={{ cursor: "pointer" }}>{name}</h5>

                <h6>{address}</h6>
              </div>
            </div>
          ))}
          {selectedShop && (
            <Products
              mallId={mallId}
              categoryId={categoryId}
              shopId={selectedShop.id}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Shops;
