import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

// --- CONFIGURATION: CHANGE YOUR IMAGE SOURCES HERE ---
const IMAGES = {
  heroMain: "/images/blogpage/noimage.svg", 
  sidePost1: "/images/blogpage/noimage.svg",
  sidePost2: "/images/blogpage/noimage.svg",
  gridPost1: "/images/blogpage/blogimage1.svg",
  gridPost2: "/images/blogpage/blogimage2.svg",
  gridPost3: "/images/blogpage/blogimage1.svg",
  gridPost4: "/images/blogpage/blogimage2.svg",
};

const FONT_INTER = 'Inter Variable, sans-serif';
const FONT_CASLON = 'Libre Caslon Text, serif';

const BlogGridSection1 = () => {
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
      {/* --- HERO SECTION --- */}
      <header className={`${commonContainer} pt-[120px] mb-32 animate-in`}>
        {/* Changed items-start to items-end to push everything to the right */}
        <div className="flex flex-col items-end">
        <h1 
            className="font-medium text-right"
            style={{ 
              fontSize: '128px',           //
              lineHeight: '1.2',           // 120%
              letterSpacing: '-0.04em',    // -4%
              fontFamily: FONT_INTER       //
            }}
          >
            Crafting Tomorrow's <br />
            <span 
              className="italic font-normal block"
              style={{ 
                fontFamily: FONT_CASLON,   //
                fontSize: '104px',         //
                lineHeight: '1.2',         // 120%
                letterSpacing: '-0.04em'   // -4%
              }}
            >
              Solutions, Today.
            </span>
          </h1>
          
          <div className="w-full flex justify-end mt-8">
            <p 
                style={{ 
                fontFamily: 'Inter Variable, sans-serif',
                fontWeight: 400,
                fontSize: '18px',
                lineHeight: '160%',
                letterSpacing: '0%',
                textAlign: 'right'
                }}
                className="max-w-[740px] opacity-70"
            >
                We're a group of creative thinkers, developers, and designers dedicated to turning your vision into impactful.
            </p>
            </div>
        </div>
      </header>

      {/* --- FEATURED SECTION --- */}
      <section className={`${commonContainer} mb-32 animate-in`}>
        <h2 className="text-[12px] font-bold mb-12 uppercase tracking-[0.2em] opacity-30">Featured blog posts</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Main Featured */}
          <div className="group cursor-pointer">
            {/* Added overflow-hidden and hover scale for the 'pop out' effect */}
            <div className="aspect-[1.4/1] bg-[#E5E5E5] overflow-hidden mb-8">
              <img 
                src={IMAGES.heroMain} 
                alt="Feature" 
                className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105" 
              />
            </div>
            <div className="flex justify-between items-center mb-4">
              <span className="bg-[#FDE2E4] text-[10px] font-bold px-3 py-1 rounded-sm uppercase tracking-wider">Design</span>
              <span className="text-[10px] font-medium opacity-40 uppercase tracking-widest">5 MIN READ</span>
            </div>
            <h3 className="text-[36px] font-semibold leading-tight">The psychology of color in 2026</h3>
            <p className="text-[16px] opacity-60 mt-3">Discover how palette choices influence user trust and decision-making.</p>
          </div>

          {/* Side Posts */}
          <div className="flex flex-col gap-12">
            {[IMAGES.sidePost1, IMAGES.sidePost2].map((imgSrc, i) => (
              <div key={i} className="flex gap-8 group cursor-pointer border-b border-black/5 pb-12 last:border-0 last:pb-0">
                <div className="w-2/5 aspect-square bg-[#E5E5E5] overflow-hidden">
                  <img 
                    src={imgSrc} 
                    alt="Post" 
                    className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105" 
                  />
                </div>
                <div className="w-3/5 flex flex-col justify-center">
                   <div className="flex justify-between items-center mb-4">
                    <span className="bg-[#FDE2E4] text-[10px] font-bold px-3 py-1 rounded-sm uppercase tracking-wider">Design</span>
                    <span className="text-[10px] font-medium opacity-40 uppercase tracking-widest">5 MIN READ</span>
                  </div>
                  <h3 className="text-[24px] font-semibold leading-snug">The psychology of color in 2026</h3>
                  <p className="text-[15px] opacity-60 mt-2 line-clamp-2">Discover how palette choices influence user trust and decision-making.</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- CATEGORY NAV --- */}
      <nav className={`${commonContainer} flex items-center justify-between mb-24 animate-in border-y border-black/10 py-10`}>
        <div className="flex-none">
          <button className="bg-transparent border border-black/20 px-14 py-4 text-[12px] font-bold uppercase tracking-widest hover:bg-black hover:text-white transition-all">
            View all
          </button>
        </div>
        
        <div className="flex flex-1 justify-around items-center ml-12">
          {['Category one', 'Category two', 'Category three', 'Category four'].map((cat) => (
            <button key={cat} className="text-[12px] font-bold opacity-40 hover:opacity-100 transition-opacity uppercase tracking-[0.2em]">
              {cat}
            </button>
          ))}
        </div>
      </nav>

      {/* --- LOWER GRID --- */}
      <section className={`${commonContainer} grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-24 animate-in`}>
        {[IMAGES.gridPost1, IMAGES.gridPost2, IMAGES.gridPost3, IMAGES.gridPost4].map((imgSrc, idx) => (
          <div key={idx} className="group cursor-pointer">
            <div className="aspect-[16/10] bg-[#E5E5E5] mb-8 overflow-hidden">
              <img 
                src={imgSrc} 
                alt="Blog" 
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105" 
              />
            </div>
            <div className="flex justify-between items-center mb-4">
              <span className={`text-[10px] font-bold px-3 py-1 rounded-sm uppercase tracking-wider ${idx % 2 === 0 ? 'bg-blue-100' : 'bg-[#FDE2E4]'}`}>
                {idx % 2 === 0 ? 'Tech' : 'Design'}
              </span>
              <span className="text-[10px] font-medium opacity-40 uppercase tracking-widest">3 MIN READ</span>
            </div>
            <h3 className="text-[32px] font-semibold leading-tight">
               {idx % 2 === 0 ? 'Why minimalism is evolving fast' : 'The psychology of color in 2026'}
            </h3>
            <p className="text-[16px] opacity-60 mt-3">
              Exploring the shift toward maximalism in modern interface design and user experience.
            </p>
          </div>
        ))}
      </section>
    </div>
  );
};

export default BlogGridSection1;