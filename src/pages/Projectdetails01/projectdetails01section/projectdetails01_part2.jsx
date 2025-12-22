import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const VisualStrategySection = () => {
  const sectionRef = useRef(null);
  const textBodyRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Letter-by-Letter Reveal Logic
      const textElement = textBodyRef.current;
      const chars = textElement.innerText.split("");
      textElement.innerHTML = chars
        .map((char) => `<span class="reveal-char opacity-20 transition-colors">${char}</span>`)
        .join("");

      gsap.to(textElement.querySelectorAll(".reveal-char"), {
        color: "#0e0e0e",
        opacity: 1,
        stagger: 0.1,
        scrollTrigger: {
          trigger: textElement,
          start: "top 80%",
          end: "bottom 40%",
          scrub: true,
        },
      });

      // 2. Image Tilt Effect (Mouse Move)
      const handleMouseMove = (e) => {
        const { clientX, clientY } = e;
        const { innerWidth, innerHeight } = window;
        
        // Calculate rotation values
        const xRotation = (clientY / innerHeight - 0.5) * 10; 
        const yRotation = (clientX / innerWidth - 0.5) * -10;

        gsap.to(imageRef.current, {
          rotationX: xRotation,
          rotationY: yRotation,
          transformPerspective: 1000,
          ease: "power2.out",
          duration: 0.6
        });
      };

      window.addEventListener("mousemove", handleMouseMove);
      return () => window.removeEventListener("mousemove", handleMouseMove);
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="bg-bg-light dark:bg-bg-dark py-16">
      {/* Container with your exact spacing logic */}
      <div className="max-w-[calc(100%-40px)] md:max-w-[calc(100%-60px)] lg:max-w-[calc(100%-120px)] mx-auto px-0 flex flex-col gap-12">
        
        {/* Top Image Section (Visual Strategy Style) */}
        <div 
          className="w-full h-[500px] md:h-[700px] overflow-hidden shadow-sm"
          style={{ perspective: "1000px" }}
        >
          <img
            ref={imageRef}
            src="/images/projectspage/projectdetails01/visualstrategy.svg"
            alt="Visual Strategy"
            className="w-full h-full object-cover scale-105"
          />
        </div>

        {/* Text Content Section */}
        <div className="max-w-4xl">
          <h2 className="text-5xl md:text-7xl font-medium tracking-tight mb-8 text-[#0e0e0e]">
            Visual Strategy
          </h2>
          
          <div 
            ref={textBodyRef}
            className="text-lg md:text-xl leading-[1.6] text-gray-400 font-normal"
          >
            We abandoned the generic white-background standard. Instead, we established 
            a moody "dark mode" aesthetic, utilizing high-contrast typography and 
            oversized imagery to create an immediate visual impact.
            <br /><br />
            To bridge the digital gap, we implemented WebGL micro-interactions. 
            These subtle animations react dynamically to the cursor, creating a 
            responsive environment that feels alive.
            <br /><br />
            The result is a tactile experience that mimics the weight of high-quality 
            fabric. Every scroll and hover feels heavy, deliberate, and undeniably premium.
          </div>
        </div>

      </div>
    </section>
  );
};

export default VisualStrategySection;