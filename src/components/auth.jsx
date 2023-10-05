import React, { useContext, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";

export const Auth = () => {
  const {
    user,
    createAccount,
    signIn,
    signInWithGoogle,
    logout,
  } = useContext(AuthContext);
  
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [createAcountEmail, setCreateAcountEmail] = useState("");
  const [createAcountPassword, setCreateAcountPassword] = useState("");

  return (
    <div>
      {/* Login form */}
      <input
        placeholder="Email..."
        onChange={(e) => setLoginEmail(e.target.value)}
      />
      <input
        placeholder="Password"
        type="password"
        onChange={(e) => setLoginPassword(e.target.value)}
      />
      <button onClick={() => signIn(loginEmail, loginPassword)}>Sign In</button>
      <button onClick={signInWithGoogle}>Sign In with Google</button>
      <button onClick={logout}>Sign Out</button>

      {/* Signup form */}
      <input
        placeholder="Email..."
        onChange={(e) => setCreateAcountEmail(e.target.value)}
      />
      <input
        placeholder="Password"
        type="password"
        onChange={(e) => setCreateAcountPassword(e.target.value)}
      />
      <button
        onClick={() => createAccount(createAcountEmail, createAcountPassword)}
      >
        Skapa konto
      </button>

      {user ? (
        <div>
          <p>Inloggad som: {user.email}</p>
        </div>
      ) : (
        <div>
          <p>Du är inte inloggad.</p>
        </div>
      )}
    </div>
  );
};



/* import { auth, googleProvider } from "../config/firebase";
import {createUserWithEmailAndPassword, signInWithPopup, signOut, signInWithEmailAndPassword, onAuthStateChanged} from "firebase/auth";
import { useState, useEffect } from "react";




export const Auth = () => {
    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
    const [createAcountEmail, setCreateAcountEmail] = useState("");
    const [createAcountPassword, setCreateAcountPassword] = useState("");
    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((authUser) => {
          if (authUser) {
            // Användaren är inloggad
            setUser(authUser);
          } else {
            // Användaren är utloggad
            setUser(null);
          }
        });
    
        // Komponentrens unsubscribe-funktion
        return () => unsubscribe();
      }, []);

    console.log(auth?.currentUser?.email)

    const createAccount = async () => {
        try {
            await createUserWithEmailAndPassword(auth, createAcountEmail, createAcountPassword);
        } catch (error) {
            console.log(error);
        }
    };

    const signIn = async () => {
        try {
            await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
        } catch (error) {
            console.log(error);
        }
    };

    const signInWithGoogle = async () => {
        try {
            await signInWithPopup (auth, googleProvider);
        } catch (error) {
            console.log(error);
        }
    };

    const logout = async () => {
        try {
            await signOut (auth);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div>
            <input placeholder="Email..." onChange={(e) => setLoginEmail (e.target.value)} />
            <input placeholder="Password" type={"password"} onChange={(e) => setLoginPassword (e.target.value)} />
            <button onClick={signIn}>Sign In</button>
            <button onClick={signInWithGoogle}>Sign In with Google</button>
            <button onClick={logout}>Sign Out</button>

            <input placeholder="Email..." onChange={(e) => setCreateAcountEmail (e.target.value)} />
            <input placeholder="Password" type={"password"} onChange={(e) => setCreateAcountPassword (e.target.value)} />
            <button onClick={createAccount}>Skapa konto</button>
            <div>Användare</div>
            

            {user ? (
        <div>
          <p>Inloggad som: {user?.email}</p>
          
        </div>
      ) : (
        <div>
          <p>Du är inte inloggad.</p>
          
        </div>
      )}
        </div>
    );    
}; */










