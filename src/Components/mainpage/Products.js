import React, { useState, useEffect } from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";
import { Link, useParams , useNavigate} from "react-router-dom";
import "../style/ProductsCard.css";
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

const Products = ({ addToCart }) => {
  const { mallId, categoryId, shopId } = useParams();
  const [products, setProducts] = useState([]);
  const [MallName, setMallName] = useState("");
  const [CategoryName, setCategoryName] = useState("");
  const [ShopName, setShopName] = useState("");
  const navigate=useNavigate();
  
  const handleShowAlert = () => {
    const alertzz = document.getElementsByClassName("alertz")[0];
    alertzz.classList.remove("dissblae");
    setTimeout(() => {
      alertzz.classList.add("dissblae");
    }, 3000);
  };
  const handleAddToCart = (product) => {
    const user = firebase.auth().currentUser;
    if (!user) {
      alert("Please sign in to add your order.");
      navigate("/Sign-In-Now");
      return;
    }
    const { name, imageUrl, description } = product;
  if (user) {
    const userRef = firebase.firestore().collection('users').doc(user.uid);
    userRef.get().then((doc) => {
      if (doc.exists) {
        const cartItems = doc.data().cartItems || [];
        const existingCartItem = cartItems.find((item) => item.id === product.id);
        if (existingCartItem) {
          existingCartItem.quantity++;
        } else {
          cartItems.push({
            ProductName:name,
               ImageURL:imageUrl,
               Description:description,
                 Price: product.price,
                 MallName: product.mallName,
                 StoreName: product.storeName,
          });
        }
        userRef.set({cartItems}, {merge: true})
          .then(() => {
            console.log('Item added to cart successfully!');
          })
          .catch((error) => {
            console.error('Error adding item to cart: ', error);
          });
      } else {
        console.error('User document does not exist!');
      }
    }).catch((error) => {
      console.error('Error getting user document: ', error);
    });
  } else {
    console.error('User is not logged in!');
  }
  handleShowAlert();
};

  useEffect(() => {
    const db = firebase.firestore();
    db.collection("malls")
      .doc(mallId)
      .collection("Categories")
      .doc(categoryId)
      .collection("shops")
      .doc(shopId)
      .collection("products")
      .get()
      .then((querySnapshot) => {
        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProducts(data);
      });
    db.collection("malls")
      .doc(mallId)
      .get()
      .then((doc) => {
        setMallName(doc.data().name);
      });
    db.collection("malls")
      .doc(mallId)
      .collection("Categories")
      .doc(categoryId)
      .get()
      .then((doc) => {
        setCategoryName(doc.data().name);
      });
    db.collection("malls")
      .doc(mallId)
      .collection("Categories")
      .doc(categoryId)
      .collection("shops")
      .doc(shopId)
      .get()
      .then((doc) => {
        setShopName(doc.data().name);
      });
  }, [mallId, categoryId, shopId]);

 
  return (
    <div className="bodyAlert ShopsBG">
      <NavBar></NavBar>
      <div className="alertz dissblae">
        The item has been added to your cart :{" "}
        <span>
          <Link to={"/cart"}>See Cart</Link>
        </span>
      </div>

      <span className="spanLink">
        {MallName} - {CategoryName} - {ShopName}:
      </span>
      <h4 className="about">Products:</h4>
      <div className="cardContainar">
        {products.map((product) => (
          <div key={product.id}>
            {product.imageUrl && (
              <div className=" page-wrapper">
                <div className="page-inner">
                  <div className="row">
                    <div className="el-wrapper">
                      <div className="box-up">
                        <img
                          className="img"
                          src={product.imageUrl}
                          alt={`${product.name} product`}
                          width="100"
                        />
                        <div className="img-info">
                          <div className="info-inner">
                            {/* <span className="p-name">{product.name}</span> */}
                            <span className="p-company">
                            </span>
                          </div>
                          <div className="a-size">{product.description}</div>
                        </div>
                      </div>

                      <div className="box-down">
                        <div className="h-bg">
                          <div className="h-bg-inner"></div>
                        </div>

                        <a className="cartz" href="#">
                          <span className="price">{product.price} EG</span>
                          <span className="add-to-cart">
                            <span onClick={() => handleAddToCart(product)}>
                              Add to Cart
                            </span>
                          </span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
