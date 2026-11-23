import React, { createContext, useContext, useEffect, useState } from "react";
import firebase from "../firebase";

const AuthContext = createContext({ user: null, loading: true });

export function AuthProvider({ children }) {
  const [state, setState] = useState({ user: null, loading: true });

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      setState({ user, loading: false });
    });
    return unsubscribe;
  }, []);

  return <AuthContext.Provider value={state}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
