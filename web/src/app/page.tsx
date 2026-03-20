import Image from "next/image";
import Navbar from "@/components/Navbar";
import PurchaseButton from "@/components/PurchaseButton";

export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 font-sans text-zinc-900 dark:text-zinc-50 pb-20 selection:bg-blue-200 dark:selection:bg-blue-900">
      {/* Navigation Bar */}
      <Navbar />

      {/* Hero Section */}
      <main className="pt-40 px-6 max-w-5xl mx-auto flex flex-col items-center text-center">
        <div className="inline-flex px-4 py-1.5 mb-8 text-xs font-bold text-blue-700 dark:text-blue-300 bg-blue-100 dark:bg-blue-900/40 rounded-full tracking-wide uppercase shadow-sm">
          Launch Faster, Profit Sooner
        </div>
        <h1 className="text-5xl sm:text-6xl md:text-8xl font-black tracking-tight mb-8 leading-[1.1]">
          Unlock Premium <br className="hidden sm:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600">
            SaaS Blueprints
          </span>
        </h1>
        <p className="max-w-2xl text-lg sm:text-xl text-zinc-500 dark:text-zinc-400 mb-12 leading-relaxed">
          Skip the extensive setup. Download high-converting templates fully integrated with Stripe, Firebase, and Kakaopay. Designed by global indie hackers.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto px-4 sm:px-0">
          <PurchaseButton />
          <button className="px-8 py-4 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-full font-bold text-lg transition-colors hover:bg-zinc-50 dark:hover:bg-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 w-full sm:w-auto shadow-sm">
            View Live Demo
          </button>
        </div>
        
        {/* Trust Indicators */}
        <div className="mt-20 pt-10 border-t border-zinc-200/50 dark:border-zinc-800/50 w-full px-6">
          <p className="text-xs text-zinc-400 dark:text-zinc-500 mb-8 uppercase tracking-widest font-bold">Trusted by founders building on</p>
          <div className="flex flex-wrap justify-center items-center gap-10 sm:gap-16 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
            <div className="font-extrabold text-2xl tracking-tighter">Stripe</div>
            <div className="font-bold text-xl tracking-widest">VERCEL</div>
            <div className="font-bold text-xl text-orange-500">Firebase</div>
            <div className="font-black text-xl text-yellow-500">KakaoPay</div>
          </div>
        </div>
      </main>

      {/* Features Outline */}
      <section className="mt-32 max-w-6xl mx-auto px-6 grid sm:grid-cols-3 gap-8">
        {[
          { icon: "M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z", title: "Mobile Optimized", desc: "Designed API-first and mobile-first. Achieves 90%+ conversion rates on all major devices." },
          { icon: "M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z", title: "Monetization Ready", desc: "Native API integration with payment gateways. Start receiving funds from day one." },
          { icon: "M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4", title: "Clean Architecture", desc: "Built with bleeding-edge Next.js 15, TailwindCSS 4, and absolute best practices." }
        ].map((feature, i) => (
          <div key={i} className="p-8 rounded-[2rem] bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800/80 shadow-sm hover:shadow-xl transition-all duration-300 group">
            <div className="w-14 h-14 rounded-2xl bg-blue-50 dark:bg-blue-900/20 mb-6 flex items-center justify-center text-blue-600 group-hover:scale-110 group-hover:rotate-3 transition-transform">
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={feature.icon} /></svg>
            </div>
            <h3 className="text-xl font-extrabold mb-3 tracking-tight">{feature.title}</h3>
            <p className="text-zinc-500 dark:text-zinc-400 leading-relaxed font-medium">{feature.desc}</p>
          </div>
        ))}
      </section>
    </div>
  );
}
