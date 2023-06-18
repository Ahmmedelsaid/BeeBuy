import React from "react";
import RegLogin from "./Components/User/RegLogin";
import {  Route, Routes } from "react-router-dom";
import Categories from "./Components/mainpage/Categories";
import Mall from "./Components/mainpage/Mall";
import Shops from "./Components/mainpage/Shops";
import Products from "./Components/mainpage/Products";
import Homme from "./Components/mainpage/Homme";
import About from "./Components/mainpage/About";
import EmailForm from "./Components/mainpage/EmailForm";
import Cart from "./Components/mainpage/Cart";
import Map from './Components/mainpage/Maps';
import Profile from "./Components/mainpage/Profile"
import MyOrders from "./Components/mainpage/MyOrders";

function App() {
  return (
    <div id="bodyZ">

      <div id="stateBodyz">
        <Routes>
          <Route path="/" element={<Homme></Homme>}></Route>
          <Route path="/Sign-In-Now" element={<RegLogin></RegLogin>}></Route>
          <Route path="/Home" element={<Homme></Homme>}></Route>
          <Route path="/AboutUs" element={<About></About>}></Route>
          <Route path="/map" element={<Map></Map>}></Route>
          <Route path="/Malls" element={<Mall></Mall>}></Route>
          <Route path="/cart" element={<Cart></Cart>}></Route>
          <Route path="/contact" element={<EmailForm></EmailForm>}></Route>
          <Route path="/Profile" element={<Profile></Profile>}></Route>
          <Route path="/myOrders" element={<MyOrders></MyOrders>}></Route>
          <Route
            path="/mall/:mallId/Categories"
            element={<Categories></Categories>}
          ></Route>
          <Route
            path="/mall/:mallId/Categories/:categoryId/shops"
            element={<Shops></Shops>}
          ></Route>
          <Route
            path="/mall/:mallId/Categories/:categoryId/shops/:shopId/products"
            element={<Products></Products>}
          ></Route>
        </Routes>
      </div>
    </div>

   
  );
}

export default App;
