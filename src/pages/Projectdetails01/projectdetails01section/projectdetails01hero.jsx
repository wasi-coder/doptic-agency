import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const ProjectDetails01Hero = () => {
  const containerRef = useRef(null);
  const imageRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial state: hidden and slightly shifted
      gsap.set([".reveal-text", ".reveal-meta"], { opacity: 0, y: 20 });
      gsap.set(imageRef.current, { scale: 1.1, clipPath: 'inset(100% 0% 0% 0%)' });

      const tl = gsap.timeline({ defaults: { ease: "power4.out", duration: 1.2 } });

      tl.to(imageRef.current, { 
        clipPath: 'inset(0% 0% 0% 0%)', 
        scale: 1, 
        duration: 1.5 
      })
      .to(".reveal-text", { 
        opacity: 1, 
        y: 0, 
        stagger: 0.1 
      }, "-=0.8")
      .to(".reveal-meta", { 
        opacity: 1, 
        y: 0, 
        stagger: 0.05 
      }, "-=1");
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="min-h-screen bg-bg-light dark:bg-bg-dark flex flex-col items-center justify-center font-sans text-black">
      {/* 80px Navbar Gap */}
      <div className="h-[80px] w-full bg-bg-light dark:bg-bg-dark" />

      {/* Main Image Section */}
      <div className="relative w-full h-[60vh] overflow-hidden">
        <img
          ref={imageRef}
          src="/images/projectspage/projectdetails01/projectdetails01hero.svg" 
          alt="Urban Fashion Hero"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content Section */}
      <div className="max-w-[calc(100%-8rem)] mx-auto px-0 py-16 grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
        
        {/* Left Column: Title & Description */}
        <div className="lg:col-span-7">
          <h1 className="text-6xl md:text-8xl font-medium tracking-tight leading-none mb-4">
            <span className="reveal-text block">Redefining Urban <span 
                className="reveal-text block" 
                style={{
                    fontFamily: "'Italiana', serif",
                    fontWeight: 400,
                    fontSize: '64px',
                    lineHeight: '120%',
                    letterSpacing: '-0.02em',
                    fontStyle: 'normal'
                }}
                >
                Fashion
                </span></span>
          </h1>
          
          <p className="reveal-text max-w-md text-gray-600 mt-8 text-lg leading-relaxed">
            We transformed a local label into a global brand. Our strategic design 
            increased conversion rates and customer loyalty instantly.
          </p>

          <div className="reveal-text flex gap-3 mt-10">
            {['Production', 'London', 'Fashion'].map((tag) => (
              <span key={tag} className="px-4 py-1   text-xs uppercase tracking-widest bg-white">
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Right Column: Meta Data */}
        <div className="lg:col-span-5 grid grid-cols-2 gap-y-12 pt-4">
          <div className="reveal-meta">
            <h4 className="text-xl font-semibold mb-1">Client</h4>
            <p className="text-gray-500 text-sm">Apex Apparel Co.</p>
          </div>
          <div className="reveal-meta">
            <h4 className="text-xl font-semibold mb-1">Date</h4>
            <p className="text-gray-500 text-sm">March 2025</p>
          </div>
          <div className="reveal-meta">
            <h4 className="text-xl font-semibold mb-1">Role</h4>
            <p className="text-gray-500 text-sm">End-to-End Product</p>
          </div>
          <div className="reveal-meta">
            <h4 className="text-xl font-semibold mb-1">Website</h4>
            <p className="text-gray-500 text-sm underline cursor-pointer">apex-drop.shop</p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ProjectDetails01Hero;