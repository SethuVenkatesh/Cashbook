import { createContext, useEffect, useState } from "react";
import { auth } from "../firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";

export const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    useEffect(() => {
      // Subscribe to Firebase Auth state changes
      const unsubscribe = auth.onAuthStateChanged((firebaseUser) => {
        setUser(firebaseUser);
      });
      // Unsubscribe from Firebase Auth state changes when component unmounts
      return unsubscribe;
    }, []);
    return (
        <AuthContext.Provider value={{ user }}>
          {children}
        </AuthContext.Provider>
      );

}