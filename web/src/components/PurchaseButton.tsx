"use client";

import { useState } from "react";
import { auth } from "@/lib/firebase";

export default function PurchaseButton() {
  const [loading, setLoading] = useState(false);

  const handlePurchase = async () => {
    if (!auth.currentUser) {
      alert("Please Sign In first to purchase! 상단의 핑크색 버튼을 눌러 로그인해주세요.");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("/api/payment/ready", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          userId: auth.currentUser.uid,
          itemName: "Premium Bubble SaaS",
          totalAmount: 49900 
        })
      });

      const data = await response.json();
      
      if (data.url) {
        window.location.href = data.url;
      } else {
        alert("Payment initialization failed: " + (data.error?.msg || "Unknown error"));
      }
    } catch (error) {
      console.error(error);
      alert("System error during payment initialization.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button 
      onClick={handlePurchase}
      disabled={loading}
      className={`group relative overflow-hidden px-8 md:px-12 py-5 sm:py-6 bg-[#007AFF] text-white rounded-full font-black text-2xl sm:text-3xl uppercase tracking-widest border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all flex items-center justify-center gap-4 w-full sm:w-auto ${loading ? "opacity-70 cursor-not-allowed bg-gray-400" : "hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[4px] hover:translate-y-[4px] hover:bg-[#FFCC00] hover:text-black"}`}
    >
      {loading ? "Processing..." : "Purchase Now"}
      {!loading && (
        <span className="text-3xl sm:text-4xl group-hover:scale-125 group-hover:rotate-12 transition-transform duration-300">🔥</span>
      )}
    </button>
  );
}
