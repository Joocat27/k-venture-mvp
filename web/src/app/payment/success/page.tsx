"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { doc, updateDoc } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";

function PaymentSuccessContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("Verify & Approving Payment...");

  useEffect(() => {
    const pgToken = searchParams.get("pg_token");
    if (!pgToken) {
      setMessage("Invalid payment session.");
      setLoading(false);
      return;
    }

    const approvePayment = async () => {
      try {
        const res = await fetch("/api/payment/approve", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ pg_token: pgToken })
        });
        
        const data = await res.json();
        
        if (data.success) {
          setMessage("Payment Successful! Upgrading your account...");
          
          // Firebase 유저 데이터 업그레이드
          const currentUser = auth.currentUser;
          if (currentUser) {
            const userRef = doc(db, "users", currentUser.uid);
            await updateDoc(userRef, {
              isPremium: true,
              lastPaymentAid: data.payment.aid,
              premiumSince: new Date()
            });
          }
          
          // 축하 후 홈으로 리다이렉트 (실제 서비스에서는 다운로드 페이지로 이동)
          setTimeout(() => {
            router.push("/?status=premium");
          }, 3000);
          
        } else {
          setMessage("Payment failed during approval: " + (data.error?.msg || "Unknown"));
        }
      } catch (err) {
        setMessage("System error approving payment.");
      } finally {
        setLoading(false);
      }
    };

    approvePayment();
  }, [searchParams, router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-zinc-50 dark:bg-zinc-950 px-6 text-center">
      <div className="bg-white dark:bg-zinc-900 p-10 rounded-3xl shadow-xl max-w-md w-full border border-zinc-100 dark:border-zinc-800">
        <div className="w-16 h-16 mx-auto bg-green-100 dark:bg-green-900/30 text-green-600 rounded-full flex items-center justify-center mb-6">
          {loading ? (
             <svg className="animate-spin w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
          ) : (
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
          )}
        </div>
        <h1 className="text-2xl font-bold mb-4 dark:text-white">{loading ? "Processing..." : "Status"}</h1>
        <p className="text-zinc-600 dark:text-zinc-400 font-medium">{message}</p>
        
        {!loading && (
          <button 
            onClick={() => router.push("/")}
            className="mt-8 px-6 py-3 w-full bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 rounded-full font-bold hover:scale-105 transition-transform"
          >
            Return to Dashboard
          </button>
        )}
      </div>
    </div>
  );
}

export default function PaymentSuccessPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <PaymentSuccessContent />
    </Suspense>
  );
}
