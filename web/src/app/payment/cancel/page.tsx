"use client";
import { useRouter } from "next/navigation";

export default function PaymentCancelPage() {
  const router = useRouter();
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-zinc-50 dark:bg-zinc-950 px-6 text-center">
      <div className="bg-white dark:bg-zinc-900 p-10 rounded-3xl shadow-xl max-w-md w-full border border-zinc-100 dark:border-zinc-800">
        <div className="w-16 h-16 mx-auto bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 rounded-full flex items-center justify-center mb-6">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
        </div>
        <h1 className="text-2xl font-bold mb-4 dark:text-white">Payment Cancelled</h1>
        <p className="text-zinc-600 dark:text-zinc-400 font-medium tracking-wide">
          카카오페이 결제가 사용자에 의해 취소되었습니다.
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
