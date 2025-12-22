import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// 1. Reusable Tilt Component for the "Tilting Effect"
const TiltImage = ({ src, alt, className, direction }) => {
  const containerRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const image = imageRef.current;
    if (!container || !image) return;

    // Mouse Move Tilt Logic
    const handleMouseMove = (e) => {
      const { left, top, width, height } = container.getBoundingClientRect();
      const x = (e.clientX - left) / width - 0.5;
      const y = (e.clientY - top) / height - 0.5;

      gsap.to(image, {
        rotationY: x * 10, // Tilt left/right
        rotationX: -y * 10, // Tilt up/down
        transformPerspective: 1000,
        ease: "power2.out",
        duration: 0.5,
      });
    };

    const handleMouseLeave = () => {
      gsap.to(image, {
        rotationY: 0,
        rotationX: 0,
        ease: "power2.out",
        duration: 0.5,
      });
    };

    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div ref={containerRef} className={`overflow-hidden relative ${className}`}>
      <img
        ref={imageRef}
        src={src}
        alt={alt}
        className={`w-full h-full object-cover transition-transform will-change-transform ${direction}`} // Added direction class for targeting
      />
    </div>
  );
};

// 2. Main Impact Section Component
const ImpactSection = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const subTitleRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      
      // Text Reveal Animations
      gsap.from(titleRef.current, {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        }
      });

      gsap.from(subTitleRef.current, {
        y: 30,
        opacity: 0,
        duration: 1,
        delay: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        }
      });

      // Image Animations (Directional)
      
      // Top Image: Coming from Top
      gsap.from(".anim-top", {
        y: -100,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".anim-top",
          start: "top 85%",
        }
      });

      // Left Image: Coming from Left
      gsap.from(".anim-left", {
        x: -100,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".grid-container", // Trigger when the grid row starts
          start: "top 75%",
        }
      });

      // Right Image: Coming from Right
      gsap.from(".anim-right", {
        x: 100,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".grid-container",
          start: "top 75%",
        }
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="w-full bg-bg-light dark:bg-bg-dark min-h-screen">
      {/* Container with specific spacing requested */}
      <div 
        ref={sectionRef}
        className="max-w-[calc(100%-40px)] md:max-w-[calc(100%-60px)] lg:max-w-[calc(100%-120px)] mx-auto px-0 py-16"
      >
        {/* Header Text */}
        <div className="mb-12">
          <h2 
            ref={titleRef} 
            className="text-4xl md:text-5xl font-medium text-black mb-4 tracking-tight"
          >
            The Impact
          </h2>
          <p 
            ref={subTitleRef} 
            className="text-sm md:text-base text-gray-600 max-w-xl leading-relaxed"
          >
            The new platform launched in time for their Fall Collection. The results were immediate.
          </p>
        </div>

        {/* Grid Layout */}
        <div className="flex flex-col gap-4 md:gap-6">
          
          {/* Top Image (Full Width) */}
          <div className="w-full h-[300px] md:h-[500px]">
            <TiltImage 
              src="\images\projectspage\projectdetails01\impactimage1.svg" // Basketball vibe
              alt="Basketball Player"
              direction="anim-top"
              className="w-full h-full"
            />
          </div>

          {/* Bottom Row (Two Columns) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 grid-container">
            {/* Left Image */}
            <div className="h-[400px] md:h-[600px]">
              <TiltImage 
                src="\images\projectspage\projectdetails01\impactimage2.svg" // Pink hair fashion vibe
                alt="Fashion Model Pink Hair"
                direction="anim-left"
                className="w-full h-full"
              />
            </div>

            {/* Right Image */}
            <div className="h-[400px] md:h-[600px]">
              <TiltImage 
                src="\images\projectspage\projectdetails01\impactimage3.svg" // Glasses/Coat vibe
                alt="Man in Coat"
                direction="anim-right"
                className="w-full h-full"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ImpactSection;