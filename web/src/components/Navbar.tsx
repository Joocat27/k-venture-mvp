"use client";

import { useState, useEffect } from "react";
import { signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged, User } from "firebase/auth";
import { auth, db } from "@/lib/firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";

export default function Navbar() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleSignIn = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      
      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);
      if (!userSnap.exists()) {
        await setDoc(userRef, {
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
          createdAt: new Date(),
          isPremium: false,
        });
      }
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  const handleSignOut = async () => {
    await signOut(auth);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 bg-[#FFFDF7] border-b-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
      <div className="flex items-center gap-3 font-black text-2xl sm:text-3xl tracking-tighter uppercase cursor-pointer hover:scale-105 transition-transform duration-300">
        <div className="w-10 h-10 rounded-full border-4 border-black bg-[#FFCC00] flex items-center justify-center text-black text-2xl transform -rotate-12 hover:rotate-45 transition-transform duration-500">🌻</div>
        K-VENTURE
      </div>
      <div className="flex items-center gap-4 text-lg font-black uppercase text-black">
        {!loading && (
          user ? (
            <>
              <span className="hidden sm:inline-block px-4 py-1.5 bg-[#34C759] text-white border-2 border-black rounded-full shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                {user.displayName}
              </span>
              <button 
                onClick={handleSignOut}
                className="hover:text-[#FF3B30] hover:-translate-y-1 transition-transform"
              >
                Sign Out
              </button>
            </>
          ) : (
            <button 
              onClick={handleSignIn}
              className="px-6 py-2 bg-[#FF69B4] hover:bg-[#FF3B30] text-white tracking-widest border-4 border-black rounded-full shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[3px] hover:translate-y-[3px] transition-all"
            >
              Sign In
            </button>
          )
        )}
      </div>
    </nav>
  );
}
