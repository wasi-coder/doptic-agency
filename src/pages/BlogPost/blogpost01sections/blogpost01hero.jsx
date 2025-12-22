import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { Link, Linkedin, X, Facebook } from 'lucide-react';

const BlogPostHero = () => {
  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const metaRef = useRef(null);
  const imageRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // 1. Title Animation (Slide up + Fade)
      tl.from(titleRef.current.children, {
        y: 100,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
      });

      // 2. Meta Data Row (Fade in)
      tl.from(metaRef.current, {
        y: 20,
        opacity: 0,
        duration: 0.8,
      }, "-=0.5");

      // 3. Image Reveal (Scale up slightly + Fade)
      tl.from(imageRef.current, {
        scale: 0.95,
        opacity: 0,
        duration: 1.2,
        clearProps: "all" 
      }, "-=0.6");

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    // Main Background - slightly off-white to match the reference
    <div className="bg-bg-light dark:bg-bg-dark min-h-screen w-full font-sans text-[#1a1a1a]">
      
      {/* YOUR SPECIFIC CONTAINER CLASS 
        Using px-0 as requested to let the max-width logic handle alignment
      */}
      <div 
        ref={containerRef} 
        className="max-w-[calc(100%-40px)] md:max-w-[calc(100%-60px)] lg:max-w-[calc(100%-120px)] mx-auto px-0 py-16"
      >
        
        {/* --- HEADER SECTION --- */}
        <header className="mb-12">
          {/* Typography Implementation:
            - Inter Variable (Weight 500)
            - Size: 128px (lg), scaled down for mobile
            - Line Height: 120% (leading-[1.2])
            - Letter Spacing: -4% (tracking-[-0.04em])
          */}
          <h1 ref={titleRef} className="flex flex-wrap items-baseline gap-x-4 leading-[1.2]">
            <span className="block font-['Inter'] font-medium text-[50px] md:text-[80px] lg:text-[128px] tracking-[-0.04em]">
              The psychology of
            </span>
            {/* Italic Span Implementation:
              - Libre Caslon Text (Italic)
              - Size: 104px (lg)
            */}
            <span className="block font-['Libre_Caslon_Text'] italic font-normal text-[40px] md:text-[65px] lg:text-[104px] tracking-[-0.04em]">
              color in 2026.
            </span>
          </h1>

          {/* --- METADATA ROW --- */}
          <div ref={metaRef} className="flex flex-col md:flex-row justify-between items-start md:items-end mt-12 md:mt-24 w-full">
            
            {/* Author Info */}
            <div className="flex items-center gap-4 mb-6 md:mb-0">
              <div className="w-12 h-12 rounded-full bg-gray-300 overflow-hidden">
                {/* Placeholder Avatar */}
                <img 
                  src="/images/blogpage/noimage.svg" 
                  alt="Author" 
                  className="w-full h-full object-cover grayscale"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-['Inter'] font-semibold text-lg leading-tight">Bessie Cooper</span>
                <span className="font-['Inter'] text-sm text-gray-600 mt-1">11 Jan 2022 • 5 min read</span>
              </div>
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-6 text-black">
              <button className="hover:opacity-60 transition-opacity"><Link size={20} /></button>
              <button className="hover:opacity-60 transition-opacity"><Linkedin size={20} /></button>
              <button className="hover:opacity-60 transition-opacity"><X size={20} /></button>
              <button className="hover:opacity-60 transition-opacity"><Facebook size={20} /></button>
            </div>
          </div>
        </header>

        {/* --- HERO IMAGE --- */}
         <div 
            ref={imageRef} 
            className="w-full aspect-[164/75] h-auto overflow-hidden"
            >
            <img 
                src="/images/blogpage/blogpostimage1.svg" 
                alt="Interior design with colorful art" 
                className="w-full h-full object-cover object-center"
            />
        </div>

      </div>
    </div>
  );
};

export default BlogPostHero;