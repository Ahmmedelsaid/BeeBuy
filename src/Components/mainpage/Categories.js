import React, { useState, useEffect } from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";
import { useNavigate, useParams } from "react-router-dom";
import ShopList from "./Shops";
import Slider from './../ComonentsSmall/Slider';
import NavBar from "../ComonentsSmall/NavBar";
import "../style/Catigory.css";

const Categories = () => {
  const { mallId } = useParams();
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const db = firebase.firestore();
    db.collection("malls")
      .doc(mallId)
      .collection("Categories")
      .get()
      .then((querySnapshot) => {
        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setCategories(data);
      });
  }, [mallId]);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    navigate(`/mall/${mallId}/Categories/${category.id}/shops`);
  };

  return (

      <div className="ShopsBG">
          {<Slider></Slider>}
        <div id="stateCatigory">
          <NavBar></NavBar>
          <h2 className="about">Categories</h2>
          <div id="DivCat">

            
          {categories.map(({ id, name }) => (
            <div key={id}  onClick={() => handleCategoryClick({ id, name })}>
              <h6 id="TypeCat" style={{ cursor: "pointer" }}>{name}</h6>
            </div>
          ))}
          {selectedCategory && (
            <ShopList mallId={mallId} categoryId={selectedCategory.id} />
          )}
          </div>
         
        </div>
      </div>
  );
};

export default Categories;
