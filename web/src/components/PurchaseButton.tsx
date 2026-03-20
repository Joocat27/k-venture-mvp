"use client";

import { useState } from "react";
import { auth } from "@/lib/firebase";

export default function PurchaseButton() {
  const [loading, setLoading] = useState(false);

  const handlePurchase = async () => {
    // 1. 로그인 여부 확인
    if (!auth.currentUser) {
      alert("결제를 진행하기 위해서 먼저 상단의 'Sign In'을 눌러 로그인해 주세요.");
      return;
    }

    setLoading(true);
    try {
      // 2. 카카오페이 결제 준비 API 호출
      const response = await fetch("/api/payment/ready", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          userId: auth.currentUser.uid,
          itemName: "K-Venture SaaS Blueprint",
          totalAmount: 49900  // 한화 적용
        })
      });

      const data = await response.json();
      
      // 3. 발급받은 결제 경로로 모바일/PC 리다이렉트
      if (data.url) {
        window.location.href = data.url;
      } else {
        alert("결제 초기화에 실패했습니다: " + (data.error?.msg || "Unknown error"));
      }
    } catch (error) {
      console.error(error);
      alert("결제 통신 중 시스템 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button 
      onClick={handlePurchase}
      disabled={loading}
      className={`group px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-bold text-lg transition-all shadow-xl shadow-blue-500/25 flex items-center justify-center gap-3 w-full sm:w-auto ${loading ? "opacity-70 cursor-not-allowed" : "hover:-translate-y-1"}`}
    >
      {loading ? "Processing..." : "Purchase Now · ₩49,900"}
      {!loading && (
        <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
        </svg>
      )}
    </button>
  );
}
