"use client";
import { useRouter } from "next/navigation";

export default function PaymentFailPage() {
  const router = useRouter();
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-zinc-50 dark:bg-zinc-950 px-6 text-center">
      <div className="bg-white dark:bg-zinc-900 p-10 rounded-3xl shadow-xl max-w-md w-full border border-zinc-100 dark:border-zinc-800">
        <div className="w-16 h-16 mx-auto bg-red-100 dark:bg-red-900/30 text-red-600 rounded-full flex items-center justify-center mb-6">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" /></svg>
        </div>
        <h1 className="text-2xl font-bold mb-4 dark:text-white">Payment Failed</h1>
        <p className="text-zinc-600 dark:text-zinc-400 font-medium tracking-wide">
          An error occurred during the KakaoPay transaction. Please try again.
        </p>
        <button 
          onClick={() => router.push("/")}
          className="mt-8 px-6 py-3 w-full bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 rounded-full font-bold hover:scale-105 transition-transform"
        >
          Return to Dashboard
        </button>
      </div>
    </div>
  );
}
