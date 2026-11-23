import React, { useState, useEffect } from "react";
import firebase from "../../firebase";
import "../style/MyOrder.css";

import NavBar from "../ComonentsSmall/NavBar";


function MyOrders() {
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    const fetchOrders = async () => {
      const user = firebase.auth().currentUser;
      if (user) {
        const userID = user.uid;
        const orderCollection = firebase
          .firestore()
          .collection("users")
          .doc(userID)
          .collection("orders");
        const snapshot = await orderCollection.get();
        const fetchedOrders = snapshot.docs.map((doc) => doc.data());
        setOrders(fetchedOrders);
      }
    };
    fetchOrders();
  }, []);

  const generateRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  return (
    <div className="MyOrderContainar">
      <NavBar></NavBar>
      {orders.map((order) => (
        <div key={order.orderNumber} className="OrderCard" >
          {order.UserOrder.map((item) => (
            <div key={item.id} className="orderItem">
              <p>Product: {item.ProductName}</p>
              <p>Price: {item.Price}</p>
              <p>Store:{item.StoreName}</p>
            </div>
            
          ))}
          <p
            className="MyOrderTotalPrice"
            style={{ backgroundColor: generateRandomColor() }}
          >
            Total Price: <span> {order.TotalCost} </span>{" "}
          </p>
        </div>
      ))}
        
    </div>
  );
}

export default MyOrders;
