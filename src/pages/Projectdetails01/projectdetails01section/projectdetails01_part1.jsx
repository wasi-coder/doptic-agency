import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ChallengeSection = () => {
  const containerRef = useRef(null);
  const textBodyRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Letter-by-Letter Reveal Logic
      const textElement = textBodyRef.current;
      const content = textElement.innerText;
      
      // Clear and map characters to spans
      textElement.innerHTML = content
        .split("")
        .map((char) => `<span class="reveal-char opacity-20 transition-colors">${char}</span>`)
        .join("");

      gsap.to(".reveal-char", {
        color: "#0e0e0e",
        opacity: 1,
        stagger: 0.1,
        scrollTrigger: {
          trigger: textElement,
          start: "top 85%",
          end: "bottom 60%",
          scrub: true,
        },
      });

      // 2. Image Tilt Effect (Mouse Move)
      const handleMouseMove = (e) => {
        const { clientX, clientY } = e;
        const { innerWidth, innerHeight } = window;
        
        // Calculate rotation based on mouse position relative to center
        const xRotation = (clientY / innerHeight - 0.5) * 15; // Max 15 deg
        const yRotation = (clientX / innerWidth - 0.5) * -15;

        gsap.to(imageRef.current, {
          rotationX: xRotation,
          rotationY: yRotation,
          perspective: 1000,
          ease: "power2.out",
          duration: 0.5
        });
      };

      window.addEventListener("mousemove", handleMouseMove);
      return () => window.removeEventListener("mousemove", handleMouseMove);

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="bg-bg-light dark:bg-bg-dark min-h-screen">
      <div className="max-w-[calc(100%-40px)] md:max-w-[calc(100%-60px)] lg:max-w-[calc(100%-120px)] mx-auto px-0 py-24">
        
        {/* Text Content */}
        <div className="mb-20">
          <h2 className="text-5xl md:text-7xl font-medium tracking-tight mb-8">
            The Challenge
          </h2>
          
          <div 
            ref={textBodyRef}
            className="text-lg md:text-2xl leading-[1.4] text-gray-400 max-w-6xl font-normal"
          >
            Despite a massive social following, Apex's web presence was failing to convert. 
            The existing site felt disconnected from the brand's energy, resulting in 
            high bounce rates and missed sales opportunities.
            <br /><br />
            Technical performance was the biggest bottleneck. The mobile experience was clunky, 
            and the checkout infrastructure repeatedly crashed during high-traffic product 
            launches, frustrating their most loyal fans.
            <br /><br />
            They needed a total overhaul. The goal was to build a platform as aggressive 
            as their aesthetic—one capable of handling viral surges and converting hype 
            into revenue without friction.
          </div>
        </div>

        {/* Image with Tilt Container */}
        <div className="perspective-1000">
          <div 
            ref={imageRef}
            className="w-full h-[500px] md:h-[700px] overflow-hidden rounded-sm shadow-2xl"
          >
            <img
              src="/images/projectspage/projectdetails01/thechallenge.svg.svg"
              alt="Challenge Visual"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

      </div>
    </section>
  );
};

export default ChallengeSection;