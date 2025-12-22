import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const NextProjectPage = () => {
  const sectionRef = useRef(null);
  const headerRef = useRef(null); // For the top "Next Project" part
  const titleRef = useRef(null);  // For "Scaling Enterprise"
  const imageRef = useRef(null);
  const footerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      
      // 1. Animate the Top Header (Next Project / View All)
      gsap.from(headerRef.current, {
        opacity: 0,
        y: 30,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 90%",
        }
      });

      // 2. Animate Main Titles and Image
      // We create a timeline to sequence them slightly or just stagger them
      gsap.from([titleRef.current, imageRef.current, footerRef.current], {
        opacity: 0,
        y: 60,
        duration: 1.2,
        stagger: 0.2, // Time between each element starting
        ease: "power3.out",
        scrollTrigger: {
          trigger: titleRef.current, // Trigger when the title hits view
          start: "top 80%",
        }
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="bg-bg-light dark:bg-bg-dark text-[#0e0e0e] min-h-screen px-[30px] py-16 flex flex-col relative overflow-hidden"
    >
      
      {/* --- TOP HEADER SECTION --- */}
      <div ref={headerRef} className="flex flex-col md:flex-row justify-between items-start md:items-center mb-24 w-full border-b border-black/5 pb-8 md:pb-0 md:border-none">
        
        {/* Logo / Title Area */}
        <div className="max-w-md">
          <h1 className="text-4xl md:text-5xl mb-3">
            <span className="font-bold tracking-tight" style={{ fontFamily: '"Inter Variable", sans-serif' }}>Next</span>
            <span className="italic ml-2 font-serif font-light" style={{ fontFamily: '"Italiana", serif' }}>Project</span>
          </h1>
          <p className="text-sm md:text-base text-gray-600 leading-relaxed max-w-sm">
            We share what we learn. Read our latest thoughts on the future of digital design.
          </p>
        </div>

        {/* View All Button */}
        <button className="mt-6 md:mt-0 px-8 py-3 border border-black/20 text-sm font-medium hover:bg-black hover:text-white transition-colors duration-300">
          View All
        </button>
      </div>

      {/* --- MAIN CONTENT SECTION --- */}
      <div className="w-full relative">
        
        {/* Titles: Aligned Right */}
        <div ref={titleRef} className="flex flex-col items-end relative z-20 mb-[-20px] md:mb-[-40px]">
          <h2 
            className="font-medium leading-[1] tracking-[-0.03em] text-right"
            style={{ 
              fontFamily: '"Inter Variable", sans-serif', 
              fontSize: 'clamp(48px, 8vw, 110px)' 
            }}
          >
            Scaling Enterprise
          </h2>
          
          <div className="relative">
            {/* The SaaS Text */}
            <h3 
              className="text-right relative z-20"
              style={{ 
                fontFamily: '"Italiana", serif', 
                fontSize: 'clamp(48px, 8vw, 110px)' 
              }}
            >
              SaaS
            </h3>

            {/* The Background "02" Number */}
            {/* Positioned absolute relative to the "SaaS" container to sit behind it */}
            <span 
              className="absolute right-0 top-1/2 -translate-y-1/2 font-bold text-black/[0.05] pointer-events-none select-none z-0 leading-none"
              style={{ 
                fontFamily: '"Inter Variable", sans-serif',
                fontSize: 'clamp(150px, 25vw, 350px)',
                transform: 'translate(10%, -15%)' // Fine tuning position to match image
              }}
            >
              02
            </span>
          </div>
        </div>

        {/* Main Image */}
        <div ref={imageRef} className="relative w-full mt-4 md:mt-8 z-10">
          <div className="relative z-10 w-full max-w-[1043px] aspect-[1043/640] overflow-hidden">
            {/* Using a placeholder for the abstract orange spiral */}
            <img 
              src="/images/projectspage/projectimage2.svg" 
              alt="Abstract 3D Shape"
              className="w-[80%] h-full object-cover hover:scale-105 transition-transform duration-[1.5s] ease-out opacity-90"
            />
          </div>
        </div>

        {/* Bottom Caption */}
        <div ref={footerRef} className="mt-6 md:mt-8 max-w-2xl">
          <p className="text-gray-600 text-sm md:text-base leading-relaxed">
            A robust dashboard redesign for Optixmn that improves user workflow and visualizes complex data clearly.
          </p>
        </div>

      </div>
    </section>
  );
};

export default NextProjectPage;