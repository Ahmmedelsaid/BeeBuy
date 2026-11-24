import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import { ToastProvider } from "./context/ToastContext";
import { CatalogProvider } from "./context/CatalogContext";
import Layout from "./layout/Layout";
import Home from "./pages/Home";
import Categories from "./pages/Categories";
import Shops from "./pages/Shops";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import Orders from "./pages/Orders";
import Profile from "./pages/Profile";
import SignIn from "./pages/SignIn";
import About from "./pages/About";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import LegacyRedirect from "./pages/LegacyRedirect";

function App() {
  return (
    <AuthProvider>
      <CatalogProvider>
      <CartProvider>
        <ToastProvider>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Home />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/sign-in" element={<SignIn />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />

              {/* Routes from the first version of the app */}
              <Route path="/Home" element={<Navigate to="/" replace />} />
              <Route path="/Sign-In-Now" element={<Navigate to="/sign-in" replace />} />
              <Route path="/AboutUs" element={<Navigate to="/about" replace />} />
              <Route path="/myOrders" element={<Navigate to="/orders" replace />} />
              <Route path="/Profile" element={<Navigate to="/profile" replace />} />
              <Route path="/Malls" element={<Navigate to="/" replace />} />

              {/* Readable catalog URLs: /city-stars/mens-wear/adidas-originals */}
              <Route path="/:mallSlug" element={<Categories />} />
              <Route path="/:mallSlug/:categorySlug" element={<Shops />} />
              <Route path="/:mallSlug/:categorySlug/:shopSlug" element={<Products />} />

              {/* URLs from the first version of the app used Firestore ids */}
              <Route path="/mall/:mallId/Categories" element={<LegacyRedirect />} />
              <Route path="/mall/:mallId/Categories/:categoryId/shops" element={<LegacyRedirect />} />
              <Route path="/mall/:mallId/Categories/:categoryId/shops/:shopId/products" element={<LegacyRedirect />} />

              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </ToastProvider>
      </CartProvider>
      </CatalogProvider>
    </AuthProvider>
  );
}

export default App;
