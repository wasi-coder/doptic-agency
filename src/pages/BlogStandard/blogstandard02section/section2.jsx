import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

// --- CONFIGURATION ---
const IMAGES = {
  post1: "/images/blogpage/blogimage1.svg",
  post2: "/images/blogpage/blogimage2.svg",
  // Add more as needed
};

const FONT_INTER = 'Inter Variable, sans-serif';
const FONT_CASLON = 'Libre Caslon Text, serif';

const Section2 = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".animate-in", {
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: "power3.out"
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const commonContainer = "max-w-[calc(100%-40px)] md:max-w-[calc(100%-60px)] lg:max-w-[calc(100%-120px)] mx-auto px-0";

  return (
    <div 
      ref={containerRef}
      className="bg-bg-light dark:bg-bg-dark min-h-screen text-[#1A1A1A] pb-32" 
      style={{ fontFamily: FONT_INTER }}
    >


      {/* ---  VERTICAL CONTENT FEED --- */}
      <main className={`${commonContainer} flex flex-col gap-24 animate-in`}>
        
        {/* Post 1 */}
        <article className="group cursor-pointer">
          <div className="aspect-[43/10] w-full overflow-hidden bg-[#E5E5E5] mb-6">
            <img 
              src={IMAGES.post1} 
              alt="The psychology of color"
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105" 
            />
          </div>
          <div className="flex justify-between items-center mb-4">
            <span className="bg-[#FDE2E4] text-[12px] font-bold px-3 py-1 rounded-sm uppercase tracking-wide">Design</span>
            <span className="text-[12px] font-medium opacity-40 uppercase tracking-widest">5 min read</span>
          </div>
          <h2 className="text-[48px] font-medium tracking-tight mb-2">The psychology of color in 2026</h2>
          <p className="text-[18px] opacity-60">Discover how palette choices influence user trust and decision-making.</p>
        </article>

        {/* Post 2 */}
        <article className="group cursor-pointer">
          <div className="aspect-[43/10] w-full overflow-hidden bg-[#E5E5E5] mb-6">
            <img 
              src={IMAGES.post2} 
              alt="Minimalism evolution"
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105" 
            />
          </div>
          <div className="flex justify-between items-center mb-4">
            <span className="bg-[#FDE2E4] text-[12px] font-bold px-3 py-1 rounded-sm uppercase tracking-wide">Tech</span>
            <span className="text-[12px] font-medium opacity-40 uppercase tracking-widest">5 min read</span>
          </div>
          <h2 className="text-[48px] font-medium tracking-tight mb-2">Why minimalism is evolving fast</h2>
          <p className="text-[18px] opacity-60">Exploring the shift toward maximalism in modern interface design.</p>
        </article>

      </main>
    </div>
  );
};

export default Section2;