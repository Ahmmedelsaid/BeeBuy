import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import firebase from "../firebase";
import { useAuth } from "./AuthContext";

export const DELIVERY_FEE = 50;

const CartContext = createContext(null);

// Older carts were saved without id/quantity, so normalise on read.
const normalise = (item, index) => ({
  ...item,
  id: item.id || `${item.ProductName}-${item.StoreName || ""}-${index}`,
  Price: parseFloat(String(item.Price).replace(/,/g, "")) || 0,
  quantity: item.quantity || 1,
});

export function CartProvider({ children }) {
  const { user } = useAuth();
  const [items, setItems] = useState([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!user) {
      setItems([]);
      setReady(true);
      return undefined;
    }
    setReady(false);
    return firebase
      .firestore()
      .collection("users")
      .doc(user.uid)
      .onSnapshot(
        (doc) => {
          setItems(((doc.exists && doc.data().cartItems) || []).map(normalise));
          setReady(true);
        },
        () => setReady(true)
      );
  }, [user]);

  const save = useCallback(
    (next) => {
      if (!user) return Promise.resolve();
      setItems(next);
      return firebase
        .firestore()
        .collection("users")
        .doc(user.uid)
        .set({ cartItems: next }, { merge: true });
    },
    [user]
  );

  const addItem = useCallback(
    (product, context = {}) => {
      const existing = items.find((i) => i.id === product.id);
      if (existing) {
        return save(items.map((i) => (i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i)));
      }
      return save([
        ...items,
        {
          id: product.id,
          ProductName: product.name,
          ImageURL: product.imageUrl || "",
          Description: product.description || "",
          Price: parseFloat(String(product.price).replace(/,/g, "")) || 0,
          MallName: product.mallName || context.mallName || "",
          StoreName: product.storeName || context.shopName || "",
          quantity: 1,
        },
      ]);
    },
    [items, save]
  );

  const changeQuantity = useCallback(
    (id, delta) =>
      save(
        items
          .map((i) => (i.id === id ? { ...i, quantity: i.quantity + delta } : i))
          .filter((i) => i.quantity > 0)
      ),
    [items, save]
  );

  const removeItem = useCallback((id) => save(items.filter((i) => i.id !== id)), [items, save]);

  const clear = useCallback(
    () =>
      user
        ? firebase.firestore().collection("users").doc(user.uid).set({ cartItems: [] }, { merge: true })
        : Promise.resolve(),
    [user]
  );

  const value = useMemo(() => {
    const count = items.reduce((n, i) => n + i.quantity, 0);
    const subtotal = items.reduce((sum, i) => sum + i.Price * i.quantity, 0);
    const delivery = items.length ? DELIVERY_FEE : 0;
    return {
      items,
      ready,
      count,
      subtotal,
      delivery,
      total: subtotal + delivery,
      addItem,
      changeQuantity,
      removeItem,
      clear,
    };
  }, [items, ready, addItem, changeQuantity, removeItem, clear]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export const useCart = () => useContext(CartContext);
