"use client";

import { useState, useEffect } from "react";
import { signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged, User } from "firebase/auth";
import { auth, db } from "@/lib/firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";

export default function Navbar() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // 현재 로그인 상태 확인
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
      
      // Firestore에 유저 정보가 없으면 새로 생성 (활동 로그/결제 상태용)
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
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 backdrop-blur-md bg-white/70 dark:bg-black/70 border-b border-zinc-200/50 dark:border-zinc-800/50">
      <div className="flex items-center gap-3 font-extrabold text-xl tracking-tighter">
        <div className="w-7 h-7 rounded-sm bg-gradient-to-br from-blue-600 to-indigo-500 shadow-inner flex items-center justify-center text-white text-sm">K</div>
        K-Venture
      </div>
      <div className="flex items-center gap-4 text-sm font-medium">
        {!loading && (
          user ? (
            <>
              <span className="hidden sm:block text-zinc-500 font-semibold">{user.displayName}</span>
              <button 
                onClick={handleSignOut}
                className="text-zinc-500 hover:text-red-500 transition-colors"
              >
                Sign Out
              </button>
            </>
          ) : (
            <button 
              onClick={handleSignIn}
              className="hidden sm:block text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors"
            >
              Sign In
            </button>
          )
        )}
        <button className="px-5 py-2.5 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 rounded-full hover:scale-105 active:scale-95 transition-all duration-200 shadow-md font-semibold">
          Get Access
        </button>
      </div>
    </nav>
  );
}
