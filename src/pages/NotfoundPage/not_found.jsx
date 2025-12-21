import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const NotFoundPage = () => {
  const containerRef = useRef(null);
  const elementsRef = useRef([]);

  useEffect(() => {
    // GSAP Entrance Animation
    const tl = gsap.timeline({ defaults: { ease: 'power3.out', duration: 1 } });
    
    tl.fromTo(
      elementsRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, stagger: 0.2, delay: 0.5 }
    );
  }, []);

  // Helper to add elements to the ref array
  const addToRefs = (el) => {
    if (el && !elementsRef.current.includes(el)) {
      elementsRef.current.push(el);
    }
  };

  return (
    <div 
      ref={containerRef}
      className="min-h-screen bg-bg-light dark:bg-bg-dark flex flex-col items-center justify-center text-center px-4 font-serif"
    >
      {/* 404 Number */}
      <h1 
        ref={addToRefs}
        className="text-[12rem] md:text-[18rem] leading-none font-light italic tracking-tighter text-[#1A1A1A] dark:text-[#FFFFFF]"
      >
        404
      </h1>

      {/* Main Message */}
      <div ref={addToRefs} className="mt-4">
        <h2 className="text-4xl md:text-6xl text-[#1A1A1A] dark:text-[#FFFFFF]">
          <span className="font-sans font-bold">Oops...</span>{' '}
          <span className="italic font-serif">Something want wrong.</span>
        </h2>
      </div>

      {/* Subtext */}
      <p 
        ref={addToRefs}
        className="mt-6 text-[#666666] dark:text-[#FFFFFF] font-sans text-sm md:text-base tracking-wide"
      >
        We can't find the page you're looking for.
      </p>

      {/* Back Button */}
      <button 
        ref={addToRefs}
        onClick={() => window.history.back()}
        className="mt-12 px-8 py-3 border border-gray-400 text-sm font-sans uppercase tracking-widest text-[#1A1A1A] dark:text-[#FFFFFF] hover:bg-black hover:text-white transition-colors duration-300"
      >
        Go back
      </button>
    </div>
  );
};

export default NotFoundPage;