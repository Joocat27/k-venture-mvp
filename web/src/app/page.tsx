import Image from "next/image";
import Navbar from "@/components/Navbar";
import PurchaseButton from "@/components/PurchaseButton";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#FFFDF7] font-sans text-black overflow-hidden selection:bg-[#FF69B4] selection:text-white">
      <Navbar />

      {/* Marquee Banner */}
      <div className="mt-[76px] sm:mt-[84px] bg-[#FF3B30] border-b-4 border-black py-4 overflow-hidden whitespace-nowrap flex group">
        <div className="animate-marquee inline-block font-black text-2xl text-white tracking-widest uppercase group-hover:[animation-play-state:paused]">
          🎉 LAUNCH FASTER ✦ PROFIT SOONER ✦ THE ULTIMATE K-VENTURE BLUEPRINT 🎉 LAUNCH FASTER ✦ PROFIT SOONER ✦ THE ULTIMATE K-VENTURE BLUEPRINT 🎉 LAUNCH FASTER ✦ PROFIT SOONER ✦ THE ULTIMATE K-VENTURE BLUEPRINT
        </div>
      </div>

      {/* Hero Section */}
      <main className="px-6 pb-20 pt-24 sm:pt-32 max-w-6xl mx-auto flex flex-col items-center text-center relative">
        {/* Floating Abstract Shapes */}
        <div className="hidden sm:block absolute top-10 left-10 lg:left-24 w-24 h-24 bg-[#FFCC00] rounded-full border-4 border-black shadow-[6px_6px_0px_0px_#000] animate-bounce" style={{ animationDuration: '3s' }} />
        <div className="hidden sm:block absolute top-40 right-10 lg:right-24 w-24 h-24 bg-[#34C759] rounded-2xl rotate-12 border-4 border-black shadow-[6px_6px_0px_0px_#000] hover:rotate-45 transition-transform duration-500" />
        <div className="hidden sm:block absolute bottom-10 left-20 w-16 h-16 bg-[#FF69B4] rounded-full border-4 border-black shadow-[4px_4px_0px_0px_#000]" />
        
        <Image src="/hero.png" alt="Wiggle Hero Flower" width={220} height={220} priority className="mb-6 hover:scale-110 hover:-rotate-12 transition-transform duration-300 rounded-full border-[6px] border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] object-cover" />

        <div className="inline-block px-6 py-2 mb-10 text-lg font-black text-white bg-[#007AFF] border-4 border-black rounded-full tracking-widest uppercase shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transform -rotate-2 hover:rotate-2 transition-transform">
          New Template Out Now!
        </div>
        
        <h1 className="text-6xl sm:text-7xl md:text-9xl font-black tracking-tighter mb-10 leading-[1.05] uppercase">
          MAKE <br className="hidden sm:block" /> 
          <span className="text-[#FFFDF7] relative inline-block px-4 py-2 sm:px-6 sm:py-4 bg-[#FF3B30] border-4 sm:border-8 border-black shadow-[6px_6px_0px_0px_#000] sm:shadow-[12px_12px_0px_0px_#000] transform -rotate-3 hover:translate-x-2 transition-transform">
            PROFIT
          </span> 
          <br className="hidden sm:block"/> TODAY.
        </h1>
        
        <p className="max-w-3xl text-xl sm:text-3xl font-extrabold text-black/80 mb-16 leading-tight">
          Eye-catching, bold, and brilliantly minimal. 
        </p>

        <div className="relative z-10 w-full flex justify-center mt-4">
          <PurchaseButton />
        </div>
      </main>

      {/* Colorful Features Section */}
      <section className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-8 pb-32">
        <div className="p-10 rounded-[2.5rem] bg-[#FFCC00] border-4 border-black shadow-[8px_8px_0px_0px_#000] transform transition-transform hover:-translate-y-2 hover:rotate-2">
          <div className="text-7xl mb-6">📱</div>
          <h3 className="text-3xl font-black mb-4 uppercase tracking-tight">Mobile Pop</h3>
          <p className="font-bold text-xl text-black/80 leading-snug">Looks absolutely stunning on every screen. Built for high contrast & high conversion.</p>
        </div>
        
        <div className="p-10 rounded-[2.5rem] bg-[#FF69B4] border-4 border-black shadow-[8px_8px_0px_0px_#000] transform transition-transform hover:-translate-y-2 hover:-rotate-1">
          <div className="text-7xl mb-6 flex space-x-2">💳 <span className="animate-pulse">✨</span></div>
          <h3 className="text-3xl font-black mb-4 uppercase tracking-tight text-white">KakaoPay Hit</h3>
          <p className="font-bold text-xl text-white/90 leading-snug">Native KakaoPay integration. Stop configuring complicated setups & start selling.</p>
        </div>
        
        <div className="p-10 rounded-[2.5rem] bg-[#34C759] border-4 border-black shadow-[8px_8px_0px_0px_#000] transform transition-transform hover:-translate-y-2 hover:rotate-1">
          <div className="text-7xl mb-6">🔥</div>
          <h3 className="text-3xl font-black mb-4 uppercase tracking-tight">Firebase Lock</h3>
          <p className="font-bold text-xl text-black/80 leading-snug">Google Login, user tracking, and premium database gatekeeping built-in natively.</p>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="border-t-4 border-black bg-white py-12 text-center font-bold uppercase tracking-widest border-b-8">
        © 2026 K-Venture Builder. Crafted with 🔥 and 🌻.
      </footer>
    </div>
  );
}
