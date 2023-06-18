import React, { useState, useEffect } from "react";
import { FaOpencart } from "react-icons/fa";
import "../style/Cart.css";
import "../style/ProductsCard.css";

import { Link } from "react-router-dom";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
// import MapComponent from "./MapComponent";
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
const Cart = ({ product }) => {
  // const [totalPrice, setTotalPrice] = useState(0);

  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [building, setBuilding] = useState("");
  const [floor, setFloor] = useState("");
  const [street, setStreet] = useState("");
  const [addressUrl, setAddressUrl] = useState("");
  const [divStyle, setDivStyle] = useState({ display: "none" });
  const [cartItems, setCartItems] = useState([]);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  // const [addressUrl, setAddressUrl] = useState("");

  // useEffect(() => {
  //   let price = 0;
  //   cartItems.forEach((item) => {
  //     price =price + item.Price;
  //   });
  //   setTotalPrice(price);
  // }, [cartItems]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setLatitude(position.coords.latitude);
      setLongitude(position.coords.longitude);
    });
  }, []);

  const getUrl = () => {
    if (latitude && longitude) {
      const url = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;

      setAddressUrl(url);
    }
  };

  const confirmOrder = () => {
    if (
      name === "" ||
      address === "" ||
      building === "" ||
      floor === "" ||
      street === ""
    ) {
      alert("Please fill in all the fields.");
      return;
    }
    const db = firebase.firestore();
    const currentUser = firebase.auth().currentUser;
    if (!currentUser) {
      alert("Please sign in to confirm your order.");
      navigate("/Sign-In-Now");
      return;
    }

    const { uid } = currentUser;
    const orderDetails = {
      UserName: name,
      Address: address,
      Floor: floor,
      StreetName: street,
      BuildingNo: building,
      Latitude: latitude,
      Longitude: longitude,
      UserOrder: cartItems,
      delivered: false,
      packing:false ,
      TotalCost:totalPrice,
      OrderDate: firebase.firestore.FieldValue.serverTimestamp(),
    };
    db.collection("users")
      .doc(uid)
      .collection("orders")
      .add(orderDetails)
      .then(() => {
        alert("Order confirmed successfully!");
        setName("");
        setAddress("");
        // setAddressUrl("");
        setBuilding("");
        setFloor("");
        setStreet("");
        setCartItems([]);
        handleClose();
        const userRef = db.collection("users").doc(uid);
        userRef.get().then((doc) => {
          if (doc.exists) {
            userRef.update({
              cartItems: firebase.firestore.FieldValue.delete(),
            });
          }
        });
      })
      .catch((error) => {
        console.error("Error adding order to Firestore: ", error);
        alert("Error confirming order. Please try again later.");
      });
  };

  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);

  const handleClose = () => setShow(false);
  // const [showAlert, setShowAlert] = useState(false);
  if (product) {
    const existingItemIndex = cartItems.findIndex(
      (item) => item.name === product.name
    );
    if (existingItemIndex !== -1) {
      const newCartItems = [...cartItems];
      newCartItems[existingItemIndex].quantity += 1;
      setCartItems(newCartItems);
    } else {
      const newCartItem = {
        name: product.name,
        imageUrl: product.imageUrl,
        description: product.description,
        price: product.price,
        Mall: product.mallName,
        Shop: product.storeName,
      };
      setCartItems([...cartItems, newCartItem]);
    }
  }

  useEffect(() => {
    const user = firebase.auth().currentUser;
    if (user) {
      const userRef = firebase.firestore().collection("users").doc(user.uid);
      userRef
        .get()
        .then((doc) => {
          if (doc.exists) {
            const cartData = doc.data().cartItems || [];
            setCartItems(cartData);
          } else {
            console.error("User document does not exist!");
          }
        })
        .catch((error) => {
          console.error("Error getting user document: ", error);
        });
    } else {
      console.error("User is not logged in!");
    }
  }, []);

  const removeFromCart = (index) => {
    const user = firebase.auth().currentUser;
    if (user) {
      const userRef = firebase.firestore().collection("users").doc(user.uid);
      userRef
        .get()
        .then((doc) => {
          if (doc.exists) {
            const cartItems = doc.data().cartItems || [];
            cartItems.splice(index, 1);
            userRef
              .set({ cartItems }, { merge: true })
              .then(() => {
                console.log("Item removed from cart successfully!");
                setCartItems(cartItems);
              })
              .catch((error) => {
                console.error("Error removing item from cart: ", error);
              });
          } else {
            console.error("User document does not exist!");
          }
        })
        .catch((error) => {
          console.error("Error getting user document: ", error);
        });
    } else {
      console.error("User is not logged in!");
    }
  };
  let totalPrice = 0;

  return (
    <>
      <NavBar></NavBar>
      <div className="cartContainar ShopsBG">
        <div className="cart">
          {cartItems.length > 0 ? (
            <ul>
              {cartItems.map((item, index) => (
                
                <li key={index}>
                  <div className="imgsds">
                    <img src={item.ImageURL} alt={item.name} />
                  </div>
                  <div>
                    <h3>{item.ProductName}</h3>
                    {/* <p>{item.Description}</p> */}
                    <p>{item.Price} EGP</p>
                    <p>{item.MallName}</p>
                    <button onClick={() => removeFromCart(index)}>
                      Remove
                    </button>
                  </div>
                  {(totalPrice =totalPrice+50+ parseFloat(item.Price))}

                </li>
              ))}
            </ul>
          ) : (
            <div className="empaty">
              <p>Your cart is empty!</p>
              <FaOpencart className="FaOpencart"></FaOpencart>
              <span>
                <Link to={"/home"}> SHIPPING NOW </Link>
                {/* <span>OR</span>
              <Link to={"/home"}> Traking Now </Link> */}
              </span>
                        
            </div>
          )}
          <div style={divStyle} className="payment">
            <Modal show={show} onHide={handleClose}>
              <Modal.Header>
                <Modal.Title className="MakeOrder">
                  Make Your Order Now
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label>Full Name</Form.Label>
                    <Form.Control
                      autoFocus
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      placeholder="Your Name Please "
                      type="text"
                    />
                  </Form.Group>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label>Street Name</Form.Label>
                    <Form.Control
                      autoFocus
                      value={street}
                      onChange={(e) => setStreet(e.target.value)}
                      required
                      placeholder="Street Name Please "
                      type="text"
                    />
                  </Form.Group>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label>Bulding Number</Form.Label>
                    <Form.Control
                      autoFocus
                      value={building}
                      onChange={(e) => setBuilding(e.target.value)}
                      required
                      placeholder="Building Number Please"
                      type="number"
                    />
                  </Form.Group>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label>Floor Number</Form.Label>
                    <Form.Control
                      autoFocus
                      value={floor}
                      onChange={(e) => setFloor(e.target.value)}
                      required
                      placeholder="Floor Number Please "
                      type="number"
                    />
                  </Form.Group>

                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlTextarea1"
                  >
                    <Form.Label>Adress</Form.Label>
                    <Form.Control
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      required
                      placeholder="Set Your Address"
                      type="text"
                    />
                  </Form.Group>
                  <Form.Group
                    className="mb-3 frm"
                    controlId="exampleForm.ControlTextarea1"
                  >
                    <Form.Label>Adress Url</Form.Label>
                    <span className="GetUrlStyle" onClick={getUrl}>
                      Get Url !
                    </span>

                    <Form.Control
                      value={addressUrl}
                      onChange={(e) => setAddressUrl(e.target.value)}
                      placeholder="Set Your Url Address"
                      type="text"
                    />
                    <p>Delivery: (50 EGP) </p>

                    <p>Total Price: {Number(totalPrice).toFixed(2)} EGP </p>
                  </Form.Group>
                  {/* <Form.Group  className="mb-3 frm"
                  controlId="exampleForm.ControlTextarea1">
                  <Form.Label>Choose Your location</Form.Label>
                  {<MapComponent></MapComponent>}
                </Form.Group> */}
                </Form>
              </Modal.Body>
              <Modal.Footer className="Btns">
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
                <Button variant="primary" onClick={confirmOrder}>
                  Confirm Order
                </Button>
              </Modal.Footer>
            </Modal>
          </div>
        </div>

        <button className="byeNow" onClick={handleShow}>
          Buy Now
        </button>
      </div>
    </>
  );
};

export default Cart;