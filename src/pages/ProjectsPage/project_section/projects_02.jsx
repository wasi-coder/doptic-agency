import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Project02 = () => {
  const sectionRef = useRef(null);
  const imageRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from([textRef.current, imageRef.current], {
        opacity: 0,
        y: 50,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        }
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    // Changed px to [30px] to match your exact requirement
    <section 
      ref={sectionRef}
      className="bg-bg-light dark:bg-bg-dark min-h-screen px-[30px] py-20 flex flex-col items-start" 
    >
      <div className="w-full max-w-full relative">
        
        {/* Header Text Block - We keep this items-end so the TEXT stays on the right */}
        <div ref={textRef} className="flex flex-col items-end mb-12 relative z-10">
          <h2 
            className="font-medium leading-[1.1] tracking-[-0.03em] text-[#0e0e0e] dark:text-text-light"
            style={{ 
              fontFamily: '"Inter Variable", sans-serif', 
              fontSize: 'clamp(48px, 8vw, 110px)' 
            }}
          >
            Scaling Enterprise
          </h2>
          <h3 
            className="mt-[-10px] text-[#0e0e0e] dark:text-text-light"
            style={{ 
              fontFamily: '"Italiana", serif', 
              fontSize: 'clamp(32px, 5vw, 72px)' 
            }}
          >
            SaaS
          </h3>
        </div>

        {/* Image and Number Container */}
        <div className="relative w-full">
          {/* Large Background Number "02" */}
          <span 
            className="absolute right-[-10px] top-[-60px] md:top-[-100px] font-bold text-black/[0.08] dark:text-white/[0.08] select-none z-0"
            style={{ 
                fontFamily: '"Inter Variable", sans-serif',
                fontSize: 'clamp(120px, 22vw, 280px)' 
            }}
          >
            02
          </span>

          {/* FIX: Removed w-[80%] and added w-full with a max-width. 
             Removed any ml-auto or centering to let it sit against the 30px padding.
          */}
          <div 
            ref={imageRef}
            className="relative z-10 w-full max-w-[1100px] h-[600px] overflow-hidden shadow-2xl"
          >
            <img 
              src="/images/projectspage/projectimage2.svg" 
              alt="Scaling Enterprise SaaS"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-700 ease-out"
            />
          </div>
        </div>

        {/* Footer Description */}
        <div className="mt-8 w-full max-w-[600px]">
          <p className="text-[#0e0e0e]/70 dark:text-text-light/60 text-[14px] md:text-[16px] leading-relaxed font-light">
            A robust dashboard redesign for Optixmn that improves user workflow and visualizes complex data clearly.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Project02;